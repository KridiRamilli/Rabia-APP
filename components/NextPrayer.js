import React, { useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CountDown from "react-native-countdown-component";
import { ICONS } from "../constants";
import { FONTS, COLORS, SIZES } from "../theme/theme";

export const NextPrayer = ({
	untilTime,
	nextPrayer,
	countdownId,
	progress,
	handleChange,
	handlePress,
	handleFinish,
}) => {
	const countdownRef = useRef();
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={[COLORS.gray2, COLORS.gray4]}
				style={styles.upper}
			>
				<LinearGradient
					colors={[COLORS.darkGreen, COLORS.green]}
					style={[styles.inner, { width: `${progress}%` }]}
				></LinearGradient>
			</LinearGradient>
			<View style={styles.infoContainer}>
				<Image source={ICONS.next_prayer_icon} style={styles.icon} />
				<Text style={styles.infoText}>{nextPrayer}</Text>
				<CountDown
					id={countdownId}
					until={untilTime}
					onFinish={handleFinish}
					onPress={() => handlePress(countdownRef.current.state.until)}
					onChange={handleChange}
					size={20}
					timeToShow={["H", "M", "S"]}
					timeLabels={{ h: "h ", m: "m", s: "s " }}
					timeLabelStyle={{
						position: "absolute",
						right: 0,
						fontSize: SIZES.h2,
					}}
					digitStyle={{
						color: COLORS.white,
						marginRight: 10,
					}}
					digitTxtStyle={{
						color: COLORS.white,
					}}
					ref={countdownRef}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 60,
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	infoContainer: {
		width: "90%",
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	upper: {
		flex: 1,
		borderRadius: 40,
		borderWidth: 2,
		borderColor: COLORS.lightGray3,
	},
	inner: {
		flex: 1,
		width: "70%",
		borderRadius: 40,
	},
	infoText: {
		...FONTS.body2,
		color: COLORS.white,
		justifySelf: "center",
		marginLeft: 20,
	},
	icon: {
		resizeMode: "contain",
		width: 25,
		height: 25,
		position: "absolute",
		left: 5,
	},
});
