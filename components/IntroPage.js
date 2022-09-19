import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectSettings } from "../redux/reducers/settingsSlice";

import { IMAGES } from "../constants";
import { COLORS, SIZES, FONTS } from "../theme/theme";

export const IntroPage = ({ item }) => {
	let { image, logo, content, infoIcon, title } = item;
	const { locationStatus } = useSelector(selectSettings);
	const generateTextContent = (content, idx) => {
		const { text, icon } = content;
		return (
			<View key={idx} style={styles.textContentContainer}>
				{/*Render content icon for first page only */}
				{icon && <Image source={icon} style={styles.contentIcon} />}
				<Text
					style={[styles.textContentStyle, !icon && { textAlign: "center" }]}
				>
					{text}
				</Text>
			</View>
		);
	};

	//Show success image and text on third intro page!
	if (locationStatus !== "undetermined" && item.key === "r3") {
		image = IMAGES.intro_image_success;
		title = "All set!";
		content = [
			{
				text: "Thank you for choosing Rabia!\nGratitude is a powerful emotion, and because of you, we are overwhelmed with it.",
			},
		];
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.imagesContainer}>
				{logo && <Image style={styles.introLogo} source={logo} />}
				<Image style={styles.imageStyle} source={image} />
				{infoIcon && <Image source={infoIcon} style={styles.infoIcon} />}
			</View>
			<View style={styles.textContainer}>
				<Text style={[styles.titleStyle, infoIcon && { marginTop: 30 }]}>
					{title}
				</Text>
				<View
					style={[
						styles.contentContainer,
						infoIcon && {
							marginTop: 10,
							justifyContent: "flex-start",
						},
					]}
				>
					{content.map(generateTextContent)}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: "center",
		justifyContent: "flex-start",
		paddingBottom: 400,
	},
	imagesContainer: {
		flex: 0.48,
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		flex: 0.3,
		width: SIZES.width * 0.8,
		alignItems: "center",
		justifyContent: "space-around",
	},
	contentContainer: {
		flex: 0.7,
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	textContentContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},
	textContentStyle: {
		...FONTS.body3,
		color: COLORS.gray2,
		flex: 1,
	},
	contentIcon: {
		width: 25,
		height: 25,
		marginRight: 10,
		resizeMode: "contain",
		tintColor: COLORS.secondary,
	},
	infoIcon: {
		flex: 0.2,
		marginBottom: 10,
		resizeMode: "contain",
		alignSelf: "flex-end",
	},
	titleStyle: {
		flex: 0.2,
		...FONTS.body1,
		color: COLORS.gray2,
	},
	imageStyle: {
		flex: 0.8,
		resizeMode: "contain",
		width: SIZES.width * 0.9,
	},
	introLogo: {
		flex: 0.3,
		width: SIZES.width * 0.4,
		resizeMode: "contain",
	},
});
