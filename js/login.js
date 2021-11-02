$(function () {
    var username;
    var password;
    $(".login100-form-btn").click(function () {
        username = $("#username").val();
        password = $("#password").val();
        console.log("username:" + username);

        vaildusername(username);
    })

    function vaildusername(username) {
        if (username == "admin" && password == "123") {
            window.location.href = "experIndex.html"
        } else {
            var input = $('.validate-input .input100');
            var thisAlert = $(input).parent();
            $(thisAlert).addClass('alert-validate');
        }
    }

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})