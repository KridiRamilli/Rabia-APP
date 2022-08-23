import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dhikr, Qibla } from "../screens";
import RootStack from "./RootStack";
import { SIZES } from "../theme/theme";

const TabNavigator = createBottomTabNavigator();

const RootTab = () => {
  const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#fff",
      width: "85%",
      height: 60,
      border: "1px solid #fff",
      borderRadius: 30,
      marginBottom: 60,
      position: "absolute",
      left: "7.5%",
      shadowColor: "#ddd",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10.84,
      elevation: 5,
    },
    tabBarItemStyle: {
      backgroundColor: "teal",
      height: 56,
      borderRadius: 15,
      margin: 2,
      marginHorizontal: 5,
      paddingBottom: 5,
    },
    tabBarLabelStyle: {
      color: "#fff",
      fontSize: SIZES.body4 - 1,
    },
  };
  const sceneContainerStyle = {
    backgroundColor: "teal",
  };
  return (
    <NavigationContainer>
      <TabNavigator.Navigator
        initialRouteName='Prayer Times'
        {...{ screenOptions, sceneContainerStyle }}
      >
        <TabNavigator.Screen name='Dhikr' component={Dhikr} />
        <TabNavigator.Screen name='Prayer Times' component={RootStack} />
        <TabNavigator.Screen name='Qibla Finder' component={Qibla} />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default RootTab;
