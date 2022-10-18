const _queryDb = (db, query) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`${query}`,
				null,
				(_transactionObj, { rows: { _array } }) => {
					// console.log(_transactionObj["_error"]);
					if (_array[0]) {
						resolve(_array);
					}
				},
				(errObj, errMsg) => {
					reject(errMsg);
				}
			);
		});
	});
};

export const promisifyQuery = async (db, query) => {
	try {
		return await _queryDb(db, query);
	} catch (err) {
		console.error(err);
	}
};

export const mapValuesToArray = (map) => {
	const values = [];
	for (const [key, value] of map) {
		values.push(value);
	}
	return values;
};

export const approxValue = (relativeVal, targetVal, approx) => {
	if (
		typeof relativeVal !== "number" ||
		typeof targetVal !== "number" ||
		typeof approx !== "number"
	) {
		console.error("You must use number types only!");
		return;
	}
	return Math.abs(relativeVal - targetVal) < approx;
};
