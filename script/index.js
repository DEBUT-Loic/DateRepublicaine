var jsonDate;

$(document).ready(() => {
    $.ajax({
        url : "json/data.json",
        dataType : "json",
        async : false,
        success : (res) => {
            jsonDate = res;
        }
    })

    displayDate() || setInterval(displayDate, 1000);
})