import { useRef, useState } from "react";
import {
	StyleSheet,
	FlatList,
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import * as Haptics from "expo-haptics";
import { DhikrItem } from "../components/DhikrItem";
import { COLORS, SIZES } from "../theme/theme";
import { useEffect } from "react";

import { MORNING_DHIKR, EVENING_DHIKR } from "../constants/dhikr";

export const DailyDhikr = ({ navigation, route }) => {
	const { time, theme } = route.params;

	const [dhikrData, setDhikrData] = useState(
		time === "Morning" ? MORNING_DHIKR : EVENING_DHIKR
	);

	const flatListRef = useRef();
	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={styles.resetContainer}
					onPress={() => {
						//TODO find right method to reset dhikr
						setDhikrData(time === "Morning" ? MORNING_DHIKR : EVENING_DHIKR);
					}}
				>
					<Text style={styles.resetText}>Reset</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const renderItem = ({ item }) => {
		return (
			<DhikrItem
				id={item.id}
				dhikrArab={item.arabic}
				dhikrAlbanian={item.alb}
				repeat={item.repeat}
				note={item.note}
				handlePress={handlePress}
			/>
		);
	};

	//TODO try to achieve O(1) when changing repeat
	const handlePress = (id) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		const updatedDhikrData = dhikrData.map((el) => {
			//decrement pressed dhikr value
			return el.id !== id || el.repeat <= 0
				? el
				: { ...el, repeat: el.repeat - 1 };
		});
		setDhikrData(updatedDhikrData);

		//scroll to next dhikr when done (exclude the last one)
		if ((dhikrData[id].repeat <= 1) & (id < dhikrData.length - 1)) {
			setTimeout(() => {
				flatListRef.current.scrollToIndex({ animated: true, index: id + 1 });
			}, 800);
		}
	};
	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={dhikrData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#c2e8fa",
	},
	resetContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 5,
		shadowColor: "#ccc",
		shadowOpacity: 0.6,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 0,
		},
	},
	resetText: {
		display: "flex",
		alignSelf: "center",
		fontSize: SIZES.body3,
		fontFamily: "Roboto-Medium",
		paddingVertical: 5,
		paddingHorizontal: 10,
		color: COLORS.darkPurple,
	},
});
