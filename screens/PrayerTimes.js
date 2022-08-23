import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { LinearGradient } from "expo-linear-gradient";
import { DateHeader } from "../components";
import { IMAGES, ICONS } from "../constants";

import { COLORS } from "../theme/theme";

function PrayerTimes({ navigation }) {
  return (
    <ImageBackground style={styles.imageBackground} source={IMAGES.little_girl}>
      <LinearGradient
        style={styles.gradientBackground}
        colors={[COLORS.primary95, COLORS.darkBlue95]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* upper icons */}
          <View style={styles.upper}>
            <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
              <Image source={ICONS.schedule_icon} style={styles.upperIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Image source={ICONS.settings_icon} style={styles.upperIcons} />
            </TouchableOpacity>
          </View>
          {/* Finish: upper icons */}
          <ScrollView style={styles.container}>
            <View style={styles.prayerTimes}>
              {/* <Text>PrayerTimes</Text> */}
              <DateHeader />
            </View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar style='light' />
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  upper: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 10,
    backgroundColor: COLORS.transparent,
  },
  upperIcons: {
    resizeMode: "contain",
    width: 25,
    height: 25,
  },
  prayerTimes: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PrayerTimes;
