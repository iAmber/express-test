define([],function() {
    var URLdata = {
        getUserData: function() {
            var userData = decodeURIComponent(location.search).replace("?", "");
            var userData_arry = userData.split("&");
            if (userData_arry.length > 0) {
                for (var i = 0; i < userData_arry.length; i++) {
                    var Varry = userData_arry[i].split("=");
                    URLdata[Varry[0]] = Varry[1];
                }

            }
        },
    };
    URLdata.getUserData();
    var from=URLdata.from;
    return URLdata;
});