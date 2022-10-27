import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: {},
	reducers: {
		addNotification(state = initialState, action) {
			const { id, type, prayer, time, expires } = action.payload;
			state[id] = {
				type,
				time,
				prayer,
				expires,
			};
		},
		removeNotification(state = initialState, action) {
			let id = action.payload;
			state[id] = undefined;
		},
		removeExpired(state = initialState, action) {
			const ids = action.payload;
			ids.forEach((id) => {
				state[id] = undefined;
			});
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
	removeExpired,
} = notificationSlice.actions;

export const selectNotifications = (state) => state.notification;

export default notificationSlice.reducer;
