import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";

import { promisifyQuery, formatPrayerTime } from "../utils";
import { PRAYER_NAMES } from "../constants";

//TODO insert db on intro pages
(async function insertDbLocally() {
	let dbFile = require("./prayerTimes.db");
	if (
		!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
			.exists
	) {
		await FileSystem.makeDirectoryAsync(
			FileSystem.documentDirectory + "SQLite"
		);
	}
	const { exists: dbExists } = await FileSystem.getInfoAsync(
		FileSystem.documentDirectory + "SQLite/prayerTimes.db"
	);
	if (!dbExists) {
		await FileSystem.downloadAsync(
			Asset.fromModule(dbFile).uri,
			FileSystem.documentDirectory + "SQLite/prayerTimes.db"
		);
	}
})();

const db = SQLite.openDatabase("prayerTimes.db");

const _getRowId = async (date) => {
	let query = `SELECT rowid FROM prayers WHERE data="${date}"`;
	const [resultObj] = await promisifyQuery(db, query);
	return resultObj.rowid;
};

const getPrayers = async (num, starting) => {
	const id = await _getRowId(starting);
	let query = `SELECT rowid,* FROM prayers WHERE rowid >="${id}" LIMIT "${num}"`;
	const prayers = await promisifyQuery(db, query);
	return prayers;
};

const _getSinglePrayer = async (date) => {
	let query = `SELECT rowid,* FROM prayers WHERE data="${date}"`;
	const prayer = await promisifyQuery(db, query);
	return prayer;
};

const getTodayPrayers = async (date) => {
	const prayerTimes = [];
	let _idx = 0;
	const [prayerData] = await _getSinglePrayer(date);
	//using Map type of prayer names for sorting
	for (const [key, value] of PRAYER_NAMES) {
		let formatedTime = formatPrayerTime(prayerData[key]);
		prayerTimes.push({ id: _idx++, prayer: value, time: formatedTime });
	}

	return prayerTimes;
};

//TODO Remove
// (async () => {
// 	const prayer = await getSinglePrayer("14/01/22");
// 	console.log(prayer);
// })();
export { getPrayers, getTodayPrayers };
