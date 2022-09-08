import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";

export const IntroButton = ({ playIcon }) => {
  return (
    <View style={styles.longBtn}>
      {playIcon ? <Image /> : <Text>IntroButton</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  roundedBtn: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: COLORS.pinkGradient,
    bottom: 20,
    right: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  longBtn: {
    width: 150,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.pinkGradient,
  },
});
