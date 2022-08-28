import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import { Magnetometer } from "expo-sensors";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
// import CompassHeading from "react-native-compass-heading";

import { IMAGES } from "../constants";
import { COLORS, SIZES, FONTS } from "../theme/theme";

function Qibla() {
  const [isFound, setIsFound] = useState(false);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [directionAngle, setDirectionAngle] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const spinValue = useSharedValue(0);

  const config = {
    duration: 200,
    easing: Easing.linear,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // width: withTiming(spinValue.value, config),
      transform: [
        {
          rotate: withTiming(`${directionAngle}deg`, config),
        },
      ],
    };
  });

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        const { x, y, z } = result;
        setData({
          x,
          y,
          z,
        });
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    Magnetometer.setUpdateInterval(40);
    subscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    spinValue.value = directionAngle;
  }, [directionAngle]);

  useEffect(() => {
    getAngle(data);
  }, [data]);

  //change background color when Qibla is found
  // useEffect(() => {
  //   if (Math.abs(_degree(directionAngle) - 134) < 10) {
  //     setIsFound(true);
  //   } else {
  //     setIsFound(false);
  //   }
  // }, [directionAngle]);

  const getAngle = (data) => {
    let angle = 0;
    const { x, y } = data;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
    // angle = _degree(angle);

    if (Math.abs(directionAngle - angle) > 0) {
      setDirectionAngle(Math.round(angle));
    }
  };

  const _degree = (magnetometer) => {
    return magnetometer >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <SafeAreaView style={[styles.container, isFound ? styles.found : ""]}>
      <Text style={[styles.title, FONTS.h1]}>Kibla</Text>
      <View style={styles.imageContainer}>
        <Text style={styles.text}>{directionAngle}</Text>
        <Animated.Image
          style={[styles.image, animatedStyle]}
          source={IMAGES.qibla_compass}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerElement}>
          <Text style={styles.text}>Meka</Text>
          <Text style={styles.text}>2916.1 km</Text>
        </View>
        <View style={styles.footerElement}>
          <Text style={styles.text}>Kibla</Text>
          <Text style={styles.text}>133.21°N</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 7,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.black,
  },
  found: {
    backgroundColor: COLORS.primary,
  },
  title: {
    color: COLORS.white,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.4,
  },
  footer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 150,
  },
  footerElement: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.white,
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.h2,
    padding: 1,
  },
});

export default Qibla;
