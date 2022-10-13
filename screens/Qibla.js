import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import * as Haptics from "expo-haptics";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";

import {
	getLocationHeading,
	calculateQiblaAngle,
	getLocationCoords,
	approxValue,
} from "./../utils";

import { IMAGES } from "../constants";
import { COLORS, SIZES, FONTS } from "../theme/theme";

export const Qibla = () => {
	const [locationCoords, setLocationCoords] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [qiblaAngle, setQiblaAngle] = useState(0);
	const [directionAngle, setDirectionAngle] = useState(90);
	const [isFound, setIsFound] = useState(false);

	useEffect(() => {
		(async () => {
			const {
				coords: { latitude, longitude },
			} = await getLocationCoords();
			const angle = calculateQiblaAngle(latitude, longitude);
			setQiblaAngle(angle);
			getLocationHeading((headingObj) => {
				let { magHeading } = headingObj;
				magHeading = Math.round(magHeading);
				setDirectionAngle(magHeading);
			});
		})();
	}, []);
	useEffect(() => {
		if (approxValue(directionAngle, qiblaAngle, 10)) {
			setIsFound(true);
		} else {
			setIsFound(false);
		}
		spinValue.value = withTiming(`${-directionAngle}deg`, config);
	}, [directionAngle]);
	useEffect(() => {
		if (isFound === true) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		}
	}, [isFound]);
	const spinValue = useSharedValue(0);
	const config = {
		duration: 200,
		easing: Easing.linear,
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotate: `${spinValue.value}deg`,
				},
			],
		};
	}, [directionAngle]);

	return (
		<SafeAreaView style={[styles.container, isFound ? styles.found : ""]}>
			<Text style={[styles.title, FONTS.h1]}>Kibla</Text>
			<View style={styles.imageContainer}>
				<Text style={styles.text}>{directionAngle}</Text>
				<Animated.Image
					style={[styles.image, animatedStyle]}
					source={IMAGES.qibla_compass}
				/>
			</View>
			<View style={styles.footer}>
				<View style={styles.footerElement}>
					<Text style={styles.text}>Meka</Text>
					<Text style={styles.text}>2916.1 km</Text>
				</View>
				<View style={styles.footerElement}>
					<Text style={styles.text}>Kibla</Text>
					<Text style={styles.text}>{qiblaAngle}°N</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: SIZES.padding * 2,
		paddingBottom: SIZES.padding * 7,
		paddingHorizontal: SIZES.padding,
		backgroundColor: COLORS.black,
	},
	found: {
		backgroundColor: COLORS.primary,
	},
	title: {
		color: COLORS.white,
	},
	imageContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	image: {
		resizeMode: "contain",
		width: SIZES.width * 0.7,
		height: SIZES.height * 0.4,
	},
	footer: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 150,
	},
	footerElement: {
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: COLORS.white,
		fontFamily: "Roboto-Regular",
		fontSize: SIZES.h2,
		padding: 1,
	},
});
