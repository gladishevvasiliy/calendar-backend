const express = require("express");
const router = express.Router();
const calendar = require("../services/calendar");
const utils = require("../utils");

/* GET programming languages. */
router.get("/day", async function (req, res, next) {
  const date = new Date(req.query.year, req.query.month, req.query.day);
  const fastData = utils.fast(date);

  const saints = await calendar.getDayData(
    parseInt(req.query.day),
    // месяцы в базе хранятся с 1 по 12, поэтому прибавляем 1
    parseInt(req.query.month) + 1
  );

  const fast = await calendar.getFastsData(
    parseInt(fastData.fastnum),
    parseInt(req.query.month) + 1,
    parseInt(req.query.day),
    date.getDay()
  );

  try {
    res.json({
      date: utils.getJulianAndGregorianDate(date),
      fastPeriod: fastData.permament,
      week: utils.nedel(date),
      ...saints,
      fast,
    });
  } catch (err) {
    console.error(`Error while getting day data `, err.message);
    next(err);
  }
});

module.exports = router;
