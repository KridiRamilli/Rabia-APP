import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { COLORS, FONTS, SIZES } from "../theme/theme";

export const PrayerItem = ({ prayer, time, activePrayer }) => {
  return (
    <View style={[styles.container, activePrayer && styles.activePrayer]}>
      <Text style={styles.infoPrayer}>{prayer}</Text>
      <Text style={styles.infoPrayer}>{time}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoPrayer: {
    ...FONTS.body1,
    fontSize: SIZES.body2 + 4,
    color: COLORS.white,
  },
  activePrayer: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    padding: 5,
    borderRadius: 10,
  },
});
