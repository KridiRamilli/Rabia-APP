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
	//Input time format = "11:57 (CET)|(CEST)";
	time = time.split(" ")[0];
	const [hour, minutes] = time.split(":");
	const timeObj = {
		hour,
		minutes,
	};
	//Output time format 11:57
	let formatedTime = DateTime.fromObject(timeObj).toFormat("HH:mm");
	return formatedTime;
};

export const formatScheduleDate = (date) => {
	const formatedDate = DateTime.fromFormat(date, "dd/MM/yy").toFormat("dd MMM");
	return formatedDate;
};

export const formatNotificationDate = (date) => {
	const formatedDate = DateTime.fromFormat(date, "dd MMM").toFormat("dd/MM/yy");
	return formatedDate;
};

export const isTimePassed = (time) => {
	let inputTime = DateTime.fromFormat(time, "HH:mm");
	return DateTime.now() > inputTime;
};

export const setExpiredDate = (todayDate, time) => {
	let inputTime = DateTime.fromFormat(`${todayDate} ${time}`, "dd/MM/yy HH:mm");

	if (isTimePassed(time)) {
		return inputTime.plus({ days: 1 }).toISO();
	}
	return inputTime.toString();
};

export const isDateExpired = (date) => {
	const inputDate = DateTime.fromISO(date);
	return DateTime.now() > inputDate;
};

export const countdownToNextPrayer = (time) => {
	let inputTime = DateTime.fromFormat(time, "HH:mm");
	//Turn to seconds
	let diff = (inputTime - DateTime.now()) / 1000;
	if (diff < 0) {
		//Add one day when calc nexday prayer
		diff += 86400;
	}
	return Math.round(diff);
};

export const progressToNextPrayer = (activePrayer, nextPrayer, countdown) => {
	const { time: activeTime } = activePrayer;
	const { time: nextTime } = nextPrayer;
	let activeTimeSeconds = DateTime.fromFormat(activeTime, "HH:mm");
	let nextTimeSeconds = DateTime.fromFormat(nextTime, "HH:mm");
	if (activePrayer.prayer.toLowerCase() == "jacia") {
		nextTimeSeconds = nextTimeSeconds.plus({
			days: 1,
		});
	}
	//covert to seconds
	let totalSeconds = (nextTimeSeconds - activeTimeSeconds) / 1000;
	let timePassed = totalSeconds - countdown;
	let progress = timePassed / totalSeconds;
	return Math.round(progress * 100);
};

console.log(DateTime.now().day);
