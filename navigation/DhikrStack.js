import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ICONS } from "../constants";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { Dhikr, DailyDhikr } from "../screens";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const dhikrTimes = ["Morning", "Evening"];

const DhikrStack = ({ navigation, route }) => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen
					name="Dhikr"
					component={Dhikr}
					options={{
						headerShown: false,
					}}
				></Stack.Screen>
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
				}}
			>
				{dhikrTimes.map((time, idx) => {
					return (
						<Stack.Screen
							key={idx}
							name={time}
							component={DailyDhikr}
							options={{
								headerRight: () => (
									<TouchableOpacity onPress={() => navigation.goBack()}>
										<Image source={ICONS.close_icon} style={styles.closeIcon} />
									</TouchableOpacity>
								),
								headerLeft: () => (
									<TouchableOpacity style={styles.resetContainer}>
										<Text style={styles.resetText}>Reset</Text>
									</TouchableOpacity>
								),
								headerTitleStyle: {
									...FONTS.h4,
									fontSize: SIZES.font + 4,
								},
							}}
						></Stack.Screen>
					);
				})}
			</Stack.Group>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	closeIcon: {
		width: 25,
		height: 25,
		marginLeft: 10,
	},
	resetContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 5,
		shadowColor: "#ccc",
		shadowOpacity: 0.8,
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
export default DhikrStack;
