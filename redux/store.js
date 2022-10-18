import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import counterReducer from "./reducers/counterSlice";
import settingsReducer from "./reducers/settingsSlice";
import dailyDhikrReducer from "./reducers/dailyDhikrSlice";

const rootReducer = combineReducers({
	settings: settingsReducer,
	counter: counterReducer,
	dailyDhikr: dailyDhikrReducer,
});

const persistConfig = {
	key: "counter_secret_key",
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

//TODO: Remove, used for development purpose to delete persisted store
// persistor.purge();
