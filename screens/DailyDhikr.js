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
import * as ScreenOrientation from "expo-screen-orientation";
import { ProgressBar } from "react-native-paper";

import { DhikrItem } from "../components/DhikrItem";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ICONS } from "./../constants/icons";
import { TOTAL_MORNING_DHIKR, TOTAL_EVENING_DHIKR } from "../constants/dhikr";

import dailyDhikrSlice, {
	resetMorningDhikr,
	resetEveningDhikr,
	substractMorningDhikr,
	substractEveningDhikr,
} from "../redux/reducers/dailyDhikrSlice";

export const DailyDhikr = ({ navigation, route }) => {
	const { dhikrName, theme } = route.params;

	const dhikrData = useSelector((state) => {
		return dhikrName === "Morning"
			? state.dailyDhikr.MORNING_DHIKR
			: state.dailyDhikr.EVENING_DHIKR;
	});

	const done = useSelector((state) => {
		return {
			morning_dhikr: state.dailyDhikr.done_morning_dhikr,
			evening_dhikr: state.dailyDhikr.done_evening_dhikr,
		};
	});

	const flatListRef = useRef();
	const dispatch = useDispatch();

	// const changeProgress = () => {
	// 	dhikrName === "Morning"
	// 		? setDhikr((prev) => ({
	// 				...prev,
	// 				done_morning_dhikr: (dhikr.done_morning_dhikr += 1),
	// 		  }))
	// 		: setDhikr((prev) => ({
	// 				...prev,
	// 				done_evening_dhikr: (dhikr.done_evening_dhikr += 1),
	// 		  }));
	// };

	useEffect(() => {
		//scroll to first unfinished dhikr
		setTimeout(() => {
			let idx = dhikrData.findIndex((el) => el.repeat > 0);
			idx === -1
				? flatListRef.current.scrollToEnd({ animated: true })
				: flatListRef.current.scrollToIndex({ animated: true, index: idx });
		}, 500);
	}, []);

	useEffect(() => {
		(async () => {
			//TODO Lock daily dhikr to portrait mode
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP
			);
		})();
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: theme === "dark" ? "#101821" : "#fff",
			},
			headerTitleStyle: {
				...FONTS.h4,
				fontSize: SIZES.font + 6,
				color: theme === "dark" ? "#fff" : "#101821",
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
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						dispatch(
							dhikrName === "Morning"
								? resetMorningDhikr()
								: resetEveningDhikr()
						);
						//scroll to top
						flatListRef.current.scrollToOffset({ offset: 0, animated: true });
						//TODO find right method to reset dhikr
						// setDhikrData(
						//  dhikrName === "Morning" ? MORNING_DHIKR : EVENING_DHIKR
						// );
					}}
				>
					<Text style={styles.resetText}>Reset</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const renderItem = ({ item }) => {
		const { id, arabic, alb, repeat, note } = item;
		return (
			<DhikrItem
				id={id}
				dhikrArab={arabic}
				dhikrAlbanian={alb}
				repeat={repeat}
				note={note}
				handlePress={handlePress}
				theme={theme}
			/>
		);
	};

	//TODO try to achieve O(1) when changing repeat
	const handlePress = (id) => {
		// dhikrData[id].repeat > 0 && changeProgress();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		if (dhikrData[id].repeat > 0) {
			dhikrName === "Morning"
				? dispatch(substractMorningDhikr(id))
				: dispatch(substractEveningDhikr(id));
		}

		//scroll to next dhikr when done (exclude the last one)
		if (dhikrData[id].repeat <= 1 && id < dhikrData.length - 1) {
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
			<ProgressBar
				progress={
					dhikrName === "Morning"
						? done.morning_dhikr / TOTAL_MORNING_DHIKR
						: done.evening_dhikr / TOTAL_EVENING_DHIKR
				}
				width={SIZES.width}
				style={{
					backgroundColor: COLORS.lightGray3,
				}}
				color={COLORS.darkPurple}
			/>
			<FlatList
				ref={flatListRef}
				data={dhikrData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				onScrollToIndexFailed={(err) => {
					console.log(err, "failed to scroll");
				}}
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
