import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import {
	isTimePassed,
	formatNotificationDate,
	isDateExpired,
} from "./dateTime";
export const requestNotificationsPermission = async () => {
	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus != "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		return finalStatus;
	}
};

export const scheduleNotification = async ({
	prayer,
	weekday,
	day,
	month,
	hour,
	id,
	minute,
	repeats,
	type,
}) => {
	await requestNotificationsPermission();
	const trigger = {
		hour: +hour,
		minute: +minute,
		repeats,
	};
	if (weekday) {
		trigger["weekday"] = +weekday;
	}
	if (day && month) {
		trigger["day"] = +day;
		trigger["month"] = +month;
	}
	const notificationId = await Notifications.scheduleNotificationAsync({
		content: {
			title: `${prayer} ka hyrë! 😇`,
			body: "",
			data: { prayer, type, id },
		},
		sound: true,
		vibrate: true,
		trigger,
	});

	return id;
	// await Notifications.cancelScheduledNotificationAsync(id);
};

const _getScheduleData = (
	scheduledDays,
	dateIdx,
	prayer,
	type,
	id,
	weekday,
	repeats
) => {
	const prayersDay = scheduledDays[dateIdx];
	//TODO Throw error when no prayers day
	const dayMonth = prayersDay.get("date");
	const formatedDayMonth = formatNotificationDate(dayMonth);
	const [hour, minute] = prayersDay.get(prayer).split(":");
	const [day, month] = formatedDayMonth.split("/");
	return {
		hour,
		minute,
		day,
		prayer,
		type,
		id,
		month,
		weekday,
		repeats,
	};
};

export const addNotificationToSchedule = async (
	activeNotifications,
	scheduledDays
) => {
	let notificationEntries = Object.entries(activeNotifications);
	notificationEntries = notificationEntries.filter(([key, value]) =>
		Boolean(value)
	);
	for (const [key, value] of notificationEntries) {
		const { prayer, time, type } = value;
		let dateIdx = isTimePassed(time) ? 1 : 0;
		if (type === "once") {
			const scheduleData = _getScheduleData(
				scheduledDays,
				dateIdx,
				prayer,
				type,
				key,
				null,
				false
			);
			//TODO handle errors with catch on all awaits
			await scheduleNotification(scheduleData).catch((error) => {
				console.error(error);
			});
		} else {
			for (let i = dateIdx; i < 8; i++) {
				let repeats = i === 7 ? true : false;
				const scheduleData = _getScheduleData(
					scheduledDays,
					i,
					prayer,
					type,
					key,
					null,
					repeats
				);
				await scheduleNotification(scheduleData).catch((error) => {
					console.error(error);
				});
			}
		}
	}
};

export const getScheduledNotifications = async () => {
	const allNotifs = await Notifications.getAllScheduledNotificationsAsync();
	const notificationObj = {};
	for (const val of allNotifs) {
		const {
			content: { data },
		} = val;
		const { id, prayer, type } = data;
		notificationObj[id] = {
			prayer,
			type,
		};
	}
	return notificationObj;
};

export const removeExpiredNotifications = (notifications) => {
	let notificationEntries = Object.entries(notifications);

	//Remove undefined values
	notificationEntries = notificationEntries.filter(([key, value]) =>
		Boolean(value)
	);
	const ids = [];
	for (const [key, value] of notificationEntries) {
		const { type = "", expires = "" } = value;
		if (type === "once") {
			if (isDateExpired(expires)) {
				ids.push(key);
			}
		}
	}
	return ids;
};
