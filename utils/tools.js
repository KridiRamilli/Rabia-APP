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
