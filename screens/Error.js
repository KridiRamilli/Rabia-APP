import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { IMAGES } from "../constants/images";
import { FONTS, COLORS, SIZES } from "../theme/theme";

export const Error = () => {
	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		Linking.openSettings();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.mainTitle}>Ooops!</Text>
			<Image source={IMAGES.error} style={styles.errorImage} />
			<View style={styles.textContainer}>
				<Text style={styles.textTitle}>We're sorry!</Text>
				<Text style={styles.textContent}>
					Please enable location services to find Qibla direction!
				</Text>
			</View>
			<TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
				<LinearGradient
					colors={[COLORS.pinkGradient, COLORS.purpleGradient]}
					style={styles.gradientBackground}
				>
					<Text style={styles.buttonText}>Go to Settings</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: COLORS.white,
	},
	buttonContainer: {
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 8,
		marginBottom: 120,
	},
	textContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
	},
	mainTitle: {
		...FONTS.h1,
		color: COLORS.secondary,
		marginTop: 10,
	},
	errorImage: {
		flex: 0.5,
		resizeMode: "contain",
	},
	textTitle: {
		...FONTS.h1,
	},
	textContent: {
		...FONTS.body3,
		textAlign: "center",
		marginTop: SIZES.margin,
	},
	gradientBackground: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	buttonText: {
		...FONTS.body2,
		lineHeight: 0,
		color: COLORS.white,
	},
});
