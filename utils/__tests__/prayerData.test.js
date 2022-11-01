import { findActivePrayer, findNextPrayer } from "../prayerData";
import prayerTimesMock from "../../__mocks__/prayerTimes";

beforeAll(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date("August 10, 2022 11:00:00"));
});

describe("Testing prayer data utils", () => {
	it("should correctly find the actual prayer", () => {
		const activePrayer = findActivePrayer(prayerTimesMock);
		expect(activePrayer.prayer).toBe("Lindja e Diellit");
		jest.setSystemTime(new Date("August 10, 2022 23:00:00"));
		const lastActivePrayer = findActivePrayer(prayerTimesMock);
		expect(lastActivePrayer.prayer).toBe("Jacia");
	});

	it("should correctly find incoming prayer", () => {
		const nextPrayer = findNextPrayer(prayerTimesMock, {
			id: 5,
			prayer: "Ikindia",
			time: "16:36",
		});
		const nextPrayer2 = findNextPrayer(prayerTimesMock, {
			id: 2,
			prayer: "Sabahu",
			time: "04:13",
		});
		expect(nextPrayer.prayer).toBe("Akshami");
		expect(nextPrayer2.prayer).toBe("Dreka");
	});
});
