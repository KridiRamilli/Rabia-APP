import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: {},
	reducers: {
		addNotification(state = initialState, action) {
			const { id, type, prayer, time } = action.payload;
			state[id] = {
				type,
				time,
				prayer,
			};
		},
		removeNotification(state = initialState, action) {
			const id = action.payload;
			state[id] = undefined;
		},
		resetAllNotifications(state = initialState, action) {
			state = initialState;
		},
		addAllNotificatons(state = initialState, action) {
			//TODO map all notifications
		},
	},
});

export const {
	addNotification,
	removeNotification,
	resetAllNotifications,
	addAllNotificatons,
} = notificationSlice.actions;

export const selectNotifications = (state) => state.notification;

export default notificationSlice.reducer;
