import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme/theme";

export const ScheduleItem = ({ prayerTimeSchedule, date }) => {
	//Remove ID from showing in schedule
	const { id, ...dailyTimes } = prayerTimeSchedule;
	return (
		<View
			style={[
				styles.container,
				// mark today timings
				prayerTimeSchedule.date == date ? styles.today : "",
				// style table with zebra rows
				prayerTimeSchedule.id % 2 == 0 ? styles.even : styles.odd,
			]}
		>
			{/* Generate prayer timing */}
			{Object.values(dailyTimes).map((value, idx) => {
				return (
					<Text key={idx} style={styles.time}>
						{value}
					</Text>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	odd: {
		backgroundColor: COLORS.oddGray,
	},
	even: {
		backgroundColor: COLORS.evenGray,
	},
	today: {
		borderWidth: 2,
		borderColor: COLORS.secondary,
		borderRadius: SIZES.radius,
	},
	time: {
		fontSize: SIZES.font,
		color: COLORS.white,
	},
});
