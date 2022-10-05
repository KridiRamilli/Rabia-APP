import React, { useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	Image,
} from "react-native";
import { ICONS } from "../constants";
import { COLORS, SIZES, FONTS } from "../theme/theme";

export const CustomModal = ({
	modalVisible,
	onClosePress,
	titleText,
	leftButtonLabel,
	rightButtonLabel,
	onLeftButtonPress,
	onRightButtonPress,
}) => {
	return (
		<View style={styles.container}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {}}
			>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.closeIconContainer}
						onPress={onClosePress}
					>
						<Image source={ICONS.close_icon} style={styles.closeIcon} />
					</TouchableOpacity>
					<View style={styles.modalContainer}>
						<Text style={styles.titleText}>{titleText}</Text>
						<View style={styles.buttonContainer}>
							{leftButtonLabel && (
								<TouchableOpacity
									style={[styles.button, styles.buttonLeft]}
									onPress={onLeftButtonPress}
								>
									<Text style={styles.textStyle}>{leftButtonLabel}</Text>
								</TouchableOpacity>
							)}
							{rightButtonLabel && (
								<TouchableOpacity
									style={[styles.button]}
									onPress={onRightButtonPress}
								>
									<Text style={styles.textStyle}>{rightButtonLabel}</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "90%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		bottom: 50,
		left: "5%",
		backgroundColor: COLORS.white,
		borderRadius: 20,
	},
	modalContainer: {
		width: "90%",
		margin: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	button: {
		minWidth: 120,
		borderRadius: 5,
		padding: 10,
		marginTop: 15,
		elevation: 2,
		backgroundColor: COLORS.white,
	},
	buttonLeft: {},
	closeIconContainer: {
		width: 40,
		height: 40,
		position: "absolute",
		top: -20,
		right: 0,
		backgroundColor: COLORS.secondary,
		padding: 5,
		borderRadius: 40,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	closeIcon: {
		width: "100%",
		height: "100%",
		tintColor: COLORS.white,
		resizeMode: "contain",
	},
	textStyle: {
		...FONTS.body3,
		color: COLORS.darkGreen,
		textAlign: "center",
	},
	titleText: {
		...FONTS.body2,
		// marginBottom: 15,
		textAlign: "center",
	},
});
