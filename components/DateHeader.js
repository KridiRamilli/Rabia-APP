import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { ICONS } from "../constants";
import { FONTS, SIZES, COLORS } from "../theme/theme";

export const DateHeader = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.dateText}>E Premte, 18 Gusht</Text>
			<View style={styles.location}>
				<Image source={ICONS.prayer_location_icon} style={styles.icon} />
				<Text style={styles.locationText}>Shijak, Durres</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	dateText: {
		...FONTS.h4,
		fontSize: SIZES.h2 + 3,
		color: COLORS.white,
		lineHeight: 0,
	},
	location: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
	},
	icon: {
		resizeMode: "contain",
		width: 15,
		height: 15,
		marginRight: 10,
		tintColor: COLORS.gray4,
	},
	locationText: {
		...FONTS.body2,
		color: COLORS.gray4,
	},
});
