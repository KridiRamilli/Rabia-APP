import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import * as Haptics from "expo-haptics";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withRepeat,
} from "react-native-reanimated";

import {
	getLocationHeading,
	calculateQiblaAngle,
	getLocationCoords,
	approxValue,
} from "./../utils";

import { IMAGES, ICONS } from "../constants";
import { COLORS, SIZES, FONTS } from "../theme/theme";

export const Qibla = () => {
	const [qiblaAngle, setQiblaAngle] = useState(0);
	const [directionAngle, setDirectionAngle] = useState(90);
	const [isFound, setIsFound] = useState(false);
	const [showLeftIcon, setShowLeftIcon] = useState(false);
	const [showRightIcon, setShowRightIcon] = useState(false);

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

			//Called once so it does repeat as shown
			opacity.value = withRepeat(
				withTiming(1, { duration: 1000, easing: Easing.ease }),
				0,
				true
			);
		})();
	}, []);

	useEffect(() => {
		if (approxValue(directionAngle, qiblaAngle, 10)) {
			setIsFound(true);
		} else {
			setIsFound(false);
		}
		if (directionAngle > qiblaAngle && !isFound) {
			setShowLeftIcon(true);
			setShowRightIcon(false);
		} else if (directionAngle < qiblaAngle && !isFound) {
			setShowRightIcon(true);
			setShowLeftIcon(false);
		} else {
			setShowLeftIcon(false);
			setShowRightIcon(false);
		}
		spinValue.value = withTiming(`${-directionAngle}deg`, config);
	}, [directionAngle]);

	useEffect(() => {
		if (isFound === true) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		}
	}, [isFound]);

	const spinValue = useSharedValue(0);
	const opacity = useSharedValue(0);

	const config = {
		duration: 150,
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
	const arrowStyle = useAnimatedStyle(() => ({ opacity: opacity.value }), []);

	return (
		<SafeAreaView style={[styles.container, isFound ? styles.found : ""]}>
			<Text style={[styles.title]}>Qibla</Text>
			<View style={styles.imageContainer}>
				<Animated.View style={[styles.arrowsContainer, arrowStyle]}>
					{showLeftIcon ? (
						<Image
							source={ICONS.qibla_left_arrow_icon}
							style={styles.arrowIcon}
						/>
					) : (
						<View></View>
					)}

					{showRightIcon ? (
						<Image
							source={ICONS.qibla_right_arrow_icon}
							style={styles.arrowIcon}
						/>
					) : (
						<View></View>
					)}
				</Animated.View>
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
		backgroundColor: "#55efc4",
	},
	title: {
		...FONTS.h1,
		color: COLORS.white,
	},
	imageContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		width: "90%",
	},
	arrowsContainer: {
		width: "90%",
		flex: 0.3,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	image: {
		resizeMode: "contain",
		width: SIZES.width * 0.65,
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
	arrowIcon: {
		width: 45,
		height: 45,
		resizeMode: "contain",
		justifySelf: "flex-start",
		tintColor: "red",
	},
});
