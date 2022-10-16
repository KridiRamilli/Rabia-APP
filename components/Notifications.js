import { useEffect, useRef, useState } from "react";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { scheduleNotification } from "../utils";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
	BACKGROUND_NOTIFICATION_TASK,
	({ data, error, executionInfo }) => {
		console.log("Received a notification in the background!");
		// Do something with the notification data
	}
);

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export const NotificationsComponent = () => {
	const [notification, setNotification] = useState(false);
	useEffect(() => {
		(async () => {
			let arr = [];
			for (let i = 0; i < 1; i++) {
				let id = await scheduleNotification({
					prayer: "Ikindia",
					weekday: null,
					day: "18",
					month: "10",
					hour: "11",
					minute: "30",
					repeats: false,
				});
				arr.push(id);
			}
			const allNotifs = await Notifications.getAllScheduledNotificationsAsync();
			await Notifications.cancelAllScheduledNotificationsAsync();
			console.log(allNotifs);
		})();
	}, []);

	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				// const url = response.notification.request.content.data.url;
				// Linking.openURL(url);
				console.log("response");
			}
		);
		return () => subscription.remove();
	}, []);

	return <></>;
};
