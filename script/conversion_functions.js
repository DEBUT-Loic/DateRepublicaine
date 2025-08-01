function firstLetterUC(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function halfYear(date) {
    return date.getMonth() < 8 || (date.getMonth() === 8 && date.getDate() < 22);
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
        firstDayOfYear = new Date(currentYear, 8, 22);
    return Math.floor((date - firstDayOfYear) / getOneDayInMS())+1;
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