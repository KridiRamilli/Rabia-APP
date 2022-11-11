import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
import { SearchInput, SettingsElement } from "../components";
import { COLORS, SIZES } from "../theme/theme";
import { ICONS } from "../constants";

export const Settings = ({ navigation }) => {
	const settings = [
		["Location", ICONS.account_icon],
		["Notifications", ICONS.notification_icon],
		["Privacy & Security", ICONS.privacy_icon],
		["Help & Support", ICONS.support_icon],
		["About", ICONS.about_icon],
	];

	const handlePress = () => {
		console.log("Pressed");
		navigation.navigate("Notifications");
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			keyboardVerticalOffset={20}
			behavior="padding"
		>
			<View style={styles.settingsContainer}>
				{settings.map((setting, idx) => {
					return (
						<SettingsElement
							setting={setting[0]}
							settingIcon={setting[1]}
							key={idx}
							handlePress={handlePress}
						/>
					);
				})}
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	inputContainer: {
		flex: 0.1,
	},
	settingsContainer: {
		flex: 0.85,
		width: SIZES.width * 0.85,
		alignItems: "center",
		paddingTop: SIZES.padding,
	},
});
