import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dhikr, Qibla } from "../screens";
import RootStack from "./RootStack";
import { SIZES, FONTS, COLORS } from "../theme/theme";
import { ICONS } from "../constants/";

const TabNavigator = createBottomTabNavigator();

const RootTab = () => {
  const screenOptions = ({ route, ...props }) => ({
    unmountOnBlur: false,
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = "";
      if (route.name == "Dhikr") {
        iconName = "dhikr_icon";
      } else if (route.name == "Prayer Times") {
        iconName = "prayer_times_icon";
      } else {
        iconName = "qibla_icon";
      }
      return (
        <Image
          style={{
            width: size,
            height: size,
            tintColor: focused ? COLORS.secondary : COLORS.lightGray2,
          }}
          source={ICONS[iconName]}
        />
      );
    },
    tabBarActiveTintColor: COLORS.secondary,
    tabBarInactiveTintColor: COLORS.lightGray2,
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
      height: 52,
      borderRadius: 15,
      margin: 4,
      marginHorizontal: 10,
      paddingBottom: 2,
    },
    tabBarLabelStyle: {
      ...FONTS.body4,
      lineHeight: 0,
    },
  });
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