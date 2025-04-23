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
        $("nav a").css({background:"white",color:"black"});
        $(this).css({background:"black",color:"white"});
    })

    $("main").scroll(scrollMain);
    $("#dateConv").on("input", dateConversion);
})