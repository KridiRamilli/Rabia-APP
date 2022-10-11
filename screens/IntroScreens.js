import React, { useState, useRef } from "react";

import AppIntroSlider from "react-native-app-intro-slider";

import { IntroPage, IntroPagination } from "../components";

import { SLIDES } from "../constants";

export const IntroScreens = () => {
	const [shouldShowSkip, setShouldShowSkip] = useState(false);

	const slider = useRef();
	const _keyExtractor = (item) => item.key;

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
		<AppIntroSlider
			data={SLIDES}
			renderItem={renderItem}
			keyExtractor={_keyExtractor}
			onDone={onDone}
			showSkipButton={shouldShowSkip}
			onSkip={onSkip}
			onSlideChange={handleSlideChange}
			ref={slider}
			renderPagination={(activeIndex) => (
				<IntroPagination
					activeIndex={activeIndex}
					slider={slider}
					slides={SLIDES}
				/>
			)}
		/>
	);
};
