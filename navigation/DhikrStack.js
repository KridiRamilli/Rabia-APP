import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dhikr } from "../screens";
import { Morning } from "../screens/Morning";
import { Evening } from "../screens/Evening";
import { Image, TouchableOpacity, Text } from "react-native";
import { ICONS } from "../constants";
import { FONTS, SIZES } from "../theme/theme";

const Stack = createNativeStackNavigator();

const DhikrStack = ({ navigation, route }) => {
	return (
		<Stack.Navigator>
			<Stack.Group>
				<Stack.Screen name="Dhikr" component={Dhikr}></Stack.Screen>
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
				}}
			>
				<Stack.Screen
					name="Morning"
					component={Morning}
					options={{
						headerRight: () => (
							<TouchableOpacity onPress={() => navigation.goBack()}>
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
							<TouchableOpacity onPress={() => console.log("reset", route)}>
								<Text>Reset</Text>
							</TouchableOpacity>
						),
						headerTitleStyle: {
							...FONTS.h4,
							fontSize: SIZES.font + 4,
						},
					}}
				></Stack.Screen>
				<Stack.Screen
					name="Evening"
					component={Evening}
					options={{
						headerRight: () => (
							<TouchableOpacity onPress={() => navigation.goBack()}>
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
						headerTitleStyle: {
							...FONTS.h4,
							fontSize: SIZES.font + 4,
							backgroundColor: "red",
						},
					}}
				></Stack.Screen>
			</Stack.Group>
		</Stack.Navigator>
	);
};
export default DhikrStack;
