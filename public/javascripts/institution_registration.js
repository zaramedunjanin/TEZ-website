$(document).ready(function(){
    $("#regI").on("submit", function(event){
        event.preventDefault();

        let naziv = $("#naziv").val();
        let adresa = $("#adresa").val();
        let broj_tel = $("#broj_tel").val();
        let opis = $("#opis").val();
        let slika = $("#slika");
        const reader = new FileReader()

        if(slika[0].files[0] != null) {
            reader.addEventListener("load", () => {
                    $.ajax({
                        method: "POST",
                        action: "/upload",
                        url: "/registerInstitution",
                        contentType: "application/json",
                        data: JSON.stringify({
                            naziv: naziv,
                            adresa: adresa,
                            broj_tel: broj_tel,
                            opis: opis,
                            slika: reader.result
                        }),
                        success: function (res) {
                            if (res.mogu)
                                window.location.href = "/login";
                            else
                                $("#postoji_institucija").show();
                        }
                    })
            })
        }else{
            $.ajax({
                method: "POST",
                action: "/upload",
                url: "/registerInstitution",
                contentType: "application/json",
                data: JSON.stringify({
                    naziv: naziv,
                    adresa: adresa,
                    broj_tel: broj_tel,
                    opis: opis,
                    slika: reader.result
                }),
                success: function (res) {
                    window.location.href = "/login";
                }
            })
        }
        if(slika[0].files[0] != null)
            reader.readAsDataURL(slika[0].files[0]);
    })

});

