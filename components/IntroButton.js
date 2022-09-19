import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";
import { ICONS } from "../constants";
import { COLORS } from "../theme/theme";
import { getNotificationsPermission, getLocationPermission } from "../utils";
import {
	setShowRealApp,
	setLocationStatus,
	selectSettings,
} from "../redux/reducers/settingsSlice";

export const IntroButton = ({ slider, activeIndex, rounded, text }) => {
	const dispatch = useDispatch();
	const { locationStatus } = useSelector(selectSettings);
	const isLocationStatusSet = locationStatus !== "undetermined";
	useEffect(() => {
		if (!rounded) {
			animatedWidth.value = withTiming(150, config);
			animatedHeight.value = withTiming(40, config);
			animatedOpacity.value = withTiming(1, {
				duration: 500,
			});
		} else {
			animatedWidth.value = withTiming(70, config);
			animatedHeight.value = withTiming(70, config);
			animatedOpacity.value = withTiming(0, config);
		}
	}, [rounded]);

	const animatedWidth = useSharedValue(70);
	const animatedHeight = useSharedValue(70);
	const animatedOpacity = useSharedValue(0);

	const config = {
		duration: 200,
		easing: Easing.ease,
	};
	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: animatedWidth.value,
			height: animatedHeight.value,
		};
	});

	const animatedTextStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedOpacity.value,
		};
	});

	const goToNextSlide = (pageIdx, slider) => {
		return slider.current.goToSlide(pageIdx + 1);
	};

	const handleLocationPermission = async () => {
		const locationStatus = await getLocationPermission();
		dispatch(setLocationStatus(locationStatus));
	};

	const handleDone = async () => {
		if (!isLocationStatusSet) {
			handleLocationPermission();
		} else {
			dispatch(setShowRealApp(true));
		}
	};

	const handleBtnPress = (pageIdx, slider) => {
		switch (pageIdx) {
			case 0:
				goToNextSlide(pageIdx, slider);
				break;
			case 1:
				getNotificationsPermission();
				break;
			case 2:
				handleDone();
				break;
		}
	};

	return (
		<TouchableOpacity onPress={() => handleBtnPress(activeIndex, slider)}>
			<Animated.View style={[styles.roundedBtn, animatedStyle]}>
				{rounded ? (
					<Image source={ICONS.intro_arrow} style={styles.btnImage} />
				) : (
					<Animated.Text style={[{ color: "#fff" }, animatedTextStyle]}>
						{isLocationStatusSet && activeIndex === 2 ? "Done" : text}
					</Animated.Text>
				)}
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	roundedBtn: {
		borderRadius: 50,
		backgroundColor: COLORS.darkPurple,
		justifyContent: "center",
		alignItems: "center",
	},
	btnImage: {
		width: 40,
		height: 40,
		resizeMode: "contain",
		marginLeft: 5,
	},
});
