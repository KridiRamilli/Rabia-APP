import { Text, View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

import { COLORS, SIZES, FONTS } from "../theme/theme";

function Qibla() {
  const [isFound, setIsFound] = useState(false);

  return (
    <View style={[styles.container, isFound ? styles.found : ""]}>
      <Text style={[styles.title, FONTS.h1]}>Kibla</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
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
