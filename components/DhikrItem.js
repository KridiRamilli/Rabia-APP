import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../theme/theme";

export const DhikrItem = ({
	dhikrArab,
	dhikrAlbanian,
	repeat,
	note,
	handlePress,
	id,
	theme,
}) => {
	return (
		<View
			style={[
				styles.container,
				theme === "dark" && { backgroundColor: "#101821" },
			]}
		>
			<View style={styles.textContainer}>
				<Text style={[styles.dhikrArab, theme === "dark" && { color: "#fff" }]}>
					{dhikrArab}
				</Text>
				<Text
					style={[styles.dhikrAlbanian, theme === "dark" && { color: "#fff" }]}
				>
					{dhikrAlbanian}
				</Text>
				{note && <Text style={styles.note}>{note}</Text>}
			</View>
			<TouchableOpacity
				style={styles.repeatContainer}
				onPress={() => handlePress(id)}
			>
				<LinearGradient
					// Button Linear Gradient
					colors={
						repeat === 0
							? [COLORS.gray, COLORS.gray2]
							: [COLORS.pinkGradient, COLORS.purpleGradient]
					}
					style={styles.gradientBackground}
				>
					<Text style={styles.repeatTime}>{repeat}</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		marginHorizontal: 5,
		marginTop: 6,
		padding: 10,
		paddingTop: 15,
		backgroundColor: COLORS.white,
		borderRadius: 5,
		shadowColor: "#ddd",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	textContainer: {
		paddingBottom: 0,
	},
	repeatContainer: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-end",
		marginRight: 15,
		borderRadius: "50%",
		backgroundColor: COLORS.white,
		shadowColor: "#888",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 6,
		elevation: 14,
	},
	repeatTime: {
		color: COLORS.white,
		fontSize: SIZES.body2 + 2,
	},
	gradientBackground: {
		width: "97%",
		height: "97%",
		borderRadius: "50%",
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	dhikrArab: {
		fontSize: SIZES.body3,
		fontFamily: "Roboto-Condensed",
		textAlign: "justify",
	},
	dhikrAlbanian: {
		marginTop: 5,
		fontSize: SIZES.body4,
		fontFamily: "Roboto-LightItalic",
		textAlign: "justify",
	},
	note: {
		marginTop: 5,
		fontSize: SIZES.body4,
		fontFamily: "Roboto-Regular",
		textAlign: "justify",
		color: COLORS.secondary,
	},
});
