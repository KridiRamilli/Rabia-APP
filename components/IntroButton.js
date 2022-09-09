import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export const IntroButton = ({ playIcon, rounded, text }) => {
  useEffect(() => {
    if (rounded) {
      animatedWidth.value = withTiming(150, config);
      animatedHeight.value = withTiming(40, config);
      animatedOpacity.value = withTiming(1, {
        duration: 500,
      });
    } else {
      animatedOpacity.value = withTiming(0, config);
      animatedWidth.value = withTiming(70, config);
      animatedHeight.value = withTiming(70, config);
    }
  }, [rounded]);

  const animatedWidth = useSharedValue(70);
  const animatedHeight = useSharedValue(70);
  const animatedOpacity = useSharedValue(0);

  const config = {
    duration: 200,
    easing: Easing.ease,
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
      height: animatedHeight.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.roundedBtn, animatedStyle]}>
      {playIcon ? (
        <Image />
      ) : (
        <Animated.Text style={[{ color: "#fff" }, animatedTextStyle]}>
          {text}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  roundedBtn: {
    borderRadius: 50,
    backgroundColor: COLORS.pinkGradient,
    justifyContent: "center",
    alignItems: "center",
  },
});
