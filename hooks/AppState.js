import { useRef, useState, useEffect } from "react";
import { AppState } from "react-native";

export const useAppState = () => {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			_handleAppStateChange
		);
		return () => {
			subscription.remove();
		};
	}, []);

	const _handleAppStateChange = (nextAppState) => {
		if (
			appState.current.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			// app is active
		}

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
		// console.log("AppState", appState.current);
	};

	return [appStateVisible, setAppStateVisible];
};
