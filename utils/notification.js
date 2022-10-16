import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
export const getNotificationsPermission = async () => {
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
	minute,
	repeats,
}) => {
	await getNotificationsPermission();
	const trigger = {
		hour: +hour,
		minute: +minute,
	};
	if (weekday) {
		trigger["weekday"] = +weekday;
	}
	if (day && month) {
		trigger["day"] = +day;
		trigger["month"] = +month;
	}
	const id = await Notifications.scheduleNotificationAsync({
		content: {
			title: `You've got ${prayer}! 📬`,
			body: "Here is the notification body",
			data: { data: "goes here" },
		},
		sound: "custom",
		trigger,
	});

	return id;
	// await Notifications.cancelScheduledNotificationAsync(id);
};

// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
