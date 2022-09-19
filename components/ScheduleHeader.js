import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme/theme";

const times = [
  "Imsaku",
  "Sabahu",
  "Lindja Diellit",
  "Dreka",
  "Ikindia",
  "Akshami",
  "Jacia",
];

export const ScheduleHeader = () => {
  return (
    <View style={styles.container}>
      {times.map((time, idx) => {
        return (
          <Text style={styles.time} key={idx}>
            {time}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.padding / 2,
    paddingLeft: SIZES.width * 0.15,
  },
  time: {
    color: COLORS.white,
    fontSize: SIZES.h5,
    fontFamily: "Roboto-Regular",
  },
});
