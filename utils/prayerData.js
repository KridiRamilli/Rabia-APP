import { isTimePassed } from "./dateTime";

const _isRealPrayer = (prayerData) => {
	const { prayer } = prayerData;
	return (
		prayer.toLowerCase() !== "imsaku" &&
		prayer.toLowerCase() !== "lindja e diellit"
	);
};

//TODO cases when passing jacia prayer and after imsak
export const findActivePrayer = (prayerTimes) => {
	let lastElement = prayerTimes.length - 1;
	for (let i = lastElement; i >= 0; i--) {
		if (isTimePassed(prayerTimes[i].time)) {
			return prayerTimes[i];
		}
	}
	return prayerTimes[lastElement];
};

export const findNextPrayer = (prayerTimes, activePrayer) => {
	let nextPrayerIdx = 0;
	let activePrayerIdx = prayerTimes.findIndex((el) => {
		return el.id === activePrayer.id;
	});
	if (activePrayerIdx == 1) {
		nextPrayerIdx = 3;
	} else if (activePrayerIdx == 6) {
		nextPrayerIdx = 1;
	} else {
		nextPrayerIdx = activePrayerIdx + 1;
	}
	return prayerTimes[nextPrayerIdx];
};
