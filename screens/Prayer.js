import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Schedule, Settings, PrayerTimes } from "../screens";

const Stack = createNativeStackNavigator();

const Prayer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PrayerTimes' component={PrayerTimes} />
      <Stack.Screen name='Schedule' component={Schedule} />
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  );
};

export default Prayer;
