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
						></Stack.Screen>
					);
				})}
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default DhikrStack;
