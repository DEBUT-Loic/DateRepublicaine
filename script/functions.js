// Mettre la date grégorienne et républicaine
function displayDate() {
    let date = new Date();

    // GRÉGORIENNE
	refreshGregContent(date);

    // --------------------------------------------------------------------------------------

    // RÉPUBLICAINE
    let repDate = calculateRepDate(date);
	refreshRepContent(date, repDate, false);

    refreshBackground(date);
}

function refreshBackground(date) {
	const season = ["automne", "hiver", "printemps", "été", "rien"][month(date) % 12 / 3 | 0];
    $("body").css("background-image", `url("img/parchemin_${season}.png")`);
}

// Actualiser le contenu de la partie Grégorienne de la page
function refreshGregContent(date) {
    // Options pour la date en toutes lettres
    const options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };

    $("#gregorien > .date").text(firstLetterUC(date.toLocaleDateString("fr", options)));
    $("#gregorien > .heure").text(formateHour(date, "greg"));
}

// Actualiser le contenu de la partie Républicaine de la page
function refreshRepContent(date, repDate, conv) {
	let ajout=conv ? "Conv" : "";
	$(`#republic${ajout} > .fete`).text(firstLetterUC(dayOfYearName(date)));
	$(`#republic${ajout} > .date`).text(repDate);
	if(ajout) $(`#republic > .heure`).text(formateHour(date, "rep"));
	$("#gregorien h1 > span").text(`(an ${year(date)})`);
}

function calculateRepDate(date) {
	if (date.getTimezoneOffset() !== -60) {
		return `${firstLetterUC(dayOfDecadeName(date))} ${dayOfMonth(date)} ${firstLetterUC(monthName(date))} an ${convertToRomanNumeral(year(date))}`
	}

	date.setHours(date.getHours() - 1);
	const tempRepDate = `${firstLetterUC(dayOfDecadeName(date))} ${dayOfMonth(date)} ${firstLetterUC(monthName(date))} an ${convertToRomanNumeral(year(date))}`;
	date.setHours(date.getHours() + 1);

	return tempRepDate;
}

function formateHour(date, option) {
    // Formatage de l'heure avec padding
    const pad = (n) => String(n).padStart(2, "0");
	let h, min, sec;

	// Calcul des valeurs
	if (option === "greg") {
		h = String(date.getHours()).padStart(2, "0");
		min = String(date.getMinutes()).padStart(2, "0");
		sec = String(date.getSeconds()).padStart(2, "0");
	} else if(option === "rep") {
		const decimalTime = (date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600) / 0.864;
		h = Math.floor(decimalTime / 10_000) % 10 // 1 heure = 100 secondes * 100 minutes
		min = Math.floor(decimalTime / 100) % 100 // 1 minute = 100 secondes
		sec = Math.floor(decimalTime) % 100
	}

    return `${option==="greg" ? pad(h) : h} h ${pad(min)} : ${pad(sec)}`;
}

// Scroll le main sans barre
function scrollMain() {
    $("nav a").removeClass("selected");

    $("main > section").each(function(index) {
        if($(this).offset().top === 0) {
            $("nav a").eq(index).addClass("selected");
        }
    });
}

// Récupération de la date en tant réel
function dateConversion(dateVar) {
	if(dateVar) {
		const dateConv=new Date(dateVar)
		if(dateConv >= new Date("0101-01-01"))refreshRepContent(dateConv,calculateRepDate(dateConv),true);
	}
}

// Récupération de l'heure en tant réel
function hourConversion(hourVar="10:10") {
	if(hourVar) {
		console.log(hourVar)
		const [h,m] = hourVar.split(":").map(Number) // 10:30 => [10,30]
		const hourConv=new Date();
		hourConv.setHours(h,m);
		console.log(hourConv)

		$(`#republicConv > .heure`).text(formateHour(hourConv, "rep"));
	}
}