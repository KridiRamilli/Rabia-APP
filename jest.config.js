module.exports = {
	preset: "jest-expo", // 👈 note this preset
	transform: {
		"\\.[jt]sx?$": "babel-jest", // 👈 note this transform key
	},
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
	],
};
