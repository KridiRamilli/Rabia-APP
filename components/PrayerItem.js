import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { COLORS, FONTS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";

export const PrayerItem = ({ prayer, time, activePrayer }) => {
	const [notificationActive, setNotificationActive] = useState(false);
	return (
		<View style={[styles.container, activePrayer && styles.activePrayer]}>
			<Text style={styles.infoPrayer}>{prayer}</Text>
			<View style={styles.timeContainer}>
				<TouchableOpacity
					onPress={() => setNotificationActive(!notificationActive)}
				>
					<Image
						style={[
							styles.notificationIcon,
							//Change icon color when active
							notificationActive && { tintColor: COLORS.pink2 },
						]}
						source={
							!notificationActive
								? ICONS.prayer_notification
								: ICONS.prayer_notification_active
						}
					/>
				</TouchableOpacity>
				<Text style={styles.infoPrayer}>{time}</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 5,
	},
	infoPrayer: {
		...FONTS.body1,
		fontSize: SIZES.body2 + 4,
		color: COLORS.white,
	},
	activePrayer: {
		borderWidth: 2,
		borderColor: COLORS.secondary,
		borderRadius: 10,
	},
	timeContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	notificationIcon: {
		width: 25,
		height: 25,
		marginRight: 10,
		tintColor: COLORS.gray4,
	},
	notificationIconSet: {
		tintColor: COLORS.secondary,
	},
});
