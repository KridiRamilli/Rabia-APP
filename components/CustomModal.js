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
import { COLORS, SIZES } from "../theme/theme";

export const CustomModal = ({ showModal, onClosePress }) => {
	const [modalVisible, setModalVisible] = useState(true);

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<TouchableOpacity style={styles.closeIconContainer}>
						<Image source={ICONS.close_icon} style={styles.closeIcon} />
					</TouchableOpacity>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Hello World!</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Hide Modal</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		width: "90%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		bottom: 30,
		left: "5%",
		backgroundColor: COLORS.white,
		borderRadius: 20,
	},
	modalView: {
		width: "90%",
		margin: 20,
		// backgroundColor: "red",
		// borderRadius: 20,
		padding: 35,
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
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
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
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
