import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("prayerTimes.db");
  return db;
}

const db = openDatabase();

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id integer primary key not null, done int, value text);"
    );
  });
};

const createMockData = (text) => {
  db.transaction((tx) => {
    tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
    tx.executeSql("select * from items", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  }, null);
};

const getData = () => {
  db.transaction((tx) => {
    tx.executeSql(`select * from items`, null, (_, { rows: { _array } }) =>
      console.log(_array)
    );
  });
};

createTable();
createMockData("Hello");
getData();

export { db, getData };
