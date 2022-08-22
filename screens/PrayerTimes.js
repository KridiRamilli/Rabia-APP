import { Text, View, StyleSheet } from "react-native";
import React from "react";

function PrayerTimes({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.schedule}>
          <Text onPress={() => navigation.navigate("Schedule")}>
            ScheduleIcon
          </Text>
        </View>
        <View style={styles.settings}>
          <Text onPress={() => navigation.navigate("Settings")}>
            SettingsIcon
          </Text>
        </View>
      </View>
      <View style={styles.prayerTimes}>
        <Text>PrayerTimes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  upper: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});

export default PrayerTimes;
