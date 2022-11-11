import { useEffect, useRef, useState } from "react";

import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { useSelector, useDispatch } from "react-redux";

import { getPrayers } from "../db";
import {
	addNotificationToSchedule,
	scheduleReminder,
} from "../utils/notification";
import { selectSettings } from "../redux/reducers/settingsSlice";

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
	const { notifySurahKehf } = useSelector(selectSettings);
	useEffect(() => {
		(async () => {
			const scheduledDays = await getPrayers(8, startingDate);
			await Notifications.cancelAllScheduledNotificationsAsync().catch(
				console.error
			);
			await addNotificationToSchedule(activeNotifications, scheduledDays).catch(
				console.error
			);
			if (notifySurahKehf) {
				await scheduleReminder({
					title: "Sot e Xhuma!",
					body: "Lexo suren Kehf",
					weekday: 6,
				});
			}
			const allNotifs =
				await Notifications.getAllScheduledNotificationsAsync().catch(
					console.error
				);
			// console.log(allNotifs[15]);
			console.log(allNotifs.length);
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
