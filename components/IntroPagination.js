import React from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNotificationsPermission, getLocationPermission } from "../utils";
import {
	setShowRealApp,
	setLocationStatus,
	setNotificationStatus,
	selectSettings,
} from "../redux/reducers/settingsSlice";
import { IntroButton } from "./IntroButton";
import { COLORS } from "../theme/theme";

const slideBtnInfo = {
	0: "",
	1: "Allow Notifications",
	2: "Allow Location",
};

export const IntroPagination = ({ activeIndex, slider, slides }) => {
	const dispatch = useDispatch();
	const { locationStatus, notificationStatus } = useSelector(selectSettings);

	let buttonText = "";
	const isLocationStatusSet = locationStatus !== "undetermined";
	const isNotificationSet = notificationStatus !== "undetermined";

	if (isLocationStatusSet && activeIndex === 2) {
		buttonText = "Done";
	} else if (isNotificationSet && activeIndex === 1) {
		buttonText = "Next";
	} else {
		buttonText = slideBtnInfo[activeIndex];
	}

	const goToNextSlide = (pageIdx, slider) => {
		return slider.current.goToSlide(pageIdx + 1);
	};

	const handleNotificationPermission = async () => {
		const notificationStatus = await getNotificationsPermission();
		dispatch(setNotificationStatus(notificationStatus));
		if (isNotificationSet) {
			goToNextSlide(activeIndex, slider);
		}
	};

	const handleLocationPermission = async () => {
		const locationStatus = await getLocationPermission();
		dispatch(setLocationStatus(locationStatus));
	};

	const handleDone = async () => {
		if (!isLocationStatusSet) {
			handleLocationPermission();
		} else {
			dispatch(setShowRealApp(true));
		}
	};

	const handleBtnPress = (pageIdx, slider) => {
		switch (pageIdx) {
			case 0:
				goToNextSlide(pageIdx, slider);
				break;
			case 1:
				handleNotificationPermission();
				break;
			case 2:
				handleDone();
				break;
		}
	};

	return (
		<View style={styles.paginationContainer}>
			<SafeAreaView style={styles.contentArea}>
				{/* Render custom pagination dots */}
				<View style={styles.paginationDots}>
					{slides.length > 1 &&
						slides.map((_, i) => (
							<TouchableOpacity
								key={i}
								style={[
									styles.dot,
									i === activeIndex
										? { backgroundColor: COLORS.pink2 }
										: {
												backgroundColor: "rgba(0, 0, 0, .2)",
										  },
								]}
								onPress={() => slider?.current.goToSlide(i, true)}
							/>
						))}
				</View>
				<View style={styles.buttonContainer}>
					{/* show skip only on notifications page */}
					{activeIndex === 1 && !isNotificationSet ? (
						<TouchableOpacity
							onPress={() => slider.current.goToSlide(activeIndex + 1)}
						>
							<Text>Skip</Text>
						</TouchableOpacity>
					) : (
						<View></View>
					)}
					<IntroButton
						rounded={activeIndex == 0}
						text={buttonText}
						activeIndex={activeIndex}
						slider={slider}
						handleBtnPress={() => handleBtnPress(activeIndex, slider)}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	paginationContainer: {
		position: "absolute",
		bottom: 16,
		left: 16,
		right: 16,
		height: "21%",
		alignItems: "center",
	},
	contentArea: {
		flex: 0.8,
		width: "100%",
		justifyContent: "space-between",
	},
	paginationDots: {
		height: 17,
		margin: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	dot: {
		width: 17,
		height: 17,
		borderRadius: 9,
		marginHorizontal: 8,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 24,
	},
	button: {
		flex: 1,
		paddingVertical: 20,
		marginHorizontal: 8,
		borderRadius: 24,
		backgroundColor: "#1cb278",
	},
	buttonText: {
		color: "white",
		fontWeight: "600",
		textAlign: "center",
	},
});
