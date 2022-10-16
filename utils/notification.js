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

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const schedulePushNotification = async (
	prayer,
	notificationHour,
	repeats
) => {
	await getNotificationsPermission();
	const [hour, minute] = notificationHour.split(":");
	const id = await Notifications.scheduleNotificationAsync({
		content: {
			title: `You've got ${prayer}! 📬`,
			body: "Here is the notification body",
			data: { data: "goes here" },
		},
		sound: "custom",
		trigger: {
			// hour: +hour,
			// minute: +minute,
			seconds: 2,
			repeats,
		},
	});
	// await Notifications.cancelScheduledNotificationAsync(id);
};

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
	BACKGROUND_NOTIFICATION_TASK,
	({ data, error, executionInfo }) => {
		console.log("Received a notification in the background!");
		// Do something with the notification data
	}
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

(async () => {
	await schedulePushNotification("Jacia", "17:12", false).catch(console.error);
	const allNotfications =
		await Notifications.getAllScheduledNotificationsAsync();
	console.log(allNotfications);
	// await Notifications.cancelAllScheduledNotificationsAsync();
})();
