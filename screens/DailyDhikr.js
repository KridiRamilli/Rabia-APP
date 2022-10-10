import { useRef, useState } from "react";
import {
	StyleSheet,
	FlatList,
	View,
	TouchableOpacity,
	Text,
	Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import { DhikrItem } from "../components/DhikrItem";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { useEffect } from "react";

import { MORNING_DHIKR, EVENING_DHIKR } from "../constants/dhikr";
import { ICONS } from "./../constants/icons";

export const DailyDhikr = ({ navigation, route }) => {
	const { dhikrName, theme } = route.params;

	const [dhikrData, setDhikrData] = useState(
		dhikrName === "Morning" ? MORNING_DHIKR : EVENING_DHIKR
	);
	const flatListRef = useRef();
	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: theme === "dark" ? "#101821" : "#fff",
			},
			headerTitleStyle: {
				...FONTS.h4,
				fontSize: SIZES.font + 6,
				color: theme === "dark" ? "#fff" : "#000",
			},
			headerRight: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={ICONS.close_icon}
						style={[styles.closeIcon, theme === "dark" && styles.closeIconDark]}
					/>
				</TouchableOpacity>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={styles.resetContainer}
					onPress={() => {
						//TODO find right method to reset dhikr
						setDhikrData(
							dhikrName === "Morning" ? MORNING_DHIKR : EVENING_DHIKR
						);
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
				theme={theme}
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
		<View
			style={[
				styles.container,
				theme === "dark" && { backgroundColor: "#2C3A47" },
			]}
		>
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
	closeIcon: {
		width: 25,
		height: 25,
		marginLeft: 10,
	},
	closeIconDark: {
		tintColor: "#fff",
	},
});
