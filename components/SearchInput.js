import { View, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

import { SIZES, COLORS } from "../theme/theme";
import { ICONS } from "../constants";

export const SearchInput = () => {
  const [input, setInput] = useState();
  return (
    <View style={styles.container}>
      <Image source={ICONS.search_icon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={"Search for a setting..."}
        placeholderTextColor={COLORS.gray4}
        selectionColor={COLORS.pink2}
        value={input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.85,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius - 5,
    backgroundColor: COLORS.lightGray3,
  },
  icon: {
    width: 25,
    height: 25,
    opacity: 0.2,
    marginHorizontal: SIZES.margin - 5,
  },
  input: {
    flex: 1,
    fontSize: SIZES.body2 - 2,
    fontFamily: "Roboto-Regular",
    paddingVertical: SIZES.padding / 2,
  },
});
