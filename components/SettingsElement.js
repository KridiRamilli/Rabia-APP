import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ICONS } from "../constants";
import { COLORS, SIZES } from "../theme/theme";

export const SettingsElement = ({ setting, settingIcon }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.setting}>
        <Image source={settingIcon} style={styles.arrowIcon} />
        <Text style={styles.settingText}> {setting}</Text>
      </View>
      <TouchableOpacity>
        <Image source={ICONS.right_arrow_icon} style={styles.arrowIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: SIZES.height * 0.05,
    marginBottom: SIZES.margin - 6,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray4,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    width: 25,
    height: 25,
    paddingRight: 10,
  },
  settingText: {
    marginLeft: 10,
    fontSize: SIZES.h3,
    fontFamily: "Roboto-Light",
  },
});
