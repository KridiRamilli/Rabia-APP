export const promisifyQuery = (db, query) => {
	return new Promise((res, rej) => {
		db.transaction((tx) => {
			tx.executeSql(
				`${query}`,
				null,
				(_transactionObj, { rows: { _array } }) => {
					// console.log(_transactionObj["_error"]);
					if (_array[0]) {
						res(_array);
					}
				}
			);
		});
	});
};
