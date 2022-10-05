module.exports = {
	preset: "jest-expo", // 👈 note this preset
	transform: {
		"\\.[jt]sx?$": "babel-jest", // 👈 note this transform key
	},
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)",
	],
};
