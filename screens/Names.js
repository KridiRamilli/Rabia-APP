import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Names = () => {
	return (
		<View style={styles.container}>
			<Text
				style={{
					color: "#fff",
				}}
			>
				ALLAH Beautiful Names
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "teal",
		justifyContent: "center",
		alignItems: "center",
	},
});
