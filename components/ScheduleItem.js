import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme/theme";
import { mapValuesToArray, formatScheduleDate } from "../utils";

export const ScheduleItem = ({ prayerTimeSchedule, todayDate }) => {
	const id = prayerTimeSchedule.get("id");
	const date = prayerTimeSchedule.get("date");
	//remove id and date from array
	const [, ...dailyTimes] = mapValuesToArray(prayerTimeSchedule);
	return (
		<View
			style={[
				styles.container,
				// mark today timings
				formatScheduleDate(todayDate) == date ? styles.today : "",
				// style table with zebra rows
				id % 2 == 0 ? styles.even : styles.odd,
			]}
		>
			{/* Generate prayer timing */}
			{dailyTimes.map((value, idx) => {
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
		flex: 0.12,
		textAlign: "center",
	},
});
