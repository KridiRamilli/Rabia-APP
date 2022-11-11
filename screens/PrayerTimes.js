import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	ImageBackground,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch, useSelector } from "react-redux";

import {
	InfoHeader,
	PrayerItem,
	NextPrayer,
	CustomModal,
	NotificationsComponent,
} from "../components";
import { IMAGES, ICONS } from "../constants";
import {
	getTodayDate,
	findNextPrayer,
	findActivePrayer,
	countdownToNextPrayer,
	progressToNextPrayer,
	setExpiredDate,
	removeExpiredNotifications,
} from "../utils";
import { getTodayPrayers } from "../db";
import { COLORS } from "../theme/theme";
import {
	addNotification,
	removeNotification,
	selectNotifications,
	removeExpired,
} from "../redux/reducers/notificationSlice";

export const PrayerTimes = ({ navigation }) => {
	const [todayDate, setTodayDate] = useState(() =>
		getTodayDate({ formated: false })
	);
	const [prayerTimes, setPrayerTimes] = useState([]);
	const [selectedPrayer, setSelectedPrayer] = useState({});
	const [activePrayer, setActivePrayer] = useState({
		id: 0,
		prayer: "",
		time: "00:00",
	});
	const [nextPrayerData, setNextPrayerData] = useState({
		prayerName: "",
		countdown: 0,
		time: "00:00",
	});
	const [countdownId, setCountdownId] = useState("");
	const [timeLeft, setTimeLeft] = useState(0);
	const [progress, setProgress] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [countdownFinish, setCountdownFinish] = useState(false);
	const notifications = useSelector(selectNotifications);

	useEffect(() => {
		(async () => {
			const prayers = await getTodayPrayers(todayDate);
			const activePrayer = findActivePrayer(prayers);
			const nextPrayer = findNextPrayer(prayers, activePrayer);
			const nextPrayerCountdown = countdownToNextPrayer(nextPrayer.time);
			const nextPrayerCountdownId = new Date().getTime().toString();
			setPrayerTimes(prayers);
			setActivePrayer(activePrayer);
			setNextPrayerData({
				...nextPrayerData,
				countdown: nextPrayerCountdown,
				prayerName: nextPrayer.prayer,
				time: nextPrayer.time,
			});
			setCountdownId(nextPrayerCountdownId);
		})();
	}, [countdownFinish]);

	useEffect(() => {
		const progress = progressToNextPrayer(
			activePrayer,
			nextPrayerData,
			nextPrayerData.countdown
		);
		setProgress(progress);
	}, [nextPrayerData]);

	useEffect(() => {
		const ids = removeExpiredNotifications(notifications);
		dispatch(removeExpired(ids));
	}, [notifications]);

	const dispatch = useDispatch();

	//Prayer element containing single prayer info
	const renderPrayerInfo = (prayerTimes) => {
		return prayerTimes.map(({ id, prayer, time }) => {
			return (
				<PrayerItem
					key={id}
					prayer={prayer}
					time={time}
					activePrayer={id == activePrayer.id}
					notification={notifications[id]}
					onNotificationPress={() => {
						//RESET notification on press
						if (notifications[id]) {
							dispatch(removeNotification(id));
							return;
						}
						setSelectedPrayer({ id, prayer, time });
						setShowModal(true);
					}}
				/>
			);
		});
	};
	return (
		<ImageBackground style={styles.imageBackground} source={IMAGES.little_girl}>
			<LinearGradient
				style={styles.gradientBackground}
				colors={[COLORS.primary95, COLORS.darkBlue95]}
			>
				<SafeAreaView style={{ flex: 1 }}>
					<NotificationsComponent
						activeNotifications={notifications}
						startingDate={todayDate}
					/>
					<CustomModal
						modalVisible={showModal}
						onClosePress={() => setShowModal(false)}
						titleText={"Please choose your notification type!"}
						leftButtonLabel={"Once"}
						rightButtonLabel={"Every Day"}
						onLeftButtonPress={() => {
							const { time, prayer, id } = selectedPrayer;
							dispatch(
								addNotification({
									type: "once",
									time,
									prayer,
									id,
									expires: setExpiredDate(todayDate, time),
								})
							);
							setTimeout(() => {
								setShowModal(false);
							}, 300);
						}}
						onRightButtonPress={() => {
							const { time, prayer, id } = selectedPrayer;
							dispatch(
								addNotification({
									type: "everyday",
									time,
									prayer,
									id,
									expires: false,
								})
							);
							setTimeout(() => {
								setShowModal(false);
							}, 300);
						}}
					/>
					{/* upper icons */}
					<View style={styles.upper}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Schedule", {
									todayDate,
								})
							}
						>
							<Image source={ICONS.schedule_icon} style={styles.upperIcons} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("SettingsStack")}
						>
							<Image source={ICONS.settings_icon} style={styles.upperIcons} />
						</TouchableOpacity>
					</View>
					{/* Finish: upper icons */}
					<ScrollView
						style={styles.container}
						contentContainerStyle={{ flex: 1 }}
					>
						<View style={styles.prayerTimes}>
							<InfoHeader />
							<NextPrayer
								untilTime={nextPrayerData.countdown}
								nextPrayer={nextPrayerData.prayerName}
								countdownId={countdownId}
								progress={progress}
								// handleChange={(timeLeft) => setTimeLeft(timeLeft)}
								handleFinish={() => {
									//Recalculate active and next prayer
									//Update Progress
									setCountdownFinish(!countdownFinish);
								}}
								handlePress={(untilTime) =>
									navigation.navigate("Countdown", {
										countdownId,
										untilTime,
										prayer: nextPrayerData.prayerName,
									})
								}
							/>
							<View style={styles.prayerInfo}>
								{renderPrayerInfo(prayerTimes)}
							</View>
						</View>
					</ScrollView>
					<StatusBar style="light" />
				</SafeAreaView>
			</LinearGradient>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradientBackground: {
		flex: 1,
	},
	imageBackground: {
		flex: 1,
	},
	upper: {
		justifyContent: "space-between",
		flexDirection: "row",
		paddingHorizontal: 30,
		marginTop: 10,
		backgroundColor: COLORS.transparent,
	},
	upperIcons: {
		resizeMode: "contain",
		width: 25,
		height: 25,
	},
	prayerTimes: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 150,
	},
	prayerInfo: {
		flex: 0.75,
		width: "80%",
		justifyContent: "space-between",
	},
});
