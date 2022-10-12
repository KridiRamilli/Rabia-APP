import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";

import { promisifyQuery, formatPrayerTime, formatScheduleDate } from "../utils";
import { PRAYER_NAMES } from "../constants";

//TODO insert db on intro pages
async function insertDbLocally() {
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

	//TODO bug when fresh install and no db open
	// if (!dbExists) {
	await FileSystem.downloadAsync(
		Asset.fromModule(dbFile).uri,
		FileSystem.documentDirectory + "SQLite/prayerTimes.db"
	);
	// }
	// console.log(dbExists);
}

const db = SQLite.openDatabase("prayerTimes.db");
const _getRowId = async (date) => {
	let query = `SELECT rowid FROM prayers WHERE data="${date}"`;
	const [resultObj] = await promisifyQuery(db, query);
	return resultObj.rowid;
};

const getPrayers = async (num, starting) => {
	const id = await _getRowId(starting);
	let query = `SELECT rowid,* FROM prayers WHERE rowid >="${
		id - 10
	}" LIMIT "${num}"`;
	const prayersData = await promisifyQuery(db, query);
	const prayers = prayersData.map((prayer) => {
		const formatedPrayer = new Map();
		let formatedDate = formatScheduleDate(prayer["data"]);
		formatedPrayer.set("id", prayer["rowid"]);
		formatedPrayer.set("date", formatedDate);
		for (const [key, value] of PRAYER_NAMES) {
			let formatedTime = formatPrayerTime(prayer[key]);
			formatedPrayer.set(value, formatedTime);
		}
		return formatedPrayer;
	});
	return prayers;
};

const _getSinglePrayer = async (date) => {
	let query = `SELECT rowid,* FROM prayers WHERE data="${date}"`;
	const [prayer] = await promisifyQuery(db, query);
	return prayer;
};

const getTodayPrayers = async (date) => {
	const prayerTimes = [];
	let _idx = 0;
	const prayerData = await _getSinglePrayer(date);
	//using Map type of prayer names for sorting
	for (const [key, value] of PRAYER_NAMES) {
		let formatedTime = formatPrayerTime(prayerData[key]);
		prayerTimes.push({ id: _idx++, prayer: value, time: formatedTime });
	}

	return prayerTimes;
};

//TODO Remove
// (async () => {
// 	const prayers = await getPrayers(11, "12/10/22");
// 	console.log(prayers[0]);
// })();
export { getPrayers, getTodayPrayers };
