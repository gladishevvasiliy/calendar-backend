const express = require("express");
// const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// var connection = mysql.createConnection({
//   host: "vh302.timeweb.ru",
//   user: "co48677_wp",
//   password: "vasyok97",
//   database: "co48677_wp",
// });

// connection.connect();

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
