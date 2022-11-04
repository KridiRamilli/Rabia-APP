import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { Dhikr } from "../screens/Dhikr";

beforeAll(() => {
	// jest.useFakeTimers();
});

describe("<App />", () => {
	it("has 1 child", () => {
		render(
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Dhikr />
				</PersistGate>
			</Provider>
		);
		console.log(screen.toJSON());
		// const elem = await screen.findAllByText("Dhikr");
		expect(screen.toJSON()).toMatchSnapshot();
		// expect(tree.children.length).toBe(1);
	});
});
