import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { DateTime } from "luxon";
import { FONTS, COLORS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";

const getTodayDate = () => {
  let dt = DateTime.now();
  return dt.toLocaleString();
};

function Dhikr() {
  const [counter, setCounter] = useState(0);
  const [logCounter, setLogCounter] = useState({
    [getTodayDate()]: 0,
  });

  useEffect(() => {
    setLogCounter({
      [getTodayDate()]: counter,
    });
  }, [counter]);

  const handleBtnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCounter((counter) => counter + 1);
  };

  const alertResetCounter = () => {
    Alert.alert("Reset Counter", "Jeni i sigurtë", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "PO", onPress: () => setCounter(0) },
    ]);
  };
  const resetCounter = () => {
    alertResetCounter();
  };

  getTodayDate();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dhikr</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.resetIconContainer}
          onPress={resetCounter}
        >
          <Image source={ICONS.reset_icon} style={styles.resetIcon} />
        </TouchableOpacity>
        <Text style={styles.counter}>{counter}</Text>
      </View>
      <TouchableOpacity style={styles.mainBtn} onPress={handleBtnPress}>
        <LinearGradient
          // Button Linear Gradient
          colors={[COLORS.pinkGradient, COLORS.purpleGradient]}
          style={styles.gradientBackground}
        >
          <Image source={ICONS.hand_icon} style={styles.icon} />
        </LinearGradient>
        <StatusBar style='dark' />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.pink2,
    paddingTop: SIZES.padding / 4,
  },
  counterContainer: {
    width: "65%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.margin * 3,
    marginBottom: SIZES.margin,
  },
  resetIconContainer: {
    position: "absolute",
    right: 5,
    top: 5,
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
    padding: SIZES.padding / 4,
    shadowColor: "#eee",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  resetIcon: {
    width: "100%",
    height: "100%",
  },
  counter: {
    fontSize: SIZES.font * 7,
    fontFamily: "Roboto-Bold",
    // fontFamily: "Roboto-Regular",
    color: COLORS.pink2,
  },
  mainBtn: {
    width: SIZES.width * 0.55,
    height: SIZES.width * 0.55,
    borderRadius: (SIZES.width + SIZES.height) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.margin * 11,
    backgroundColor: COLORS.white,
    shadowColor: "#888",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  gradientBackground: {
    width: "97%",
    height: "97%",
    borderRadius: (SIZES.width + SIZES.height) / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
});

export default Dhikr;
