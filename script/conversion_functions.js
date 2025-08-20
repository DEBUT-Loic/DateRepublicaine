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

function autumnEquinox(year) {
    const Y = (year - 2000) / 1000;
    const JDE0 = 2451810.217 + 365242.01767 * Y - 0.11575 * Y * Y + 0.00337 * Y * Y * Y + 0.00078 * Y * Y * Y * Y;

    function fromJulian(jd) {
        return new Date((jd - 2440587.5) * 86400 * 1000);
    }

    const dateUTC = fromJulian(JDE0);

    // Retourner les composantes UTC
    return dateUTC;
}