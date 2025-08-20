function firstLetterUC(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function halfYear(date) {
    const firstDay = autumnEquinox(date.getFullYear());
    return date.getMonth() < 8 || (date.getMonth() === 8 && date.getDate() < firstDay.getDate());
}

function year(date) {
    if (halfYear(date)) {
        return date.getFullYear() - 1792;
    }
    return date.getFullYear() - 1791;
}

function convertToRomanNumeral(num) {
    romanNumerals=jsonDate.romanNumerals
    let result = "";
    
    for (const { value, symbol } of romanNumerals) {
      	while (num >= value) {
      	  	result += symbol;
      	  	num -= value;
      	}
    }
    
    return result;
}

function getOneDayInMS() {
	return 1000 * 60 * 60 * 24;
}

function dayOfYear(date) {
    const currentYear = halfYear(date) ? date.getFullYear() - 1 : date.getFullYear(),
        firstDayOfYear = autumnEquinox(currentYear);
    return Math.floor((date - firstDayOfYear) / getOneDayInMS())+2;
}

function dayOfYearName(date) {
    return jsonDate.name_days[dayOfYear(date) - 1];
}

function month(date) {
    return Math.floor((dayOfYear(date) - 1) / 30) + 1;
}

function monthName(date) {
    return jsonDate.months[month(date) - 1];
}

function dayOfMonth(date) {
    return ((dayOfYear(date) - 1) - (month(date) - 1) * 30) + 1;
}

function dayOfDecade(date) {
    return ((dayOfMonth(date) - 1) % 10) + 1;
}

function dayOfDecadeName(date) {
    return jsonDate.days[dayOfDecade(date) - 1];
}

function dateOfEaster(year) {
    var g,c,x,z,d,e,n, month,day;
    g = Math.floor(year % 19) + 1;
    c = Math.floor(year / 100) + 1;
    x = Math.floor((3 * c) / 4) - 12;
    z = Math.floor((8 * c + 5) / 25) - 5;
    d = Math.floor((5 * year) / 4) - x - 10;
    e = Math.floor(11 * g + 20 + z - x) % 30;
    if(e < 0) e += 30;
    if(((e == 25) && (g > 11)) || (e == 24)) e++;
    n = 44 - e;
    if(n < 21) n += 30;
    n = n + 7 - ((d + n) % 7);
    if(n > 31) {
       month = 4;
       day = n - 31;
    } else {
       month = 3;
       day = n;
    }

    return `${month < 10 ? "0"+month : month}-${day}`;
}

function fromJulian(jd) {
    const dateTemp = new Date((jd - 2440587.5) * 86400 * 1000);
    dateTemp.setHours(0,0,0);
    return dateTemp;
}

// Équinoxe de printemps (mars)
function springEquinox(year) {
    const Y = (year - 2000) / 1000;
    const JDE0 =
        2451623.80984 +
        365242.37404 * Y +
        0.05169 * Y * Y -
        0.00411 * Y * Y * Y -
        0.00057 * Y * Y * Y * Y;

    return fromJulian(JDE0);
}

// Solstice d'été (juin)
function summerSolstice(year) {
    const Y = (year - 2000) / 1000;
    const JDE0 =
        2451716.56767 +
        365241.62603 * Y +
        0.00325 * Y * Y +
        0.00888 * Y * Y * Y -
        0.00030 * Y * Y * Y * Y;

    return fromJulian(JDE0);
}

function autumnEquinox(year) {
    const Y = (year - 2000) / 1000;
    const JDE0 =
        2451810.217 +
        365242.01767 * Y -
        0.11575 * Y * Y +
        0.00337 * Y * Y * Y +
        0.00078 * Y * Y * Y * Y;

    // Retourner les composantes UTC
    return fromJulian(JDE0);
}

// Solstice d'hiver (décembre)
function winterSolstice(year) {
    const Y = (year - 2000) / 1000;
    const JDE0 =
        2451900.05952 +
        365242.74049 * Y -
        0.06223 * Y * Y -
        0.00823 * Y * Y * Y +
        0.00032 * Y * Y * Y * Y;

    return fromJulian(JDE0);
}

console.log(springEquinox(2025));
console.log(summerSolstice(2025));
console.log(autumnEquinox(2025));
console.log(winterSolstice(2025));

let printempsEte = (summerSolstice(2025) - springEquinox(2025)) / getOneDayInMS();
let eteAutomne = (autumnEquinox(2025) - summerSolstice(2025)) / getOneDayInMS();
let automneHiver = (winterSolstice(2025) - autumnEquinox(2025)) / getOneDayInMS();
let hiverPrintemps = (springEquinox(2026) - winterSolstice(2025)) / getOneDayInMS()

console.log(printempsEte);
console.log(eteAutomne)
console.log(automneHiver);
console.log(hiverPrintemps);

console.log(printempsEte + eteAutomne + automneHiver + hiverPrintemps);

console.log("----------------------------------------------");

printempsEte = (summerSolstice(2024) - springEquinox(2024)) / getOneDayInMS();
eteAutomne = (autumnEquinox(2024) - summerSolstice(2024)) / getOneDayInMS();
automneHiver = (winterSolstice(2024) - autumnEquinox(2024)) / getOneDayInMS();
hiverPrintemps = (springEquinox(2025) - winterSolstice(2024)) / getOneDayInMS()

console.log(printempsEte);
console.log(eteAutomne)
console.log(automneHiver);
console.log(hiverPrintemps);

console.log(printempsEte + eteAutomne + automneHiver + hiverPrintemps);

console.log("----------------------------------------------");

printempsEte = (summerSolstice(2023) - springEquinox(2023)) / getOneDayInMS();
eteAutomne = (autumnEquinox(2023) - summerSolstice(2023)) / getOneDayInMS();
automneHiver = (winterSolstice(2023) - autumnEquinox(2023)) / getOneDayInMS();
hiverPrintemps = (springEquinox(2024) - winterSolstice(2023)) / getOneDayInMS()

console.log(printempsEte);
console.log(eteAutomne)
console.log(automneHiver);
console.log(hiverPrintemps);

console.log(printempsEte + eteAutomne + automneHiver + hiverPrintemps);

console.log("----------------------------------------------");

printempsEte = (summerSolstice(2022) - springEquinox(2022)) / getOneDayInMS();
eteAutomne = (autumnEquinox(2022) - summerSolstice(2022)) / getOneDayInMS();
automneHiver = (winterSolstice(2022) - autumnEquinox(2022)) / getOneDayInMS();
hiverPrintemps = (springEquinox(2023) - winterSolstice(2022)) / getOneDayInMS()

console.log(printempsEte);
console.log(eteAutomne)
console.log(automneHiver);
console.log(hiverPrintemps);

console.log(printempsEte + eteAutomne + automneHiver + hiverPrintemps);

// Printemps : Germination, Croissance, Fleur, etc.
// Été : Soleil, Chaleur, Feu, etc.
// Automne : Vent, Feuille, Récolte, etc.
// Hiver : Neige, Froid, Nuit, etc.