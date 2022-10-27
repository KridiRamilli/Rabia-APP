import { useEffect, useRef, useState } from "react";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { scheduleNotification, isTimePassed } from "../utils";
import { getPrayers } from "../db";
import { addNotificationToSchedule } from "../utils/notification";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// TaskManager.defineTask(
// 	BACKGROUND_NOTIFICATION_TASK,
// 	({ data, error, executionInfo }) => {
// 		console.log("Received a notification in the background!");
// 		// Do something with the notification data
// 	}
// );

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export const NotificationsComponent = ({
	activeNotifications,
	startingDate,
}) => {
	const [notification, setNotification] = useState(false);
	useEffect(() => {
		(async () => {
			const scheduledDays = await getPrayers(8, startingDate);
			await Notifications.cancelAllScheduledNotificationsAsync().catch(
				console.error
			);
			await addNotificationToSchedule(activeNotifications, scheduledDays).catch(
				console.error
			);
			const allNotifs =
				await Notifications.getAllScheduledNotificationsAsync().catch(
					console.error
				);
			// console.log(allNotifs[14]);
			// console.log(activeNotifications, startingDate);
		})();
	}, [activeNotifications]);

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

	return null;
};
