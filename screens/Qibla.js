import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Animated, Easing } from "react-native";
import { Magnetometer } from "expo-sensors";

import { COLORS, SIZES, FONTS } from "../theme/theme";

const spinValue = new Animated.Value(0);

function Qibla() {
  const [isFound, setIsFound] = useState(false);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    Magnetometer.setUpdateInterval(100);
    subscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [data]);

  //change background color when Qibla is found
  useEffect(() => {
    if (Math.abs(_degree(getAngle()) - 134) < 10) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  }, [data]);

  const { x, y, z } = data;

  const getAngle = () => {
    let angle = 0;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }

    return Math.round(angle);
  };

  const _degree = (magnetometer) => {
    return magnetometer >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `${_degree(getAngle())}deg`],
  });

  return (
    <View style={[styles.container, isFound ? styles.found : ""]}>
      <Text style={[styles.title, FONTS.h1]}>Kibla</Text>
      <View style={styles.imageContainer}>
        <Text style={styles.text}>{_degree(getAngle())}</Text>
        <Animated.Image
          style={{
            width: "100%",
            height: "100%",
            // transform: [{ rotate: "135deg" }],
            transform: [{ rotate: spin }],
          }}
          source={require("../assets/images/qibla_compass.png")}
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
    </View>
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
    width: 250,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  footer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
