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

    $("nav a").click(function() {
        $("nav a").removeClass("selected");
        $(this).addClass("selected");
    })

    $("main").scroll(scrollMain);
})