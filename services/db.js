const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql) {
  const connection = await mysql.createConnection(config.db);
  console.log({ connection });
  const results = await connection.execute(sql);
  console.log({ results });
  return results;
}

module.exports = {
  query,
};
