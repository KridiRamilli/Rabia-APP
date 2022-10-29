import React, { useState } from "react";
import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import CountDown from "react-native-countdown-component";

import { COLORS } from "../theme/theme";
import { ICONS } from "../constants";

export const Countdown = ({ navigation, route }) => {
	const [orientation, setOrientation] = useState(0);

	const { countdownId, untilTime, prayer } = route.params;

	useEffect(() => {
		navigation.setOptions({
			title: prayer,
			headerRight: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={ICONS.close_icon} style={styles.closeIcon} />
				</TouchableOpacity>
			),
		});
		const subscription = ScreenOrientation.addOrientationChangeListener(
			({ orientationInfo }) => {
				setOrientation(orientationInfo.orientation);
			}
		);
		return () => {
			ScreenOrientation.removeOrientationChangeListener(subscription);
		};
	}, []);
	const isLandscape = orientation === 3 || orientation === 4;
	return (
		<View style={styles.backgroundContainer}>
			<View style={styles.container}>
				<CountDown
					id={countdownId}
					until={untilTime}
					size={isLandscape ? 100 : 50}
					timeToShow={["H", "M", "S"]}
					timeLabels={{ h: null, m: null, s: null }}
					timeLabelStyle={{
						position: "absolute",
						right: 0,
						fontSize: isLandscape ? 80 : 40,
					}}
					digitStyle={{
						backgroundColor: "#fff",
						borderWidth: 2,
					}}
					digitTxtStyle={{
						color: COLORS.secondary,
					}}
					separatorStyle={{ color: "#fff" }}
					showSeparator
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		backgroundColor: COLORS.black,
	},
	container: {
		flex: 0.9,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.black,
	},
	closeIcon: {
		width: 25,
		height: 25,
		tintColor: COLORS.white,
	},
});
