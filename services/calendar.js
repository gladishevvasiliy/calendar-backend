const db = require("./db");
const staticTexts = require("../res/static_texts");
const utils = require("../utils");

async function getDayData(day, month) {
  const [result] = await db.query(
    `SELECT svjatajs FROM __calend_rus WHERE month = ${month} AND day = ${day}`
  );
  try {
    const [saints] = result;
    return {
      saints: utils.replacer(saints.svjatajs),
    };
  } catch (error) {
    console.log({ error });
    return {
      saints: "Не найдено в базе",
    };
  }
}

async function getFastsData(fastnum, month, day, dayn) {
  let fastid;
  if (
    fastnum === 0 &&
    ((month === 7 && day > 11) ||
      (month > 7 && month < 12) ||
      (month === 12 && day < 28))
  )
    fastnum = 29;
  if (fastnum === 0 && ((month === 1 && day < 19) || month < 5)) fastnum = 30;
  if (fastnum === 1) {
    fastid = 1;
    fastlink = "Указания о трапезе в Сплошную седмицу";
  }
  if (fastnum === 2) {
    fastid = 2;
    fastlink = "Указания о трапезе в Седмицу мясопустную";
  }
  if (fastnum === 3) {
    fastid = 3;
    fastlink = "Указания о трапезе в Седмицу сыропустную";
  }
  if (fastnum === 4) {
    fastid = 4;
    fastlink = "Указания о трапезе в Седмицу 1-ю Великого поста";
  }
  if (fastnum === 5) {
    fastid = 5;
    fastlink = "Указания о трапезе в Седмицу 2-ю Великого поста";
  }
  if (fastnum === 6) {
    fastid = 5;
    fastlink = "Указания о трапезе в Седмицу 3-ю Великого поста";
  }
  if (fastnum === 7) {
    fastid = 5;
    fastlink = "Указания о трапезе в Седмицу 4-ю Великого поста";
  }
  if (fastnum === 8) {
    fastid = 6;
    fastlink = "Указания о трапезе в Среду 4-ой недели Великого поста";
  }
  if (fastnum === 9) {
    fastid = 5;
    fastlink = "Указания о трапезе в Седмицу 5-ю Великого поста";
  }
  if (fastnum === 10) {
    fastid = 7;
    fastlink = "Указания о трапезе в Четверток 5-ой недели Великого поста";
  }
  if (fastnum === 11) {
    fastid = 5;
    fastlink = "Указания о трапезе в Седмицу 6-ю Великого поста";
  }
  if (fastnum === 12) {
    fastid = 8;
    fastlink = "Указания о трапезе в Лазореву суботу";
  }
  if (fastnum === 13) {
    fastid = 9;
    fastlink = "Указания о трапезе в Цветную неделю";
  }
  if (fastnum === 14) {
    fastid = 10;
    fastlink = "Указания о трапезе в Седмицу страстную";
  }
  if (fastnum === 15) {
    fastid = 11;
    fastlink = "Указания о трапезе во Святую Пасху";
  }
  if (fastnum === 16) {
    fastid = 12;
    fastlink = "Указания о трапезе в Светлую седмицу";
  }
  if (fastnum === 17) {
    fastid = 13;
    fastlink = "Указания о трапезе в Седмицу 2-ю по Пасхе";
  }
  if (fastnum === 18) {
    fastid = 13;
    fastlink = "Указания о трапезе в Седмицу 3-ю по Пасхе";
  }
  if (fastnum === 19) {
    fastid = 13;
    fastlink = "Указания о трапезе в Седмицу 4-ю по Пасхе";
  }
  if (fastnum === 20) {
    fastid = 13;
    fastlink = "Указания о трапезе в Седмицу 5-ю по Пасхе";
  }
  if (fastnum === 21) {
    fastid = 13;
    fastlink = "Указания о трапезе в Седмицу 6-ю по Пасхе";
  }
  if (fastnum === 22) {
    fastid = 13;
    fastlink = "Указания о трапезе в Седмицу 7-ю по Пасхе";
  }
  if (fastnum === 23) {
    fastid = 14;
    fastlink = "Указания о трапезе в Седмицу 1-ю по Пятидесятнице";
  }
  if (fastnum === 24) {
    fastid = 15;
    fastlink = "Указания о трапезе в Петров пост";
  }
  if (fastnum === 25) {
    fastid = 16;
    fastlink = "Указания о трапезе в Успенский пост";
  }
  if (fastnum === 26) {
    fastid = 17;
    fastlink = "Указания о трапезе в Рождественнский пост";
  }
  if (fastnum === 28) {
    fastid = 18;
    fastlink = "Указания о трапезе в Мясоястие";
  }
  if (fastnum === 29) {
    fastid = 19;
    fastlink =
      "Указания о трапезе во дни от Петрова поста до Рождественского поста";
  }
  if (fastnum === 30) {
    fastid = 20;
    fastlink =
      "Указания о трапезе во дни от Богоявления до Недели мытаря и фарисея";
  }
  if (fastnum === 31) {
    fastid = 21;
    fastlink = "Указания о трапезе о посте среды и пятка";
  }
  // пост среды и пятка
  let ndayfast = undefined;
  if (dayn === 3 || dayn === 5) {
    ndayfast = staticTexts.ndayfast;
  }
  // поиск поста по id
  let [fast] = await db.query(
    `SELECT text FROM __fasts_rus WHERE id = ${fastid}`
  );

  // поиск трапезы по дню и месяцу по id
  let [trapeza] = await db.query(
    `SELECT trapeza FROM __calend_rus WHERE month = ${month} AND day = ${day}`
  );

  try {
    const [fastInfo] = fast;
    const [trapezaInfo] = trapeza;
    return {
      fastlink,
      ndayfast,
      fast: utils.replacer(fastInfo.text),
      trapeza: trapezaInfo.trapeza
        ? utils.replacer(trapezaInfo.trapeza)
        : "Особых указаний устава о трапезе на этот день нет",
    };
  } catch (error) {
    console.log(error);
    return {
      fastError: "Не найдено в базе",
    };
  }
}

async function getCompleteFastsData(lid) {
  const [result] = await db.query(
    `SELECT text FROM __fasts_rus WHERE id = ${lid}`
  );

  try {
    const [lidInfo] = result;

    return {
      lid: utils.replacer(lidInfo.text),
    };
  } catch (error) {
    return {
      saints: "Не найдено в базе",
    };
  }
}

module.exports = {
  getDayData,
  getFastsData,
  getCompleteFastsData,
};
