import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Dhikr, Qibla, IntroScreens } from "../screens";
import { screenOptions } from "./TabOptions";
import RootStack from "./RootStack";
import { selectSettings } from "../redux/reducers/settingsSlice";

const TabNavigator = createBottomTabNavigator();

const RootTab = () => {
	const { showRealApp } = useSelector(selectSettings);
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
						<TabNavigator.Screen name="Dhikr" component={Dhikr} />
						<TabNavigator.Screen name="Prayer Times" component={RootStack} />
						<TabNavigator.Screen name="Qibla Finder" component={Qibla} />
					</TabNavigator.Navigator>
				</NavigationContainer>
			)}
		</>
	);
};

export default RootTab;
