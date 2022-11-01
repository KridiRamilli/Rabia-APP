import { promisifyQuery, mapValuesToArray, approxValue } from "../tools";

describe("Testing custom tools utils", () => {
	it("shoud return an array from new Map", () => {
		const data = new Map();
		data.set("name", "Rabia");
		data.set("category", "App");
		const arr = mapValuesToArray(data);
		expect(arr).toEqual(["Rabia", "App"]);
	});

	it("should test if 2 values are === based on approx val", () => {
		const val = approxValue(100, 120, 10);
		const val2 = approxValue(100, 120, 21);
		expect(val).toBe(false);
		expect(val2).toBe(true);
	});
});
