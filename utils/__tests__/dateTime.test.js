const { DateTime } = require("luxon");
const {
	getTodayDate,
	formatPrayerTime,
	formatScheduleDate,
	formatNotificationDate,
	isTimePassed,
	countdownToNextPrayer,
	progressToNextPrayer,
	setExpiredDate,
	isDateExpired,
} = require("../datetime");

beforeAll(() => {
	DateTime.now = jest.fn(() => DateTime.fromISO("2022-08-10T11:00:00"));
	DateTime.fromFormat = jest.fn((hour) => {
		let timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
		let isoString = "2022-08-10T11:00:00";
		if (timeRegex.test(hour)) {
			isoString = `2022-08-10T${hour}:00`;
		}
		return DateTime.fromISO(isoString);
	});
});

describe("Testing date time utils", () => {
	it("should return date format as E Mërkurë, 10 Gusht", () => {
		const todayDate = getTodayDate({ formated: false });
		const formatedTodayDate = getTodayDate({ formated: true });
		expect(formatedTodayDate).toBe("E Mërkurë, 10 Gusht");
		expect(todayDate).toBe("10/08/22");
	});

	it("should return the right prayer time", () => {
		let prayerTime = formatPrayerTime("11:00 (CET)");
		let prayerTimeCest = formatPrayerTime("11:00 (CEST)");
		expect(prayerTime).toBe("11:00");
		expect(prayerTimeCest).toBe("11:00");
	});

	it("should correctly format schedule date", () => {
		const scheduledDate = formatScheduleDate("10/08/22");
		expect(scheduledDate).toBe("10 Aug");
	});

	it("should correctly format notification date", () => {
		const notificationDate = formatNotificationDate("10 Aug");
		expect(notificationDate).toBe("10/08/22");
	});
	it("should return true if specified time is lower than now time", () => {
		const timePassed = isTimePassed("10:00");
		const timePassed2 = isTimePassed("12:00");
		expect(timePassed).toBe(true);
		expect(timePassed2).toBe(false);
	});
	it("should correctly set expiration date", () => {
		let expiredDate = setExpiredDate("10/08/22", "10:00");
		let expiredDate2 = setExpiredDate("10/08/22", "12:00");
		//should set expiration next day
		expect(expiredDate).toBe("2022-08-11T11:00:00.000+02:00");
		expect(expiredDate2).toBe("2022-08-10T11:00:00.000+02:00");
	});
	it("should test if date is expired", () => {
		const dateExpired = isDateExpired("2022-08-11T11:00:00.000+02:00");
		const dateExpired2 = isDateExpired("2022-08-09T11:00:00.000+02:00");
		expect(dateExpired).toBe(false);
		expect(dateExpired2).toBe(true);
	});

	it("should calculate the correct time to next prayer", () => {
		let countDown = countdownToNextPrayer("15:00");
		//Shoudl add one day plus
		let countDown2 = countdownToNextPrayer("09:00");
		expect(countDown).toBe(14400);
		expect(countDown2).toBe(79200);
	});

	it("should calculate dhe progress to next prayer", () => {
		const progress = progressToNextPrayer(
			{ prayer: "Akshami", time: "12:00" },
			{ prayer: "Jacia", time: "13:00" },
			1800 //30 min
		);
		//Should add one day
		const progress2 = progressToNextPrayer(
			{ prayer: "Jacia", time: "22:00" },
			{ prayer: "Sabahu", time: "05:00" },
			7200 //2h
		);
		expect(progress).toBe(50);
		expect(progress2).toBeGreaterThan(70);
	});
});
