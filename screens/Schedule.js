import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../theme/theme";
import { ScheduleItem, ScheduleHeader } from "../components/index";
import { prayerTimesSchedule as DATA } from "../__mocks__/prayerTimesSchedule";
import { getPrayers } from "../db";

const date = "18 Sep";

export const Schedule = ({ route, handlePress }) => {
	const [data, setData] = useState([]);
	const { todayDate } = route.params;
	useEffect(() => {
		(async () => {
			const prayers = await getPrayers(50, todayDate, 10);
			setData(prayers);
		})();
	}, []);

	const renderItem = ({ item }) => (
		<ScheduleItem prayerTimeSchedule={item} todayDate={todayDate} />
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				ListHeaderComponent={<ScheduleHeader />}
				stickyHeaderIndices={[0]}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.get("id")}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.oddGray,
	},
});
