import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { ICONS } from "../constants";
import { FONTS, COLORS } from "../theme/theme";

const NextPrayer = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.gray2, COLORS.gray4]}
        style={styles.upper}
      >
        <LinearGradient
          colors={[COLORS.darkGreen, COLORS.green]}
          style={[styles.inner, { width: "50%" }]}
        ></LinearGradient>
      </LinearGradient>
      <Image source={ICONS.next_prayer_icon} style={styles.icon} />
      <Text style={styles.infoText}>Ikindia 1h 53m 07s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  upper: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.lightGray3,
  },
  inner: {
    flex: 1,
    width: "70%",
    borderRadius: 20,
  },
  infoText: {
    ...FONTS.body2,
    color: COLORS.white,
    justifySelf: "center",
    position: "absolute",
  },
  icon: {
    resizeMode: "contain",
    width: 25,
    height: 25,
    position: "absolute",
    left: 10,
  },
});

export default NextPrayer;
