import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";

import { promisifyQuery } from "../utils";

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

const getSinglePrayer = async (date) => {
	let query = `SELECT rowid,* FROM prayers WHERE data="${date}"`;
	const prayer = await promisifyQuery(db, query);
	return prayer;
};

//TODO Remove
// (async () => {
// 	const prayer = await getSinglePrayer("14/01/22");
// 	console.log(prayer);
// })();
export { getSinglePrayer, getPrayers };
