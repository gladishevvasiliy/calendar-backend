//За молитв святых отец наших, Господи Исусе Христе, Cыне Божии, помилуй мя
//Календарь для главной странички "Вятского старообрядчества". Работает с 1900 по 2099 год. Вычисление пасхалии и т.д.

var months = new Array();
var montholds = new Array();
var krug_nedel = new Array();
var krug_sedm = new Array();
var dnedel = new Array();
var shortdn = new Array();
var monthsget = new Array();
var diffmisc = new Array();
var helps, fastnum, dayfast, przdnum, fastres, nday;

const replacer = (text) => {
  let result = text;
  result = result.replace("[!b!]", "<b>");
  result = result.replace("[/!b!]", "</b>");
  result = result.replace("[!vel!]", "<font style='color:red'><b>");
  result = result.replace("[/!vel!]", "</b></font>");
  result = result.replace("[!slav!]", "<font style='color:red'><b>");
  result = result.replace("[/!slav!]", "</b></font>");
  result = result.replace("[!polieleos!]", "<font style='color:red'><b>");
  result = result.replace("[/!polieleos!]", "</b></font>");
  result = result.replace("[!bdenie!]", "<font style='color:red'><b>");
  result = result.replace("[/!bdenie!]", "</b></font>");
  result = result.replace("[!comment!]", "<br><font style='color:orange'><b>");
  result = result.replace("[/!comment!]", "</b></font>");
  result = result.replace("[/!comment!]", "</b></font>");
  result = result.replace("[!dom!]", "<b>Домашний устав: </b>");
  result = result.replace("[/!dom!]", "<br>");
  result = result.replace("[!ars!]", "<b>Устав Арсения Уральского: </b>");
  result = result.replace("[/!ars!]", "<br>");
  result = result.replace("[!oko!]", "<b>Око Церковное: </b>");
  result = result.replace("[/!oko!]", "<br>");
  result = result.replace("[!solov!]", "<b>Соловецкий устав: </b>");
  result = result.replace("[/!solov!]", "<br>");
  result = result.replace("[!kiril!]", "<b>Кириллов устав: </b>");
  result = result.replace("[/!kiril!]", "<br>");
  result = result.replace("[!nikon!]", "<b>Устав Никона Черногорца: </b>");
  result = result.replace("[/!nikon!]", "<br>");
  result = result.split("[!/b!]").join("<b>");
  result = result.split("[!b!]").join("</b>");
  return result;
};

function renvars(langvar) {
  if (langvar == "rus") {
    months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    montholds = [
      "Януария",
      "Февруария",
      "Марта",
      "Апрелия",
      "Маия",
      "Июния",
      "Июлия",
      "Августа",
      "Септемврия",
      "Октоврия",
      "Ноемврия",
      "Декемврия",
    ];
    krug_nedel = [
      "о мытаре и фарисее",
      "о блуднем сыне",
      "мясопустная",
      "сыропустная",
      "православия<br>1-я Великого поста",
      "2-я Великого поста",
      "3-я Великого поста<br>Крестопоклонная",
      "4-я Великого поста",
      "5-я Великого поста",
      "цветоносия",
      "Светлая",
      "о Фоме",
      "Жен Мироносиц",
      "о расслабленном",
      "о самаряныне",
      "о слепом",
      "святых отец",
      "8-я по Пасхе",
      "всех святых<br>1-я по Пятидесятнице",
    ];
    krug_sedm = [
      "сплошная",
      "мясопустная",
      "сыропустная",
      "1-я Великого поста",
      "2-я Великого поста",
      "3-я Великого поста",
      "4-я Великого поста<br>Крестопоклонная",
      "5-я Великого поста",
      "6-я Великого поста",
      "Страстная",
      "Светлая",
      "2-я по Пасхе",
      "3-я по Пасхе",
      "4-я по Пасхе",
      "5-я по Пасхе",
      "6-я по Пасхе",
      "7-я по Пасхе",
      "1-я по Пятидесятнице",
      "2-я по Пятидесятнице",
    ];
    shortdn = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    dnedel = [
      "Седмица",
      "Неделя",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверток",
      "Четверг",
      "Пяток",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ];
    helps =
      "\t''Православный Християнский Календарь v2.0''\n\n\tПоказывает основные праздники и все посты. Дополнительный модуль показывает святцы (а соответственно и все праздники) и посты на каждый день, а также указания различных уставов о посте, как на отдельно взятый день, так и на определенный период года. Ограничение по годам с 1900 по 2099.\n\tВ разработке использованы: календари РПСЦ (для святцев) и уставы: Арсения Уральского, Малый Домашний и Око Церковное (для составления указаний о трапезе).\n\tАвтор разработки - Сергей Казорин. По вопросам и предложениям пишите: admin[a]kirovold.ru\n\tЕсли же кто обрящет здесь ошибки, неисправности или недосмотры, пусть не клянет наше грешное худоумие и невежество, а пусть лучше помолится о грешном рабе божием Сергии. Простите Христа ради, отцы и братие. Богу нашему слава во веки веком. Аминь.";
    diffmisc["voldstyle"] = "Ст. стиль";
    diffmisc["vnewstyle"] = "Нов. стиль";
    diffmisc["vrsocheln"] = "Конец Рожественского поста. Сочельник.";
    diffmisc["vrozhestvo"] = "Рожество Христово";
    diffmisc["vsoborbogorod"] = "Собор Пресвятыя Богородицы";
    diffmisc["vobrezanie"] = "Обрезание Господне";
    diffmisc["vsochelnik"] = "Сочельник";
    diffmisc["vbogojavlenie"] = "Святое Богоявление. Крещение Господне";
    diffmisc["vsoborioann"] = "Собор Крестителя Господня Иоанна";
    diffmisc["vtriehsvat"] =
      "Триех Святителей: Василия Великаго, Григория Богослова и Иоанна Златоустаго";
    diffmisc["vsretenie"] = "Сретение Господне";
    diffmisc["vobretenie"] = "Обретение главы Крестителя Господня Иоанна";
    diffmisc["vblagovesh"] = "Благовещение Пресвятыя Богородицы";
    diffmisc["vgeorgypbd"] = "Великомученика Георгия Победоносца";
    diffmisc["vapioann"] = "Апостола и евангелиста Иоанна Богослова";
    diffmisc["vnikola"] = "Святителя Христова Николы";
    diffmisc["vbgdvlad"] = "Иконы Пресвятыя Богородицы Владимирския";
    diffmisc["vrozhioan"] = "Рожество Крестителя Господня Иоанна";
    diffmisc["vbogtihkvin"] = "Иконы Пресвятыя Богородицы Тихвинския";
    diffmisc["vpetrovend"] = "Конец Петрова поста";
    diffmisc["vpetrpavel"] = "Верховных Апостол Петра и Павла";
    diffmisc["vsergiyradonezh"] = "Преподобнаго Сергия Радонежскаго";
    diffmisc["vbgdkazan"] = "Иконы Пресвятыя Богородицы Казанския";
    diffmisc["vilija"] = "Пророка Илии Фезвитянина";
    diffmisc["vbgdsmolen"] = "Иконы Пресвятыя Богородицы Смоленския";
    diffmisc["vprkrest"] =
      "Происхождение Креста Господня<hr noshade size=1 width=70 align=left>Начало Успенского поста";
    diffmisc["vpreobrazh"] = "Преображение Господне";
    diffmisc["vpenduspen"] = "Конец Успенского поста";
    diffmisc["vuspenie"] = "Успение Пресвятыя Богородицы";
    diffmisc["vobraz"] = "Нерукотвореннаго Образа Господня";
    diffmisc["viuseknov"] = "Усекновение Главы Иоанна Крестителя";
    diffmisc["vbgdrozh"] = "Рожество Пресвятыя Богородицы";
    diffmisc["vkrestvozd"] = "Воздвижение Креста Господня";
    diffmisc["vpokrov"] = "Покров Пресвятыя Богородицы";
    diffmisc["vguryvars"] = "Святителей Казанских Гурия и Васонофия";
    diffmisc["vpominovenie"] = "Служба поминовения усопших";
    diffmisc["vradskorbjash"] =
      "Иконы Пресвятыя Богородицы ''Всех скорбящих радость''";
    diffmisc["vvdimitry"] = "Великомученика Димитрия";
    diffmisc["vamvrosybel"] = "Св. Амвросия Белокриницкаго";
    diffmisc["vgermankzn"] = "Святителя Казанского Германа";
    diffmisc["varchmichael"] = "Собор Архангела Михаила";
    diffmisc["vzlatoust"] = "Святителя Иоанна Златоустаго";
    diffmisc["vprozhdbeg"] = "Начало Рожественскаго поста";
    diffmisc["vvvednie"] = "Введение во храм Пресвятыя Богородицы";
    diffmisc["vznamenie"] = "Знамение Пресвятыя Богородицы";
    diffmisc["vavvakum"] = "Священномученика и исповедника Аввакума";
    diffmisc["vgurykazan"] = "Святителя Казанского Гурия";
    diffmisc["vvnifanty"] = "Мученика Внифантия";
    diffmisc["vmstojanie"] = "Марьино стояние";
    diffmisc["vbgdpohval"] = "Похвалы Пресвятыя Богородицы";
    diffmisc["vlazsubota"] = "Лазарева Суббота";
    diffmisc["vhoderusalim"] = "Вход Гоподень во Иерусалим";
    diffmisc["vvelpon"] = "Великий понедельник";
    diffmisc["vvelvtor"] = "Великий вторник";
    diffmisc["vvelsred"] = "Великая среда";
    diffmisc["vvelchetv"] = "Великий Четверг";
    diffmisc["vvelpjatn"] = "Великая пятница";
    diffmisc["vvelsubota"] = "Великая суббота";
    diffmisc["vpasha"] = "Святая Пасха";
    diffmisc["vsvpon"] = "Светлый понедельник";
    diffmisc["vsvvtor"] = "Светлый вторник";
    diffmisc["vsvsreda"] = "Светлая среда";
    diffmisc["vsvchetv"] = "Светлый четверг";
    diffmisc["vsvpjatn"] = "Светлая пятница";
    diffmisc["vsvsubota"] = "Светлая суббота";
    diffmisc["vprepolpent"] = "Преполовение Пятидесятницы";
    diffmisc["votdpasha"] = "Отдание Святыя Пасхи";
    diffmisc["vvoznesenie"] = "Вознесение Господне";
    diffmisc["vpentecost"] = "Пятидесятница День Святыя Троицы";
    diffmisc["vdensvduh"] = "День Святаго Духа";
    diffmisc["vpetrpostbeg"] = "Начало Петрова поста";
    diffmisc["vnotavailable"] = "Не значатся";
    diffmisc["vvelikypost"] = "Великий пост";
    diffmisc["vrozhdpost"] = "Рожественский пост";
    diffmisc["vpostday"] = "Постный день";
    diffmisc["vpetrovpost"] = "Петров пост";
    diffmisc["vuspenpost"] = "Успенский пост";
    diffmisc["vpostsreda"] = "Постная среда";
    diffmisc["vpostpjatn"] = "Постный пяток";
    diffmisc["vpopentecost"] = "-я по Пятидесятнице";
    diffmisc["vpashalcircle"] = "Пасхальный круг:";
    diffmisc["vsvatsy"] = "Святцы:";
    diffmisc["vfasts"] = "Посты:";
    diffmisc["vcurdate"] = "Текущая дата";
    diffmisc["vlowlimit"] = "Значение года не должно быть меньше 1900";
    diffmisc["vuplimit"] = "Значение года не должно быть больше 2099";
    diffmisc["aboutprog"] = "О программе...";
  } else if ((langvar = "eng")) {
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    montholds = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    krug_nedel = [
      "of the Publican and Pharisee",
      "of the Prodigal Son",
      "meatfare",
      "cheesefare",
      "Triumph of Orthodoxy<br>1st of Great Lent",
      "2nd of Great Lent",
      "3rd of Great Lent<br>Veneration of the Holy Cross",
      "4th of Great Lent",
      "5th of Great Lent",
      "palm",
      "Bright",
      "St. Thomas’",
      "of the Myrrh-Bearing Women",
      "of the Paralytic",
      "of the Samaritan Woman",
      "of the Blind Man",
      "Holy Fathers",
      "8th after Pascha",
      "of All Saints<br>1st after Pentecost",
    ];
    krug_sedm = [
      "сплошная",
      "meatfare",
      "cheesefare",
      "1st of Great Lent",
      "2nd of Great Lent",
      "3rd of Great Lent",
      "4th of Great Lent<br>Veneration of the Holy Cross",
      "5th of Great Lent",
      "6th of Great Lent",
      "Great",
      "Bright",
      "2nd after Pascha",
      "3rd after Pascha",
      "4th after Pascha",
      "5th after Pascha",
      "6th after Pascha",
      "7th after Pascha",
      "1st after Pentecost",
      "2nd after Pentecost",
    ];
    shortdn = ["Mn", "Ts", "Wn", "Tr", "Fr", "St", "Sn"];
    dnedel = [
      "Week",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Thursday",
      "Friday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    helps =
      "\t''Orthodox Christian Calendar v2.0''\n\n\tThe calendar shows basic holidays and all the fasts. Additional module shows the list of saints (and correspondingly all the holidays) and fast for each day, as well as instructions of different canons concerning fasting food for each individual day and for certain period of the year as well. Years are limited within the range of 1900 to 2099.\n\tMaterials used during development: calendars of Russian Orthodox Old Rite Church (in part of the list of saints) and canons: Arseny of Ural canon, small domestic canon and Eye of the Church (for composition of food instruction).\n\tAuthor of the program - Serge Kazorin. If you have any questions or suggestions, don't hesitate to contact: admin[a]kirovold.ru\n\tIf anyone would discover here mistakes, errors or oversights, let him not denounce our sinful bad-mindness and ignorance, but let him better pray for sinful God's slave Sergius. May fathers and brothers forgive me for Christ's sake. Glory be to our God forever and aye. Amen.";
    diffmisc["voldstyle"] = "Julian";
    diffmisc["vnewstyle"] = "Gregorian";
    diffmisc["vrsocheln"] =
      "End of the Nativity Fast. Eve of the Nativity of Christ.";
    diffmisc["vrozhestvo"] = "Nativity of our Lord and Savior, Jesus Christ";
    diffmisc["vsoborbogorod"] = "Synaxis of the Most Holy Mother of God";
    diffmisc["vobrezanie"] = "Circumcision of Our Lord Jesus Christ";
    diffmisc["vsochelnik"] = "Eve of Theophany";
    diffmisc["vbogojavlenie"] = "Theophany";
    diffmisc["vsoborioann"] = "Synaxis of St. John the Baptist";
    diffmisc["vtriehsvat"] =
      "Synaxis of the Three Hierarchs: St. Basi the Great, St. Gregory the Theologian and St. John Chrysostom";
    diffmisc["vsretenie"] = "Meeting of Our Lord and Savior";
    diffmisc["vobretenie"] =
      "Finding of the precious head of St. John the Baptist";
    diffmisc["vblagovesh"] = "The Annunciation of the Most Holy Mother of God";
    diffmisc["vgeorgypbd"] = "Greate martyr George the Victory-bearer";
    diffmisc["vapioann"] = "Holy Apostle and Evangelist John the Theologian";
    diffmisc["vnikola"] = "St. Nicholas of Myra";
    diffmisc["vbgdvlad"] = "''Vladimir'' Icon of the Holy Mother of God";
    diffmisc["vrozhioan"] = "Nativity of St. John the Baptist";
    diffmisc["vbogtihkvin"] = "''Тikhvin'' Icon of the Mother of God";
    diffmisc["vpetrovend"] =
      "End of the Fast of the Holy Apostles Peter and Paul";
    diffmisc["vpetrpavel"] = "The Holy Apostles Peter and Paul";
    diffmisc["vsergiyradonezh"] = "St. Sergius of Radonezh";
    diffmisc["vbgdkazan"] =
      "Appearance of the ''Kazan'' Icon of the Mother of God";
    diffmisc["vilija"] = "Holy Prophet Elias";
    diffmisc["vbgdsmolen"] = "''Smolensk'' Icon of the Mother of God";
    diffmisc["vprkrest"] =
      "Procession of the Life-giving Cross<hr noshade size=1 width=70 align=left>Beginning of the Dormition fast";
    diffmisc["vpreobrazh"] = "Transfiguration of Our Lord";
    diffmisc["vpenduspen"] = "End of the Dormition fast";
    diffmisc["vuspenie"] = "The Dormition of the Holy Mother of God";
    diffmisc["vobraz"] = "Not-made-by-hands Image of Our Lord";
    diffmisc["viuseknov"] = "Beheading of St. John the Baptist";
    diffmisc["vbgdrozh"] = "Nativity of the Holy Mother of God";
    diffmisc["vkrestvozd"] = "Exaltation of the Life-giving Cross";
    diffmisc["vpokrov"] = "Protection of the Holy Mother of God";
    diffmisc["vguryvars"] = "St. Gury and Varsonofy of Kazan";
    diffmisc["vpominovenie"] = "Memorial service";
    diffmisc["vradskorbjash"] =
      "Icon of the Mother of God ''The Joy of All Who Sorrow''";
    diffmisc["vvdimitry"] = "Great-martyr Demetrius";
    diffmisc["vamvrosybel"] = "St. Ambrosius of Belaja Krinitsa";
    diffmisc["vgermankzn"] = "St. Herman of Kazan";
    diffmisc["varchmichael"] = "Synaxis of Archangel Michael";
    diffmisc["vzlatoust"] = "St. John Chrysostom";
    diffmisc["vprozhdbeg"] = "Beginning of the Nativity Fast";
    diffmisc["vvvednie"] =
      "Entry of the Most Holy Mother of God into the Temple";
    diffmisc["vznamenie"] = "Icon of the Mother of God ''Of the Sign''";
    diffmisc["vavvakum"] = "St. Martyr and Confessor Avvakum";
    diffmisc["vgurykazan"] = "St. Gury of Kazan";
    diffmisc["vvnifanty"] = "Holy martyr Vnifanty";
    diffmisc["vmstojanie"] = "Great Canon of St. Andrew";
    diffmisc["vbgdpohval"] = "Laudation of the Most Holy Mother of God";
    diffmisc["vlazsubota"] = "Lazarus Sаturday";
    diffmisc["vhoderusalim"] = "Palm Sunday";
    diffmisc["vvelpon"] = "Great Monday";
    diffmisc["vvelvtor"] = "Great Tuesday";
    diffmisc["vvelsred"] = "Great Wednesday";
    diffmisc["vvelchetv"] = "Great Thursday";
    diffmisc["vvelpjatn"] = "Great Friday";
    diffmisc["vvelsubota"] = "Great Saturday";
    diffmisc["vpasha"] = "The Resurrection of Our Lord";
    diffmisc["vsvpon"] = "Bright Monday";
    diffmisc["vsvvtor"] = "Bright Tuesday";
    diffmisc["vsvsreda"] = "Bright Wednesday";
    diffmisc["vsvchetv"] = "Bright Thursday";
    diffmisc["vsvpjatn"] = "Bright Friday";
    diffmisc["vsvsubota"] = "Bright Saturday";
    diffmisc["vprepolpent"] = "Mid-Pentecost";
    diffmisc["votdpasha"] = "Apodosis of Pascha";
    diffmisc["vvoznesenie"] = "Ascension of Our Lord";
    diffmisc["vpentecost"] = "Pentecost – Holy Trinity Sunday";
    diffmisc["vdensvduh"] = "Day of the Holy Spirit";
    diffmisc["vpetrpostbeg"] =
      "Beginning of the Fast of the Holy Apostles Peter and Paul";
    diffmisc["vnotavailable"] = "None";
    diffmisc["vvelikypost"] = "Great Lent";
    diffmisc["vrozhdpost"] = "Nativity Fast";
    diffmisc["vpostday"] = "Fasting day";
    diffmisc["vpetrovpost"] = "Fast of the Holy Apostles";
    diffmisc["vuspenpost"] = "Dormition Fast";
    diffmisc["vpostsreda"] = "Fast of Wednesday";
    diffmisc["vpostpjatn"] = "Fast of Friday";
    diffmisc["vpopentecost"] = "th after Pentecost";
    diffmisc["vpashalcircle"] = "Additional info:";
    diffmisc["vsvatsy"] = "Holidays:";
    diffmisc["vfasts"] = "Fasts:";
    diffmisc["vcurdate"] = "Current date";
    diffmisc["vlowlimit"] = "The year value should not be less than 1900";
    diffmisc["vuplimit"] = "The year value should not be greater than 2099";
    diffmisc["aboutprog"] = "About program...";
  }
}

function getJulianAndGregorianDate(now) {
  renvars("rus");
  var day = now.getDay();
  var date = now.getDate();
  var dayname;
  var month = now.getMonth();
  var datest;
  var monthst = month;
  var days;
  var thisYear = now.getYear();
  var daysInMonth;
  if (thisYear < 2000) thisYear + 1900;
  if (month == 2) {
    if (thisYear % 4 == 0) daysInMonth = 29;
    else daysInMonth = 28;
  } else if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 0
  )
    daysInMonth = 31;
  else if (month == 4 || month == 6 || month == 9 || month == 11)
    daysInMonth = 30;

  if (date >= 14) datest = date - 13;
  else if (date < 14) {
    if (month == 0) {
      monthst = month + 11;
    } else {
      monthst = month - 1;
    }
    if (daysInMonth == 28) datest = date + 15;
    if (daysInMonth == 29) datest = date + 16;
    if (daysInMonth == 30) datest = date + 17;
    if (daysInMonth == 31) datest = date + 18;
  }
  var dayst = " ";
  if (day == 0) dayst = dnedel[1];
  if (day == 1) dayst = dnedel[2];
  if (day == 2) dayst = dnedel[3];
  if (day == 3) dayst = dnedel[4];
  if (day == 4) dayst = dnedel[5];
  if (day == 5) dayst = dnedel[7];
  if (day == 6) dayst = dnedel[9];
  if (day == 0) dayname = dnedel[10];
  if (day == 1) dayname = dnedel[2];
  if (day == 2) dayname = dnedel[3];
  if (day == 3) dayname = dnedel[4];
  if (day == 4) dayname = dnedel[6];
  if (day == 5) dayname = dnedel[8];
  if (day == 6) dayname = dnedel[9];

  var monthName = months[month];
  var monthold = montholds[monthst];
  var year = now.getYear();
  var yearst;
  if (year < 2000) yearst = year + 7408;
  else yearst = year + 5508;
  if (year < 2000) year += 1900;

  return {
    julian: {
      day: datest,
      month: monthold,
      dayOfWeek: dayst,
      year: yearst,
    },
    gregorian: {
      day: now.getDate(),
      month: monthName,
      dayOfWeek: dayname,
      year: year,
    },
  };
}

function pr(now) {
  renvars("rus");
  var day = now.getDate();
  var daypr = diffmisc["vnotavailable"];
  var month = now.getMonth();
  var month = now.getMonth();
  var year = now.getYear();
  var day_pasch = "";
  var den = now.getDay();

  if (month == 0) {
    if (day == 1) daypr = diffmisc["vvnifanty"];
    if (day == 6) daypr = diffmisc["vrsocheln"];
    if (day == 7) daypr = diffmisc["vrozhestvo"];
    if (day == 8) daypr = diffmisc["vsoborbogorod"];
    if (day == 14) daypr = diffmisc["vobrezanie"];
    if (day == 18) daypr = diffmisc["vsochelnik"];
    if (day == 19) daypr = diffmisc["vbogojavlenie"];
    if (day == 20) daypr = diffmisc["vsoborioann"];
  }

  if (month == 1) {
    if (day == 12) daypr = diffmisc["vtriehsvat"];
    if (day == 15) daypr = diffmisc["vsretenie"];
  }

  if (month == 2 && year % 4 != 0) {
    if (day == 9) daypr = diffmisc["vobretenie"];
  }

  if (month == 2 && year % 4 == 0) {
    if (day == 8) daypr = diffmisc["vobretenie"];
  }

  if (month == 3) {
    if (day == 7) daypr = diffmisc["vblagovesh"];
  }

  if (month == 4) {
    if (day == 6) daypr = diffmisc["vgeorgypbd"];
    if (day == 21) daypr = diffmisc["vapioann"];
    if (day == 22) daypr = diffmisc["vnikola"];
  }

  if (month == 5) {
    if (day == 3) daypr = diffmisc["vbgdvlad"];
  }

  if (month == 6) {
    if (day == 7) daypr = diffmisc["vrozhioan"];
    if (day == 9) daypr = diffmisc["vbogtihkvin"];
    if (day == 11) daypr = diffmisc["vpetrovend"];
    if (day == 12) daypr = diffmisc["vpetrpavel"];
    if (day == 18) daypr = diffmisc["vsergiyradonezh"];
    if (day == 21) daypr = diffmisc["vbgdkazan"];
  }

  if (month == 7) {
    if (day == 2) daypr = diffmisc["vilija"];
    if (day == 10) daypr = diffmisc["vbgdsmolen"];
    if (day == 14) daypr = diffmisc["vprkrest"];
    if (day == 19) daypr = diffmisc["vpreobrazh"];
    if (day == 27) daypr = diffmisc["vpenduspen"];
    if (day == 28) daypr = diffmisc["vuspenie"];
    if (day == 29) daypr = diffmisc["vobraz"];
  }

  if (month == 8) {
    if (day == 8) daypr = diffmisc["vbgdvlad"];
    if (day == 11) daypr = diffmisc["viuseknov"];
    if (day == 21) daypr = diffmisc["vbgdrozh"];
    if (day == 27) daypr = diffmisc["vkrestvozd"];
  }

  if (month == 9) {
    if (day == 8) daypr = diffmisc["vsergiyradonezh"];
    if (day == 9) daypr = diffmisc["vapioann"];
    if (day == 14) daypr = diffmisc["vpokrov"];
    if (day == 17) daypr = diffmisc["vguryvars"];
  }

  if (month == 10) {
    if (day == 1) daypr = diffmisc["vpominovenie"];
    if (day == 4) daypr = diffmisc["vbgdkazan"];
    if (day == 6) daypr = diffmisc["vradskorbjash"];
    if (day == 8) daypr = diffmisc["vvdimitry"];
    if (day == 12) daypr = diffmisc["vamvrosybel"];
    if (day == 19) daypr = diffmisc["vgermankzn"];
    if (day == 21) daypr = diffmisc["varchmichael"];
    if (day == 26) daypr = diffmisc["vzlatoust"];
    if (day == 28) daypr = diffmisc["vprozhdbeg"];
  }

  if (month == 11) {
    if (day == 4) daypr = diffmisc["vvvednie"];
    if (day == 10) daypr = diffmisc["vznamenie"];
    if (day == 15) daypr = diffmisc["vavvakum"];
    if (day == 18) daypr = diffmisc["vgurykazan"];
    if (day == 19) daypr = diffmisc["vnikola"];
  }

  if (month > 1 && month < 7) {
    if (year < 2000) year += 1900;
    var kluch = pascha(year);
    var month_plus = [0, 0, 31, 30, 31, 30, 31];
    var dimension = day;
    for (var x = 0; x < month; x++) {
      dimension += month_plus[x];
    }
    if (dimension > 15 && dimension < 130) {
      if (dimension == 34 - 18 + kluch) {
        day_pasch = diffmisc["vmstojanie"];
        przdnum = 8;
      }
      if (dimension == 34 - 15 + kluch) {
        day_pasch = diffmisc["vbgdpohval"];
        przdnum = 10;
      }
      if (dimension == 34 - 8 + kluch) {
        day_pasch = diffmisc["vlazsubota"];
        przdnum = 12;
      }
      if (dimension == 34 - 7 + kluch) {
        day_pasch = diffmisc["vhoderusalim"];
        przdnum = 13;
      }
      if (dimension == 34 - 6 + kluch) day_pasch = diffmisc["vvelpon"];
      if (dimension == 34 - 5 + kluch) day_pasch = diffmisc["vvelvtor"];
      if (dimension == 34 - 4 + kluch) day_pasch = diffmisc["vvelsred"];
      if (dimension == 34 - 3 + kluch) day_pasch = diffmisc["vvelchetv"];
      if (dimension == 34 - 2 + kluch) day_pasch = diffmisc["vvelpjatn"];
      if (dimension == 34 - 1 + kluch) day_pasch = diffmisc["vvelsubota"];
      if (dimension == 34 + kluch) {
        day_pasch = diffmisc["vpasha"];
        przdnum = 15;
      }
      if (dimension == 34 + 1 + kluch) day_pasch = diffmisc["vsvpon"];
      if (dimension == 34 + 2 + kluch) day_pasch = diffmisc["vsvvtor"];
      if (dimension == 34 + 3 + kluch) day_pasch = diffmisc["vsvsreda"];
      if (dimension == 34 + 4 + kluch) day_pasch = diffmisc["vsvchetv"];
      if (dimension == 34 + 5 + kluch) day_pasch = diffmisc["vsvpjatn"];
      if (dimension == 34 + 6 + kluch) day_pasch = diffmisc["vsvsubota"];
      if (dimension == 34 + 24 + kluch) day_pasch = diffmisc["vprepolpent"];
      if (dimension == 34 + 38 + kluch) day_pasch = diffmisc["votdpasha"];
      if (dimension == 34 + 39 + kluch) day_pasch = diffmisc["vvoznesenie"];
      if (dimension == 34 + 49 + kluch) day_pasch = diffmisc["vpentecost"];
      if (dimension == 34 + 50 + kluch) day_pasch = diffmisc["vdensvduh"];
      if (dimension == 34 + 57 + kluch) day_pasch = diffmisc["vpetrpostbeg"];
    }
  }
  if (day_pasch != "") {
    if (daypr == diffmisc["vnotavailable"]) daypr = day_pasch;
    else daypr += "<hr size='1' width='100%' noshade>" + day_pasch;
  }
  if (den == 0) {
    if (daypr == diffmisc["vnotavailable"]) daypr = dnedel[10];
    else daypr += "<hr size='1' width='100%' noshade>" + dnedel[10];
  }
  return daypr;
}

function fast(now, opmode = 2) {
  renvars("rus");
  var den = now.getDay();
  var day = now.getDate();
  var month = now.getMonth();
  var year = now.getYear();
  var permament = diffmisc["vnotavailable"];
  var piter_fast = 0;
  var early_piter_fast = 0;
  var vys, dimension, fs_pass;
  var fast_id = 0;
  if (year < 2000) year += 1900;
  if (year % 4 == 0) vys = 1;
  else vys = 0;
  if ((month == 0 && vys == 1) || (month == 1 && vys == 1)) dimension = day;
  else dimension = day + vys;
  var piter_fast = 0;
  var kluch = pascha(year);
  var month_plus = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var gran = kluch + 23 + vys;
  for (var x = 0; x < month; x++) {
    dimension += month_plus[x];
  }
  dimension -= gran;
  dimension--;
  var mod = dimension % 7;
  var result = (dimension - mod) / 7;
  if (dimension < 0) result = -1;
  s_id = result;
  if (result == 0) {
    fast_id = 2;
    fastnum = 1;
  }
  if (result == 1) {
    fast_id = 0;
    fastnum = 2;
  }
  if (result == 2) {
    fast_id = 2;
    fastnum = 3;
  }
  if (result == 3) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 4;
  }
  if (result == 4) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 5;
  }
  if (result == 5) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 6;
  }
  if (result == 6) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 7;
  }
  if (result == 7) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 9;
  }
  if (result == 8) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 11;
  }
  if (result == 9 && den != 0) {
    fast_id = 1;
    permament = diffmisc["vvelikypost"];
    fastnum = 14;
  }
  if (result == 10) {
    fast_id = 2;
    fastnum = 16;
  }
  if (result == 11) {
    fast_id = 0;
    fastnum = 17;
  }
  if (result == 12) {
    fast_id = 0;
    fastnum = 18;
  }
  if (result == 13) {
    fast_id = 0;
    fastnum = 19;
  }
  if (result == 14) {
    fast_id = 0;
    fastnum = 20;
  }
  if (result == 15) {
    fast_id = 0;
    fastnum = 21;
  }
  if (result == 16) {
    fast_id = 0;
    fastnum = 22;
  }
  if (result == 17) {
    fast_id = 2;
    fastnum = 23;
  }
  if (result == 18) {
    fast_id = 1;
    if (den != 0) {
      piter_fast = day - den;
    } else piter_fast = day - 6;
  }
  if (month == 0) {
    if (day <= 6) {
      permament = diffmisc["vrozhdpost"];
      fast_id = 1;
      fastnum = 26;
    }
    if (day >= 7 && day <= 19) {
      fast_id = 2;
      fastnum = 28;
    }
    if (day == 18) {
      permament = diffmisc["vpostday"];
      fast_id = 1;
    }
  }
  if (month == 4 && result == 18 && day > piter_fast) {
    permament = diffmisc["vpetrovpost"];
    early_piter_fast = 1;
    fast_id = 1;
    fastnum = 24;
  }
  if (month == 5) {
    if (result >= 18 && day > piter_fast) {
      permament = diffmisc["vpetrovpost"];
      fast_id = 1;
      fastnum = 24;
    }
    if (early_piter_fast == 1) {
      permament = diffmisc["vpetrovpost"];
      fast_id = 1;
      fastnum = 24;
    }
  }
  if (month == 6) {
    if (day <= 11) {
      if (result > 17) permament = diffmisc["vpetrovpost"];
      fast_id = 1;
      fastnum = 24;
    }
  } else if (month == 7) {
    if (day >= 14 && day < 28) {
      permament = diffmisc["vuspenpost"];
      fast_id = 1;
      fastnum = 25;
    }
  }
  if (month == 8) {
    if (day == 11 || day == 27) {
      permament = diffmisc["vpostday"];
      fast_id = 1;
    }
  }
  if (month == 10) {
    if (day >= 28) {
      permament = diffmisc["vrozhdpost"];
      fast_id = 1;
      fastnum = 26;
    }
  }
  if (month == 11) {
    permament = diffmisc["vrozhdpost"];
    fast_id = 1;
    fastnum = 26;
  }

  if (fast_id == 0) {
    if (den == 3) {
      permament = diffmisc["vpostsreda"];
      fast_id = 1;
      dayfast = 3;
      if (opmode == 2) nday = 3;
    }
    if (den == 5) {
      permament = diffmisc["vpostpjatn"];
      fast_id = 1;
      dayfast = 5;
      if (opmode == 2) nday = 5;
    }
  }
  return {
    permament,
    fast_id,
    fastnum,
  };
  // var permamentDat = permament;
  // if (protect == 0) {
  //   cal_fast_str =
  //     "<font size='-1' style='font-size: 11pt' face='Verdana,Arial' color='#000000'><b><br>" +
  //     permamentDat +
  //     "</b></font><br>";
  //   if (document.all) cal_fast.innerHTML = cal_fast_str;
  //   else document.getElementById("cal_fast").innerHTML = cal_fast_str;
  // }
  // if (opmode == 1) fastnum = 0;
  // if (permament != diffmisc["vnotavailable"]) fs_pass = 1;
  // else fs_pass = 0;
  // return fs_pass;
}

function nedel(now) {
  renvars("rus");
  var day = now.getDate();
  var month = now.getMonth();
  var year = now.getYear();
  var vys, dimension;
  if (year < 2000) year += 1900;
  if (year % 4 == 0) vys = 1;
  else vys = 0;
  if ((month == 0 && vys == 1) || (month == 1 && vys == 1)) dimension = day;
  else dimension = day + vys;
  var kluch = pascha(year);
  var month_plus = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var gran = kluch + 23 + vys;
  for (var x = 0; x < month; x++) {
    dimension += month_plus[x];
  }
  dimension -= gran;
  if (dimension < 0) {
    var vys1, kluch1;
    if ((year - 1) % 4 == 0) vys1 = 1;
    else vys1 = 0;
    dimension = day + vys1;
    kluch1 = pascha(year - 1);
    var month_plus1 = [
      31,
      28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
      31,
      28,
      31,
    ];
    var gran1 = kluch1 + 23 + vys1;
    for (x = 0; x < month + 12; x++) {
      dimension += month_plus1[x];
    }
    dimension -= gran1;
  }
  var mod = dimension % 7;
  var result = (dimension - mod) / 7;
  if (result < 19) {
    if (mod == 0) {
      return dnedel[1] + " " + krug_nedel[result];
      // track = 1;
      // res = result;
    } else {
      return dnedel[0] + " " + krug_sedm[result];
      // track = 2;
      // res = result;
    }
  } else {
    result -= 18;
    if (mod == 0) {
      return dnedel[1] + " " + (result + 1) + diffmisc["vpopentecost"];
      // track = 3;
      // res = result + 1;
    } else {
      return dnedel[0] + " " + (result + 2) + diffmisc["vpopentecost"];
      // track = 4;
      // res = result + 2;
    }
  }
}

// var new_date = new Date();
// if (year < 2000) year += 1900;
// getJulianAndGregorianDate(new_date);
// pr(new_date, 2);
// fast(new_date, 2);
// nedel(new_date);

function pascha(year_u) {
  var year_moon,
    year_sun,
    year_sun,
    granitsa,
    gr_month,
    granitsa_num,
    dop,
    day_vr,
    paschal,
    paschal_month;
  var granitsa_arr = [
    0,
    33,
    22,
    41,
    30,
    49,
    38,
    27,
    46,
    35,
    24,
    43,
    32,
    21,
    40,
    29,
    48,
    36,
    25,
    44,
  ];
  var vrutseleto_arr = [
    0,
    1,
    2,
    3,
    5,
    6,
    7,
    1,
    3,
    4,
    5,
    6,
    1,
    2,
    3,
    4,
    6,
    7,
    1,
    2,
    4,
    5,
    6,
    7,
    2,
    3,
    4,
    5,
    7,
  ];

  year_old = year_u + 5508;

  year_moon = year_old % 19;
  if (year_moon == 0) year_moon = 19;

  year_sun = year_old % 28;
  if (year_sun == 0) year_sun = 28;
  vrutseleto = vrutseleto_arr[year_sun];

  granitsa = granitsa_arr[year_moon];

  if (granitsa > 31) {
    granitsa_num = granitsa - 31;
    gr_month = 3;
    dop = 6;
  }
  if (granitsa >= 21 && granitsa < 31) {
    granitsa_num = granitsa;
    gr_month = 2;
    dop = 3;
  }

  day_vr = (granitsa_num + dop + vrutseleto) % 7;

  paschal = 7 - day_vr + granitsa;
  paschal_month = 2;
  if (paschal > 31) {
    paschal -= 31;
    paschal_month = 3;
  }

  if (paschal_month == 3) kluch = paschal + 10;
  if (paschal_month == 2) kluch = paschal - 21;

  return kluch;
}

//Конец и слава Богу

module.exports = { getJulianAndGregorianDate, replacer, pr, fast, nedel };
