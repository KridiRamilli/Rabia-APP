import { DateTime } from "luxon";

//Format like "E Premte, 18 Gusht"
const formatDateString = (dateString) => {
	const dateParts = dateString.split(" ");
	let result = dateParts
		.map((el) => {
			return el[0].toUpperCase() + el.slice(1);
		})
		.join(" ");
	return result;
};

export const getTodayDate = () => {
	let dt = DateTime.now().setLocale("sq");
	let dateString = dt.toFormat("EEEE, dd MMMM");
	return formatDateString(dateString);
};
