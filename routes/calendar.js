const express = require("express");
const router = express.Router();
const calendar = require("../services/calendar");

/* GET programming languages. */
router.get("/day", async function (req, res, next) {
  try {
    res.json(
      await calendar.getDayData(req.query.day, req.query.month, req.query.year)
    );
  } catch (err) {
    console.error(`Error while getting day data `, err.message);
    next(err);
  }
});

module.exports = router;
