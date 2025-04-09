$(document).ready(() => {
    var date;

    // Mettre la date grégorienne et républicaine
    function dateAffichage() {
        date = new Date();

        // GRÉGORIENNE
        // Options pour la date en toutes lettres
        const options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
        $("#gregorien > .date").text(firstLetterUC(date.toLocaleDateString('fr', options)));

        // Formatage de l'heure avec padding
        const h = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        const sec = String(date.getSeconds()).padStart(2, "0");       
        $("#gregorien > .heure").text(`${h} h ${min} : ${sec}`);

        // --------------------------------------------------------------------------------------

        // RÉPUBLICAINE
        let dateRep;
        switch (date.getTimezoneOffset()) {
            case -60:
                date.setHours(date.getHours()-1);
                dateRep=`${firstLetterUC(dayOfDecadeName(date))} ${dayOfMonth(date)} ${firstLetterUC(monthName(date))} an ${convertToRomanNumeral(year(date))}`;
                date.setHours(date.getHours()+1);
                break;
            
            default:
                dateRep=`${firstLetterUC(dayOfDecadeName(date))} ${dayOfMonth(date)} ${firstLetterUC(monthName(date))} an ${convertToRomanNumeral(year(date))}`;
                break;
        }

        const tempsDecimal=(date.getSeconds()+date.getMinutes()*60+date.getHours()*3600) / 0.864;
        const heure=Math.floor(tempsDecimal/10_000) % 10 // 1 heure = 100 secondes * 100 minutes
        const minute=Math.floor(tempsDecimal/100) % 100 // 1 minute = 100 secondes
        const seconde=Math.floor(tempsDecimal) % 100

        const pad = (n) => String(n).padStart(2, "0");
        const horDec=`${pad(heure)} h ${pad(minute)} : ${pad(seconde)}`;

        $("#republic > .date").text(dateRep);
        $("#republic > .heure").text(horDec);
        $("#gregorien h1 > span").text(`(an ${year(date)})`)

        // Mettre le fond parchemin
        if(month(date) < 4) {
            $('body').css('background-image','url("img/parchemin automne.png")');
        }
        else if(month(date) < 7) {
            $('body').css('background-image','url("img/parchemin hiver.png")');
        }
        else if(month(date) < 10) {
            $('body').css('background-image','url("img/parchemin printemps.png")');
        }
        else if(month(date) < 13) {
            $('body').css('background-image','url("img/parchemin été.png")');
        }
        else {
            $('body').css('background-image','url("img/parchemin.jpg")');
        }
    }
    dateAffichage();
    setInterval(dateAffichage,1000);
})