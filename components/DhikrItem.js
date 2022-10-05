import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../theme/theme";

export const DhikrItem = ({
	dhikrArab,
	dhikrAlbanian,
	repeat,
	handlePress,
	id,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.dhikrArab}>{dhikrArab}</Text>
			<Text style={styles.dhikrAlbanian}>{dhikrAlbanian}</Text>
			<TouchableOpacity
				style={styles.repeatContainer}
				onPress={() => handlePress(id)}
			>
				<LinearGradient
					// Button Linear Gradient
					colors={[COLORS.pinkGradient, COLORS.purpleGradient]}
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
		justifyContent: "center",
		alignItems: "flex-start",
		marginHorizontal: 5,
		marginTop: 10,
		padding: 10,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.radius,
		shadowColor: "#ddd",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 3,
	},
	repeatContainer: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-end",
		marginRight: 15,
		marginTop: 10,
		borderRadius: (SIZES.width + SIZES.height) / 2,
		backgroundColor: COLORS.white,
		shadowColor: "#888",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.41,
		shadowRadius: 9.11,
		elevation: 14,
	},
	repeatTime: {
		color: COLORS.white,
		fontSize: SIZES.body2,
	},
	gradientBackground: {
		width: "97%",
		height: "97%",
		borderRadius: (SIZES.width + SIZES.height) / 2,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	dhikrArab: {
		fontSize: SIZES.body3,
		fontFamily: "Roboto-Condensed",
	},
	dhikrAlbanian: {
		marginTop: 5,
		fontSize: SIZES.body4,
		fontFamily: "Roboto-LightItalic",
	},
});
