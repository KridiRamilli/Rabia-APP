import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Prayer, Dhikr, Qibla } from "./screens";
const TabNavigator = createBottomTabNavigator();
export default function App() {
  const screenOptions = {
    unmountOnBlur: false,
    tabBarStyle: {
      backgroundColor: "#fff",
      width: "85%",
      height: 60,
      border: "1px solid #eee",
      borderRadius: 30,
      marginBottom: 20,
      position: "absolute",
      left: "50%",
      shadowColor: "#ddd",
      transform: [{ translateX: "-50%" }],
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.84,
      elevation: 5,
    },
    tabBarItemStyle: {
      // backgroundColor: "#00ff00",
      margin: 5,
      borderRadius: 30,
    },
  };
  const sceneContainerStyle = {
    backgroundColor: "teal",
  };
  return (
    <NavigationContainer>
      <TabNavigator.Navigator
        initialRouteName='PrayerTimes'
        {...{ screenOptions, sceneContainerStyle }}
      >
        <TabNavigator.Screen name='Dhikr' component={Dhikr} />
        <TabNavigator.Screen
          name='Prayer Times'
          component={Prayer}
          options={{
            headerShown: false,
          }}
        />
        <TabNavigator.Screen name='Qibla Finder' component={Qibla} />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
