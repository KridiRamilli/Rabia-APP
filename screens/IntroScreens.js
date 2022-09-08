import React, { useState, useRef } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";

import { IntroButton, IntroPagination } from "../components";

export const IntroScreens = () => {
  const [shouldShowSkip, setShouldShowSkip] = useState(false);

  const slider = useRef();

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    slider.current.goToSlide(2);
  };

  const handleSlideChange = (idx) => {
    setShouldShowSkip(idx == 1);
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={shouldShowSkip}
        onSkip={onSkip}
        onSlideChange={handleSlideChange}
        ref={slider}
        renderNextButton={() => <IntroButton />}
        renderPagination={(activeIndex) => (
          <IntroPagination
            activeIndex={activeIndex}
            slider={slider}
            slides={slides}
          />
        )}
      />
    </>
  );
};

// export default IntroScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "teal",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    color: "teal",
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: "teal",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
});

const slides = [
  {
    key: "s1",
    text: "Best Recharge offers",
    title: "Mobile Recharge",
    image: {
      uri: "https://ntv.al/wp-content/uploads/2022/09/a16.jpg",
    },
    backgroundColor: "#fff",
  },
  {
    key: "s2",
    title: "Flight Booking",
    text: "Upto 25% off on Domestic Flights",
    image: {
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png",
    },
    backgroundColor: "#fff",
  },
  {
    key: "s3",
    title: "Great Offers",
    button: true,
    text: "Enjoy Great offers on our all services",
    image: {
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png",
    },
    backgroundColor: "#fff",
  },
];
