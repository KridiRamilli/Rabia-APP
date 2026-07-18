import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../theme/theme";

export const Name = ({ name }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 125,
		height: 120,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EBF1F1",
		borderRadius: SIZES.radius,
		marginBottom: 10,
		// shadowColor: "#cccccc",
		// shadowOffset: {
		// 	width: -3,
		// 	height: -3,
		// },
		// shadowOpacity: 0.5,
	},
	text: {
		fontFamily: "Roboto-Medium",
	},
});
