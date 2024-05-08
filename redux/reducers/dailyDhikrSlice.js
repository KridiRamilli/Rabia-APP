import { createSlice } from "@reduxjs/toolkit";
import { MORNING_DHIKR, EVENING_DHIKR } from "../../constants/dhikr";

const dailyDhikrSlice = createSlice({
	name: "dailyDhikr",
	initialState: {
		MORNING_DHIKR,
		EVENING_DHIKR,
		done_morning_dhikr: 0,
		done_evening_dhikr: 0,
	},
	reducers: {
		substractMorningDhikr(
			state = [initialState.MORNING_DHIKR, initialState.done_morning_dhikr],
			action
		) {
			state.MORNING_DHIKR[action.payload].repeat--;
			state.done_morning_dhikr += 1;
		},
		substractEveningDhikr(
			state = [initialState.EVENING_DHIKR, initialState.done_evening_dhikr],
			action
		) {
			state.EVENING_DHIKR[action.payload].repeat--;
			state.done_evening_dhikr += 1;
		},
		resetMorningDhikr(state, action) {
			state.MORNING_DHIKR = MORNING_DHIKR;
			state.done_morning_dhikr = 0;
		},
		resetEveningDhikr(state, action) {
			state.EVENING_DHIKR = EVENING_DHIKR;
			state.done_evening_dhikr = 0;
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
