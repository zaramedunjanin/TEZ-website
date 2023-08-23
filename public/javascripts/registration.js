$(document).ready(function(){
    $("#register").on("submit", function(event){
        event.preventDefault();

        let first_name = $("#ime").val();
        let last_name = $("#prezime").val();
        let password = $("#password").val();
        let email = $("#email").val();
        let naziv_lokacije = $("#naziv_lokacije").val();

        $.ajax({
            method: "POST",
            action: "/upload",
            url: "/register",
            contentType: "application/json",
            data: JSON.stringify({
                email: email,
                ime: first_name,
                prezime: last_name,
                password: password,
                naziv_lokacije: naziv_lokacije

            }),
            success: function (res) {
                if (res.postoji_email)
                    $("#postoji_email").show();
                else if (res.ne_postoji_lokacija)
                    $("#ne_postoji_lokacija").show();
                else
                    window.location.href = "/login";

            }
        })
    })
});

