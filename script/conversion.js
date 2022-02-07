var dateConv, dC;
console.log('le chien');
$("#input_date").keyup(function() {
    if ($(this).val() >= '1792-09-22') {
        dC=new Date($(this).val());
        console.log(dC.getMonth());
        dateConv=dayOfDecadeName(dC)+' '+dayOfMonth(dC)+' '+monthName(dC)+' an '+chiffreRomain(year(dC));
        console.log(dateConv);
        
        $('#conversion span').html('(an '+year(dC)+')')
        $(".dateC").html(firstLetterUC(dateConv));
        $(".jourC").html(firstLetterUC(dayOfYearName(dC)));      

        dC.getSeconds()<10 ? sec="0"+dC.getSeconds() : sec=dC.getSeconds();
        dC.getMinutes()<10 ? min="0"+dC.getMinutes() : min=dC.getMinutes();
        dC.getHours()<10 ? h="0"+dC.getHours() : h=dC.getHours();
        horaire=h+" h "+min+" : "+sec;

        now=(dC.getSeconds()+dC.getMinutes()*60+dC.getHours()*3600)*(1/0.864);
        heure=Math.floor(now/(100*100)) % 10
        minute=Math.floor(now/100) % 100
        seconde=Math.floor(now) % 100

        heure < 10 ? heure="0"+heure : heure=heure
        minute < 10 ? minute="0"+minute : minute=minute
        seconde < 10 ? seconde="0"+seconde : seconde=seconde
        horDec=heure+" h "+minute+" : "+seconde;
        console.log(horaire)
        console.log(horDec)

        $(".hC").html(horDec);   
    }
})
