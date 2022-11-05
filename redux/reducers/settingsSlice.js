import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		showRealApp: false,
		locationStatus: "undetermined",
		notificationStatus: "undetermined",
		notifySurahKehf: true,
	},
	reducers: {
		setShowRealApp(state, action) {
			state.showRealApp = action.payload;
		},
		setLocationStatus(state, action) {
			state.locationStatus = action.payload;
		},
		setNotificationStatus(state, action) {
			state.notificationStatus = action.payload;
		},
		setNotifiySurahKehf(state, action) {
			state.notifySurahKehf = action.payload;
		},
	},
});

export const {
	setShowRealApp,
	setLocationStatus,
	setNotificationStatus,
	setNotifiySurahKehf,
} = settingsSlice.actions;
export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;
