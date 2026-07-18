import React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { Name } from "../components/index";
import { COLORS } from "../theme/theme";
import { IMAGES, NAMES } from "../constants";

export const Names = () => {
	return (
		<>
			<View style={[styles.fixed]}>
				<ImageBackground
					source={IMAGES.allahNames}
					style={{ width: "100%", height: "100%" }}
				/>
			</View>
			{/* <ScrollView contentContainerStyle={styles.container}>
				{NAMES.map((el) => {
					return (
						<TouchableOpacity key={el.id} style={{ width: "30%" }}>
							<Name name={el.arabic} />
						</TouchableOpacity>
					);
				})}
			</ScrollView> */}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
		paddingBottom: 150,
		backgroundColor: COLORS.white,
		// backgroundColor: "#EBF1F1",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		backgroundImage: IMAGES.allahNames,
	},
	container1: {
		position: "relative",
	},
	fixed: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
