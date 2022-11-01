module.exports = {
	preset: "jest-expo", // 👈 note this preset
	transform: {
		"\\.[jt]sx?$": "babel-jest", // 👈 note this transform key
	},
	//TODO added expo to transform, test if its too much for test runner
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|expo-*)",
	],
};
