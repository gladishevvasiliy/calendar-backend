const db = require("./db");
const config = require("../config");

async function getDayData(day, month, year) {
  const dayData = await db.query(
    `SELECT svjatajs FROM __calend_rus WHERE month = ${month} AND day = ${day}`,
    [offset, config.listPerPage]
  );

  return {
    dayData,
  };
}

module.exports = {
  getDayData,
};
