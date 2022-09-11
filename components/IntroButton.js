import React, { useEffect } from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { ICONS } from "../constants";
import { COLORS } from "../theme/theme";

export const IntroButton = ({ activeIndex, rounded, text }) => {
  useEffect(() => {
    if (!rounded) {
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

  const handleBtnPress = (pageIdx) => {
    switch (pageIdx) {
      case 0:
        console.log("go to second page");
      case 1:
      //ask for notifications
      case 2:
      //Ask for location and exit
    }
  };

  return (
    <TouchableOpacity onPress={() => handleBtnPress(activeIndex)}>
      <Animated.View style={[styles.roundedBtn, animatedStyle]}>
        {rounded ? (
          <Image source={ICONS.intro_arrow} style={styles.btnImage} />
        ) : (
          <Animated.Text style={[{ color: "#fff" }, animatedTextStyle]}>
            {text}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedBtn: {
    borderRadius: 50,
    backgroundColor: COLORS.darkPurple,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 5,
  },
});
