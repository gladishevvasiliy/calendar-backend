const db = require("./db");

async function getDayData(day, month, year) {
  const dayData = await db.query(
    `SELECT svjatajs FROM __calend_rus`
    // `SELECT svjatajs FROM __calend_rus WHERE month = ${month} AND day = ${day}`
  );

  return {
    dayData,
  };
}

module.exports = {
  getDayData,
};
