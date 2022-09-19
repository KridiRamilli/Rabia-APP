import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		showRealApp: false,
		locationStatus: "undetermined",
	},
	reducers: {
		setShowRealApp(state, action) {
			state.showRealApp = action.payload;
		},
		setLocationStatus(state, action) {
			state.locationStatus = action.payload;
		},
	},
});

export const { setShowRealApp, setLocationStatus } = settingsSlice.actions;
export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;
