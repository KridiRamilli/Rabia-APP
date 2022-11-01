import * as Location from "expo-location";
import { calculateQiblaAngle } from "../location";

beforeAll(() => {
	Location.getForegroundPermissionsAsync = jest
		.fn()
		.mockReturnValue({ granted: true });
});

describe("Testing location utils", () => {
	it("should find the right angle of qibla", async () => {
		let angle = calculateQiblaAngle(41.342882, 19.796588);
		expect(angle).toBeCloseTo(134);
	});
});
