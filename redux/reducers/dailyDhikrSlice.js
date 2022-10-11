import { createSlice } from "@reduxjs/toolkit";
import { MORNING_DHIKR, EVENING_DHIKR } from "../../constants/dhikr";

const dailyDhikrSlice = createSlice({
	name: "dailyDhikr",
	initialState: {
		MORNING_DHIKR,
		EVENING_DHIKR,
	},
	reducers: {
		substractMorningDhikr(state = initialState.MORNING_DHIKR, action) {
			state.MORNING_DHIKR[action.payload].repeat--;
		},
		substractEveningDhikr(state = initialState.EVENING_DHIKR, action) {
			state.EVENING_DHIKR[action.payload].repeat--;
		},
		resetMorningDhikr(state, action) {
			state.MORNING_DHIKR = MORNING_DHIKR;
		},
		resetEveningDhikr(state, action) {
			state.EVENING_DHIKR = EVENING_DHIKR;
		},
	},
});

export const {
	substractMorningDhikr,
	substractEveningDhikr,
	resetMorningDhikr,
	resetEveningDhikr,
} = dailyDhikrSlice.actions;

export default dailyDhikrSlice.reducer;
