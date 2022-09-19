import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { ScheduleItem, ScheduleHeader } from "../components/index";
import { prayerTimesSchedule as DATA } from "../__mocks__/prayerTimesSchedule";

const date = "18 Sep";

export const Schedule = ({ handlePress }) => {
	const renderItem = ({ item }) => (
		<ScheduleItem prayerTimeSchedule={item} date={date} />
	);
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				ListHeaderComponent={<ScheduleHeader />}
				stickyHeaderIndices={[0]}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
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
