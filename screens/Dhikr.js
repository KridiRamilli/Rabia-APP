import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { FONTS, COLORS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";

function Dhikr() {
  const [counter, setCounter] = useState(1050);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dhikr</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.resetIconContainer}
          onPress={() => {
            setCounter(0);
          }}
        >
          <Image source={ICONS.reset_icon} style={styles.resetIcon} />
        </TouchableOpacity>
        <Text style={styles.counter}>{counter}</Text>
      </View>
      <TouchableOpacity
        style={styles.outer}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={[COLORS.pinkGradient, COLORS.purpleGradient]}
          style={styles.gradientBackground}
        >
          <Image source={ICONS.settings_icon} style={styles.icon} />
        </LinearGradient>
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
    ...FONTS.h2,
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
    shadowColor: "#ccc",
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
  outer: {
    width: SIZES.width * 0.45,
    height: SIZES.width * 0.45,
    borderRadius: (SIZES.width + SIZES.height) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.margin * 11,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.lightGray2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
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
  },
});

export default Dhikr;
