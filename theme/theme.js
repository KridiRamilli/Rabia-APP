import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
	primary: "#32b7b6", // Green
	primary85: "rgba(50,183,182,0.85)",
	primary95: "rgba(50,183,182,0.95)",
	secondary: "#d575dd", // Purple

	//Gradient Colors
	darkBlue: "#425389",
	darkBlue85: "rgba(66,83,137,0.85)",
	darkBlue95: "rgba(66,83,137,0.95)",
	darkPurple: "#d272db",
	purple: "#595683",
	green: "#119241",
	darkGreen: "#086d59",
	pinkGradient: "#f687e6",
	purpleGradient: "#a158cd",

	//Plain colors
	white: "#fff",
	white1: "#F1E6D8",
	lightGreen: "#7EBDA2",
	lightGreen2: "#BED2BB",
	red: "#D84035",
	red2: "#FF7363",
	black: "#000000",
	gray: "#6E6E6E",
	gray1: "#363636",
	gray2: "#4B4B4B",
	gray3: "#4D4D4D",
	gray4: "#cecece",
	lightGray: "#3B3B3B",
	lightGray2: "#a0a0a0",
	lightGray3: "#f0f0f0",

	pink: "#D993B4",
	pink2: "#f072d5",
	lightPink: "#F3DEE8",

	transparentWhite: "rgba(255, 255, 255, 0.2)",
	transparentBlack: "rgba(0, 0, 0, 0.4)",
	transparent: "transparent",

	//zebra rows
	oddGray: "#2c2c2e",
	evenGray: "#1c1c1e",
};

export const SIZES = {
	// global sizes
	base: 8,
	font: 14,
	radius: 12,
	padding: 24,
	margin: 20,

	// font sizes
	largeTitle: 40,
	h1: 30,
	h2: 22,
	h3: 16,
	h4: 14,
	h5: 12,
	body1: 30,
	body2: 20,
	body3: 16,
	body4: 14,
	body5: 12,

	// app dimensions
	width,
	height,
};

export const FONTS = {
	largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
	h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
	h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
	h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
	h4: { fontFamily: "Roboto-Medium", fontSize: SIZES.h4, lineHeight: 20 },
	body1: {
		fontFamily: "Roboto-Regular",
		fontSize: SIZES.body1,
		lineHeight: 36,
	},
	body2: {
		fontFamily: "Roboto-Regular",
		fontSize: SIZES.body2,
		lineHeight: 30,
	},
	body3: {
		fontFamily: "Roboto-Regular",
		fontSize: SIZES.body3,
		lineHeight: 22,
	},
	body4: {
		fontFamily: "Roboto-Regular",
		fontSize: SIZES.body4,
		lineHeight: 22,
	},
	body5: {
		fontFamily: "Roboto-Regular",
		fontSize: SIZES.body5,
		lineHeight: 22,
	},
	body5Thin: {
		fontFamily: "Roboto-Thin",
		fontSize: SIZES.body5,
		lineHeight: 22,
	},
	body5Light: {
		fontFamily: "Roboto-Thin",
		fontSize: SIZES.body5,
		lineHeight: 22,
	},
};
