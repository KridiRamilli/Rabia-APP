import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import RootTab from "./navigation/RootTab";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

import { FONT_FILES } from "./constants";

export default function App() {
	const [fontsLoaded] = useFonts(FONT_FILES);
	if (!fontsLoaded) {
		return null;
	}
	return (
		<Provider store={store}>
			<PersistGate
				loading={<ActivityIndicator size="large" color="teal" />}
				persistor={persistor}
			>
				<RootTab />
			</PersistGate>
		</Provider>
	);
}
