var jsonDate;
$.ajax({
    url:"json/data.json",
    dataType:"json",
    async:false,
    success:(res)=>{
        jsonDate=res;
    }
})

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
    // Define Roman numeral symbols and their values
    romanNumerals=jsonDate.romanNumerals
    let result = "";
    
    // Iterate through each Roman numeral mapping
    for (const { value, symbol } of romanNumerals) {
      // Repeat the current symbol while the number is greater than or equal to its value
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    
    return result;
}

ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
function dayOfYear(date) {
    const currentYear = halfYear(date) ? date.getFullYear() - 1 : date.getFullYear(),
        firstDayOfYear = new Date(currentYear, 8, 22);
    return Math.floor((date - firstDayOfYear) / ONE_DAY_IN_MS)+1;
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

// module.exports = {
//     year,
//     dayOfYear,
//     dayOfYearName,
//     month,
//     monthName,
//     dayOfMonth,
//     dayOfDecade,
//     dayOfDecadeName
// };
