import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Schedule, Settings, PrayerTimes, Countdown } from "../screens";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";
import SettingsStack from "./SettingsStack";

const Stack = createNativeStackNavigator();

const RootStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen
					name="PrayerTimes"
					component={PrayerTimes}
					options={{
						headerShown: false,
						title: "Prayer Times",
						headerStyle: {
							backgroundColor: COLORS.transparent,
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							...FONTS.h4,
							fontSize: SIZES.font + 4,
						},
					}}
				/>
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
				}}
			>
				<Stack.Screen
					name="Schedule"
					component={Schedule}
					options={{
						headerRight: () => (
							<TouchableOpacity
								onPress={() => navigation.navigate("PrayerTimes")}
							>
								<Image
									source={ICONS.close_icon}
									style={{
										width: 25,
										height: 25,
										marginLeft: 10,
									}}
								/>
							</TouchableOpacity>
						),
						headerLeft: () => (
							<TouchableOpacity>
								<Text>Today</Text>
							</TouchableOpacity>
						),
						headerTitleStyle: {
							...FONTS.h4,
							fontSize: SIZES.font + 4,
							backgroundColor: "red",
						},
					}}
				/>
				<Stack.Screen
					name="SettingsStack"
					component={SettingsStack}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Countdown"
					component={Countdown}
					options={{
						headerTitleStyle: {
							...FONTS.h4,
							fontSize: SIZES.font + 14,
							color: COLORS.white,
						},
						headerStyle: {
							backgroundColor: COLORS.black,
						},
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default RootStack;
