define([],function() {
    $("#gotop").hide();
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $("#gotop").fadeIn(1500)
            } else {
                $("#gotop").fadeOut(1500)
            }
        });
        $("#gotop").click(function() {
            $("body,html").animate({
                scrollTop: 0
            },
            1e3);
            return false
        })
    })
});