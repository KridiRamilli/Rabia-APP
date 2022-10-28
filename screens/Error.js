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
					// Button Linear Gradient
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
		borderRadius: 8,
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.2,
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
		fontSize: SIZES.h1,
		fontFamily: "Roboto-Medium",
		color: COLORS.secondary,
		marginTop: 10,
	},
	errorImage: {
		flex: 0.6,
		resizeMode: "contain",
	},
	textTitle: {
		fontSize: SIZES.h2 + 2,
		fontFamily: "Roboto-Bold",
	},
	textContent: {
		textAlign: "center",
		fontFamily: "Roboto-Light",
		fontSize: SIZES.font + 5,
		marginTop: SIZES.margin,
	},
	gradientBackground: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 8,
	},
	buttonText: {
		fontSize: SIZES.body2,
		fontFamily: "Roboto-Regular",
		color: COLORS.white,
	},
});
