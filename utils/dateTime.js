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

export const isTimePassed = (time) => {
	let inputTime = DateTime.fromFormat(time, "HH:mm");
	return DateTime.now() > inputTime;
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
	// console.log("active", activeTime, nextTime);
	let activeTimeSeconds = DateTime.fromFormat(activeTime, "HH:mm");
	let nextTimeSeconds = DateTime.fromFormat(nextTime, "HH:mm");
	if (activePrayer.prayer.toLowerCase() == "jacia") {
		nextTimeSeconds = nextTimeSeconds.plus({
			days: 1,
		});
	}
	let totalSeconds = (nextTimeSeconds - activeTimeSeconds) / 1000;
	let timePassed = totalSeconds - countdown;
	let progress = timePassed / totalSeconds;
	return Math.round(progress * 100);
};

// console.log(progressToNextPrayer("15:00", "16:00", "1200"));
