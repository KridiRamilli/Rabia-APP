import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { IntroButton } from "./IntroButton";

const slideBtnInfo = {
  0: "",
  1: "Allow Notifications",
  2: "Allow Location",
};

export const IntroPagination = ({ activeIndex, slider, slides }) => {
  return (
    <View style={styles.paginationContainer}>
      <SafeAreaView style={styles.contentArea}>
        {/* Render custom pagination dots */}
        <View style={styles.paginationDots}>
          {slides.length > 1 &&
            slides.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex
                    ? { backgroundColor: COLORS.pink2 }
                    : { backgroundColor: "rgba(0, 0, 0, .2)" },
                ]}
                onPress={() => slider?.current.goToSlide(i, true)}
              />
            ))}
        </View>
        <View style={styles.buttonContainer}>
          {/* show skip only on notifications page */}
          {activeIndex === 1 ? <Text>Skip</Text> : <View></View>}
          <IntroButton
            rounded={activeIndex == 0}
            text={slideBtnInfo[activeIndex]}
            activeIndex={activeIndex}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 200,
    alignItems: "center",
  },
  contentArea: {
    flex: 0.8,
    width: "100%",
    justifyContent: "space-between",
  },
  paginationDots: {
    height: 17,
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 17,
    height: 17,
    borderRadius: 9,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: "#1cb278",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
