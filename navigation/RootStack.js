import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Schedule, Settings, PrayerTimes } from "../screens";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name='PrayerTimes' component={PrayerTimes} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name='Schedule' component={Schedule} />
        <Stack.Screen name='Settings' component={Settings} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
