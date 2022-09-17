import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Schedule, Settings, PrayerTimes } from "../screens";
import { COLORS, FONTS, SIZES } from "../theme/theme";
const Stack = createNativeStackNavigator();

const RootStack = () => {
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitleStyle: {
              ...FONTS.h4,
              fontSize: SIZES.font + 4,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
