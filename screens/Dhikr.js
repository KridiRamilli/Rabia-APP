import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { FONTS, COLORS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";
import { addCounter, resetCounter } from "../redux/reducers/counterSlice";
import { getTodayDate } from "../utils";
import { getData } from "../db";

const dhikrTimes = ["Morning", "Evening"];

export const Dhikr = ({ navigation }) => {
  const [todayDate, setTodayDate] = useState(() => {
    let today = getTodayDate();
    return today;
  });
  const counter = useSelector((state) => {
    // console.log(state);
    return state.counter;
  });
  const [logCounter, setLogCounter] = useState({ [todayDate]: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    setLogCounter(() => {
      return {
        ...logCounter,
        [todayDate]: logCounter[todayDate] + 1,
      };
    });
    getData();
  }, [counter.num]);

  const handleBtnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(addCounter());
  };

  const alertResetCounter = () => {
    Alert.alert("Reset Counter", "Jeni i sigurtë", [
      {
        text: "Cancel",
        //TODO: Remove console
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "PO", onPress: () => dispatch(resetCounter()) },
    ]);
  };

  //Alert before reseting
  const handleResetCounter = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    alertResetCounter();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dhikr</Text>
      <View style={styles.dhikrIconsContainer}>
        {dhikrTimes.map((el, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={styles.dhikrTimeContainer}
              onPress={() => navigation.navigate(el)}
            >
              <Image
                source={
                  el == "Morning"
                    ? ICONS.morning_dhikr_icon
                    : ICONS.evening_dhikr_icon
                }
                style={styles.dhikrTimeIcon}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.resetIconContainer}
          onPress={handleResetCounter}
        >
          <Image source={ICONS.reset_icon} style={styles.resetIcon} />
        </TouchableOpacity>
        <Text style={styles.counter}>{counter.num}</Text>
      </View>
      <TouchableOpacity style={styles.mainBtn} onPress={handleBtnPress}>
        <LinearGradient
          // Button Linear Gradient
          colors={[COLORS.pinkGradient, COLORS.purpleGradient]}
          style={styles.gradientBackground}
        >
          <Image source={ICONS.hand_icon} style={styles.icon} />
        </LinearGradient>
        <StatusBar style="dark" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.pink2,
    paddingTop: SIZES.padding / 4,
  },
  dhikrIconsContainer: {
    width: "85%",
    height: 60,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dhikrTimeContainer: {
    width: 130,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
    shadowColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  dhikrTimeIcon: {
    width: "100%",
    height: "100%",
  },
  counterContainer: {
    width: "65%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.margin,
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
    shadowColor: "#eee",
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
    color: COLORS.pink2,
  },
  mainBtn: {
    width: SIZES.width * 0.55,
    height: SIZES.width * 0.55,
    borderRadius: (SIZES.width + SIZES.height) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.margin * 11,
    backgroundColor: COLORS.white,
    shadowColor: "#888",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
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
    resizeMode: "contain",
  },
});
