import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Qibla, IntroScreens } from "../screens";
import { screenOptions } from "./TabOptions";
import RootStack from "./RootStack";
import DhikrStack from "./DhikrStack";
const TabNavigator = createBottomTabNavigator();

const RootTab = () => {
	const [showRealApp, setShowRealApp] = useState(true);

	return (
		<>
			{!showRealApp ? (
				<IntroScreens />
			) : (
				<NavigationContainer>
					<TabNavigator.Navigator
						initialRouteName="Prayer Times"
						{...{ screenOptions }}
					>
						{/* {TODO change name } */}
						<TabNavigator.Screen name="Dhikr Counter" component={DhikrStack} />
						<TabNavigator.Screen name="Prayer Times" component={RootStack} />
						<TabNavigator.Screen name="Qibla Finder" component={Qibla} />
					</TabNavigator.Navigator>
				</NavigationContainer>
			)}
		</>
	);
};

export default RootTab;
