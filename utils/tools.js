const _queryDb = (db, query) => {
	return new Promise((res, rej) => {
		db.transaction((tx) => {
			tx.executeSql(
				`${query}`,
				null,
				(_transactionObj, { rows: { _array } }) => {
					// console.log(_transactionObj["_error"]);
					if (_array[0]) {
						res(_array[0]);
					}
				},
				(errObj, errMsg) => {
					rej(errMsg);
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
