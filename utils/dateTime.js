import { DateTime } from "luxon";

//Format like "E Premte, 18 Gusht"
const _formatDateString = (dateString) => {
	const dateParts = dateString.split(" ");
	let result = dateParts
		.map((el) => {
			return el[0].toUpperCase() + el.slice(1);
		})
		.join(" ");
	return result;
};

export const getTodayDate = ({ formated }) => {
	let dt = DateTime.now().setLocale("sq");
	let formatedDateString = dt.toFormat("EEEE, dd MMMM");
	let standardDateString = dt.toFormat("dd/MM/yy");
	return formated ? _formatDateString(formatedDateString) : standardDateString;
};

export const formatPrayerTime = (time) => {
	//Input time format = "11:57 (CET)";
	time = time.replace(" (CET)", "");
	const [hour, minutes] = time.split(":");
	const timeObj = {
		hour,
		minutes,
	};

	//Output time format 11:57 AM
	let formatedTime = DateTime.fromObject(timeObj).toFormat("HH:mm a");
	return formatedTime;
};
