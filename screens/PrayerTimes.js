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
import { prayerTimes } from "../__mocks__";

import { COLORS, SIZES } from "../theme/theme";
export const PrayerTimes = ({ navigation }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedPrayerId, setSelectedPrayerId] = useState(null);
	const [notificationType, setNotificationType] = useState({});

	//Prayer element containing single prayer info
	const renderPrayerInfo = (prayerTimes) => {
		return prayerTimes.map(({ id, prayer, time }) => {
			return (
				<PrayerItem
					key={id}
					prayer={prayer}
					time={time}
					activePrayer={id == 3}
					notificationType={notificationType[id]}
					onNotificationPress={() => {
						//When notification set, reset on press
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
							<NextPrayer />
							<View style={styles.prayerInfo}>
								{renderPrayerInfo(prayerTimes)}
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
				<StatusBar style="light" />
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
