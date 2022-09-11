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

import { IntroPage, IntroPagination, IntroButton } from "../components";

import { IMAGES, ICONS } from "../constants";

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
  const renderItem = ({ item }) => {
    return <IntroPage item={item} />;
  };

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={onDone}
        showSkipButton={shouldShowSkip}
        onSkip={onSkip}
        onSlideChange={handleSlideChange}
        ref={slider}
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
});

const slides = [
  {
    key: "r1",
    content: [
      {
        text: "Simple and easy to use Dhikr counter which saves your history by day.",
        icon: ICONS.dhikr_icon,
      },
      {
        text: "Get prayer times  daily and in advance, also notification when it’s time to pray.",
        icon: ICONS.prayer_times_icon,
      },
      {
        text: "Find your Qibla direction wherever you want to pray by using your location.",
        icon: ICONS.qibla_icon,
      },
    ],
    title: "Welcome to Rabia",
    logo: IMAGES.logo,
    image: IMAGES.intro_image_1,
  },
  {
    key: "r2",
    title: "Get prayer time alerts",
    content: [
      {
        text: "Enable notification services to  get alerts for each prayer daily or by choosing specific prayers.",
      },
    ],
    image: IMAGES.intro_image_2,
    infoIcon: ICONS.intro_notification,
  },
  {
    key: "r3",
    title: "Find qibla direction",
    content: [
      {
        text: "Enable location services to calculate prayer times and qibla direction based on your location.",
      },
    ],
    image: IMAGES.intro_image_3,
    infoIcon: ICONS.intro_location,
  },
];
