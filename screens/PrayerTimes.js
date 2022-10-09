import React, { useEffect, useState } from "react";
import {
	Text,
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
import { InfoHeader, PrayerItem, NextPrayer, CustomModal } from "../components";
import { IMAGES, ICONS } from "../constants";
import {
	getTodayDate,
	findNextPrayer,
	findActivePrayer,
	countdownToNextPrayer,
	progressToNextPrayer,
} from "../utils";
import { getTodayPrayers } from "../db";
import { COLORS, SIZES } from "../theme/theme";

export const PrayerTimes = ({ navigation }) => {
	const [todayDate, setTodayDate] = useState(() =>
		getTodayDate({ formated: false })
	);
	const [prayerTimes, setPrayerTimes] = useState([]);
	const [selectedPrayerId, setSelectedPrayerId] = useState({});
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
	const [notificationType, setNotificationType] = useState({});
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
	}, []);

	useEffect(() => {
		const progress = progressToNextPrayer(
			activePrayer,
			nextPrayerData,
			nextPrayerData.countdown
		);
		setProgress(progress);
	}, [timeLeft]);

	//Prayer element containing single prayer info
	const renderPrayerInfo = (prayerTimes) => {
		return prayerTimes.map(({ id, prayer, time }) => {
			return (
				<PrayerItem
					key={id}
					prayer={prayer}
					time={time}
					activePrayer={id == activePrayer.id}
					notificationType={notificationType[id]}
					onNotificationPress={() => {
						//When notification set, RESET on press
						if (notificationType[id]) {
							setNotificationType({
								...notificationType,
								[id]: undefined,
							});
							return;
						}
						setSelectedPrayerId(id);
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
					<CustomModal
						modalVisible={showModal}
						onClosePress={() => setShowModal(false)}
						titleText={"Please choose your notification type!"}
						leftButtonLabel={"Once"}
						rightButtonLabel={"Every Day"}
						onLeftButtonPress={() => {
							setNotificationType({
								...notificationType,
								[selectedPrayerId]: "once",
							});
							setTimeout(() => {
								setShowModal(false);
							}, 300);
						}}
						onRightButtonPress={() => {
							setNotificationType({
								...notificationType,
								[selectedPrayerId]: "everyday",
							});
							setTimeout(() => {
								setShowModal(false);
							}, 300);
						}}
					/>
					{/* upper icons */}
					<View style={styles.upper}>
						<TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
							<Image source={ICONS.schedule_icon} style={styles.upperIcons} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate("Settings")}>
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
								handleChange={(timeLeft) => setTimeLeft(timeLeft)}
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
