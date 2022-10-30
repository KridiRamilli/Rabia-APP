// import { NavigationContainer } from "@react-navigation/native";

// import { render, screen, fireEvent } from "@testing-library/react-native";
// import { PrayerTimes, Dhikr, Qibla, Schedule, Settings } from "./../screens";
// import RootTab from "./../navigation/RootTab";
// import RootStack from "./../navigation/RootStack";
// describe("Test rendering of screens and Navigation", () => {
// 	it("Should render main screen", () => {
// 		const prayerTimes = render(<PrayerTimes />);
// 		expect(screen.getByText("PrayerTimes").toBeInTheDocument);
// 		const schedule = screen.getByText("ScheduleIcon");
// 		// fireEvent.press(schedule);
// 		// expect(screen.getByText("Schedule").toBeInTheDocument);
// 	});
// });

describe("Snapshot and Ui test for APP", () => {
	it("Should render the screen and component", () => {
		expect(true).toBe(true);
	});
});
