import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Schedule, Settings, PrayerTimes } from "../screens";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";

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
					// headerShown: false
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
					name="Settings"
					component={Settings}
					options={{
						headerTitleStyle: {
							...FONTS.h4,
							fontSize: SIZES.font + 4,
						},
						// headerStyle: {
						//   backgroundColor: COLORS.pinkGradient,
						// },
						// headerLeft: () => {
						//   navigation.goBack();
						// },
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default RootStack;
