import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";

import { ICONS } from "../constants";
import { FONTS, SIZES, COLORS } from "../theme/theme";
import { getLocationAddress, getTodayDate } from "../utils";

export const InfoHeader = () => {
	const [address, setAddress] = useState("");
	const [todayDate, setTodayDate] = useState("");

	useEffect(() => {
		(async () => {
			const address = await getLocationAddress();
			setAddress(address);
		})();
		const todayDate = getTodayDate();
		setTodayDate(todayDate);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.dateText}>{todayDate}</Text>
			<View style={styles.location}>
				<Image source={ICONS.prayer_location_icon} style={styles.icon} />
				<Text style={styles.locationText}>{address}</Text>
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
