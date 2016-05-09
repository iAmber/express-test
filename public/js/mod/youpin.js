var svn_revision = 2360;
define("youpin/backtop", [],
function() {
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
define("youpin/Y_lazyload", [],
function() { (function($) {
        $.fn.Y_lazyload = function(options) {
            var defaults = {
                event: "scroll",
                img: "img[real_src]",
                real_src: "real_src",
                animate: "",
                animate_delay: 500,
                animate_time: 1e3,
                time_out: 0
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var client_h = 0;
                if (window.innerHeight) client_h = window.innerHeight;
                else if (document.body && document.body.clientHeight) client_h = document.body.clientHeight;
                var foreach_img = function() {
                    $(options.img).each(function() {
                        var dom = $(this);
                        var offset_top = $(this).offset().top;
                        var scroll_height = client_h + $(document).scrollTop();
                        if (offset_top <= scroll_height) {
                            var find_img = false;
                            $(this).prop("src", $(this).attr(options.real_src));
                            $(this).removeAttr(options.real_src);
                            switch (options.animate) {
                            case "fadeIn":
                                $(this).css({
                                    opacity:
                                    "0"
                                }).delay(options.animate_delay).animate({
                                    opacity:
                                    "1"
                                },
                                options.animate_time);
                                break;
                            case "slideDown":
                                $(this).css({
                                    height:
                                    "0px",
                                    background: "url('.')"
                                }).delay(options.animate_delay).animate({
                                    height: $(this).height() + "px"
                                },
                                options.animate_time);
                                break;
                            default:
                                break
                            }
                            return true
                        }
                        return false
                    })
                };
                setTimeout(function() {
                    foreach_img()
                },
                options.time_out);
                $(this).bind(options.event,
                function() {
                    setTimeout(function() {
                        foreach_img()
                    },
                    options.time_out)
                })
            })
        }
    })(jQuery)
});
define("youpin/order_tan", [],
function() {
    $("#my_order").click(function() {
        $("div.tan").css("display", "block");
        $("div.zhe").css({
            width: $(window).width() + "px",
            height: $(window).height() + "px",
            display: "block"
        });
        $("div.tan").css({
            left: ($(window).width() - 800) / 2 + "px",
            top: +($(window).height() - 520) / 2 + "px",
            display: "block"
        })
    });
    $(".tan_close").click(function() {
        $("div.tan").css("display", "none");
        $("div.zhe").css("display", "none")
    })
});
define("youpin/detail_picshow", [],
function() {
    $.fn.banqh = function(can) {
        can = $.extend({
            box: null,
            pic: null,
            pnum: null,
            prev_btn: null,
            next_btn: null,
            prev: null,
            next: null,
            pop_prev: null,
            pop_next: null,
            autoplay: false,
            interTime: 5e3,
            delayTime: 800,
            pop_delayTime: 800,
            order: 0,
            picdire: true,
            mindire: true,
            min_picnum: null,
            pop_up: false,
            pop_div: null,
            pop_pic: null,
            pop_xx: null,
            mhc: null
        },
        can || {});
        var picnum = $(can.pic).find("ul li").length;
        var picw = $(can.pic).find("ul li").outerWidth(true);
        var pich = $(can.pic).find("ul li").outerHeight(true);
        var poppicw = $(can.pop_pic).find("ul li").outerWidth(true);
        var picminnum = $(can.pnum).find("ul li").length;
        var picpopnum = $(can.pop_pic).find("ul li").length;
        var picminw = $(can.pnum).find("ul li").outerWidth(true);
        var picminh = $(can.pnum).find("ul li").outerHeight(true);
        var pictime;
        var tpqhnum = 0;
        var xtqhnum = 0;
        var popnum = 0;
        $(can.pic).find("ul").width(picnum * picw).height(picnum * pich);
        $(can.pnum).find("ul").width(picminnum * picminw).height(picminnum * picminh);
        $(can.pop_pic).find("ul").width(picpopnum * poppicw);
        $(can.pnum).find("li").click(function() {
            tpqhnum = xtqhnum = $(can.pnum).find("li").index(this);
            show(tpqhnum);
            minshow(xtqhnum)
        }).eq(can.order).trigger("click");
        if (can.pop_up == true) {
            $(can.pic).find("ul li").click(function() {
                $(can.mhc).height($(document).height()).show();
                $(can.pop_div).show();
                popnum = $(this).index();
                var gdjl_w = -popnum * poppicw;
                $(can.pop_pic).find("ul").css("left", gdjl_w);
                popshow(popnum)
            });
            $(can.pop_xx).click(function() {
                $(can.mhc).hide();
                $(this).parents(".pop_up").hide()
            })
        }
        if (can.autoplay == true) {
            pictime = setInterval(function() {
                show(tpqhnum);
                minshow(tpqhnum);
                tpqhnum++;
                xtqhnum++;
                if (tpqhnum == picnum) {
                    tpqhnum = 0
                }
                if (xtqhnum == picminnum) {
                    xtqhnum = 0
                }
            },
            can.interTime);
            $(can.box).hover(function() {
                clearInterval(pictime)
            },
            function() {
                pictime = setInterval(function() {
                    show(tpqhnum);
                    minshow(tpqhnum);
                    tpqhnum++;
                    xtqhnum++;
                    if (tpqhnum == picnum) {
                        tpqhnum = 0
                    }
                    if (xtqhnum == picminnum) {
                        xtqhnum = 0
                    }
                },
                can.interTime)
            })
        }
        $(can.prev_btn).click(function() {
            if (tpqhnum == 0) {
                tpqhnum = picnum
            }
            if (xtqhnum == 0) {
                xtqhnum = picnum
            }
            xtqhnum--;
            tpqhnum--;
            show(tpqhnum);
            minshow(xtqhnum)
        });
        $(can.next_btn).click(function() {
            if (tpqhnum == picnum - 1) {
                tpqhnum = -1
            }
            if (xtqhnum == picminnum - 1) {
                xtqhnum = -1
            }
            xtqhnum++;
            minshow(xtqhnum);
            tpqhnum++;
            show(tpqhnum)
        });
        $(can.prev).click(function() {
            if (tpqhnum == 0) {
                tpqhnum = picnum
            }
            if (xtqhnum == 0) {
                xtqhnum = picnum
            }
            xtqhnum--;
            tpqhnum--;
            show(tpqhnum);
            minshow(xtqhnum)
        });
        $(can.next).click(function() {
            if (tpqhnum == picnum - 1) {
                tpqhnum = -1
            }
            if (xtqhnum == picminnum - 1) {
                xtqhnum = -1
            }
            xtqhnum++;
            minshow(xtqhnum);
            tpqhnum++;
            show(tpqhnum)
        });
        $(can.pop_prev).click(function() {
            if (popnum == 0) {
                popnum = picnum
            }
            popnum--;
            popshow(popnum)
        });
        $(can.pop_next).click(function() {
            if (popnum == picnum - 1) {
                popnum = -1
            }
            popnum++;
            popshow(popnum)
        });
        function minshow(xtqhnum) {
            var mingdjl_num = xtqhnum - can.min_picnum + 2;
            var mingdjl_w = -mingdjl_num * picminw;
            var mingdjl_h = -mingdjl_num * picminh;
            if (can.mindire == true) {
                $(can.pnum).find("ul li").css("float", "left");
                if (picminnum > can.min_picnum) {
                    if (xtqhnum < 3) {
                        mingdjl_w = 0
                    }
                    if (xtqhnum == picminnum - 1) {
                        mingdjl_w = -(mingdjl_num - 1) * picminw
                    }
                    $(can.pnum).find("ul").stop().animate({
                        left: mingdjl_w
                    },
                    can.delayTime)
                }
            } else {
                $(can.pnum).find("ul li").css("float", "none");
                if (picminnum > can.min_picnum) {
                    if (xtqhnum < 3) {
                        mingdjl_h = 0
                    }
                    if (xtqhnum == picminnum - 1) {
                        mingdjl_h = -(mingdjl_num - 1) * picminh
                    }
                    $(can.pnum).find("ul").stop().animate({
                        top: mingdjl_h
                    },
                    can.delayTime)
                }
            }
        }
        function show(tpqhnum) {
            var gdjl_w = -tpqhnum * picw;
            var gdjl_h = -tpqhnum * pich;
            if (can.picdire == true) {
                $(can.pic).find("ul li").css("float", "left");
                $(can.pic).find("ul").stop().animate({
                    left: gdjl_w
                },
                can.delayTime)
            } else {
                $(can.pic).find("ul").stop().animate({
                    top: gdjl_h
                },
                can.delayTime)
            }
            $(can.pnum).find("li").eq(tpqhnum).addClass("on").siblings(this).removeClass("on")
        }
        function popshow(popnum) {
            var gdjl_w = -popnum * poppicw;
            $(can.pop_pic).find("ul").stop().animate({
                left: gdjl_w
            },
            can.pop_delayTime)
        }
    }
});
define("youpin/fixed_top", [],
function() {
    $("#fixed_top").hide();
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 768) {
                $("#fixed_top").fadeIn(500)
            } else {
                $("#fixed_top").fadeOut(500)
            }
        })
    })
});
define("youpin/detail_flawspic", [],
function() {
    var _con = $("#demo3"),
    _prev = _con.find(".prev1"),
    _next = _con.find(".next1"),
    popnum = 0,
    picpopnum = 0,
    poppicw = _con.width();
    function popshow(popnum) {
        var gdjl_w = -popnum * poppicw;
        _con.find("ul").stop().animate({
            left: gdjl_w
        },
        400)
    }
    _prev.click(function() {
        if (popnum == 0) {
            popnum = picpopnum
        }
        popnum--;
        popshow(popnum)
    });
    _next.click(function() {
        if (popnum == picpopnum - 1) {
            popnum = -1
        }
        popnum++;
        popshow(popnum)
    });
    $(".zj_point.cb").click(function() {
        var _this = $(this),
        _picWin = $("#demo3"),
        picList = _this.find("[name=picList]").val().split("|"),
        str = "";
        _con.find("ul").css("left", 0);
        popnum = 0;
        picpopnum = picList.length;
        for (var i = 0; i < picList.length; i++) {
            str += '<li><a href="javascript:;"><img src="http://pic1.58cdn.com.cn' + picList[i] + '" width="800" height="600" alt=""></a></li>'
        }
        _picWin.find("ul").empty().append(str);
        $(".mhc").height($(document).height()).show();
        _picWin.show()
    })
});
jQuery.cookie = function(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {
            expires: 365
        };
        if (value === null) {
            value = "";
            options.expires = -1
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date;
                date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1e3)
            } else {
                date = options.expires
            }
            expires = "; expires=" + date.toUTCString()
        }
        var method = encodeURIComponent;
        if (options && options.method == escape) {
            method = escape
        }
        var path = options.path ? "; path=" + options.path: "";
        options.domain = options.domain ? options.domain: ".58.com";
        var domain = options.domain ? "; domain=" + options.domain: "";
        var secure = options.secure ? "; secure": "";
        document.cookie = [name, "=", method(value), expires, path, domain, secure].join("")
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == name + "=") {
                    var method = decodeURIComponent;
                    if (options && options.method == unescape) {
                        method = unescape
                    }
                    cookieValue = method(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    }
};
define("common/jQuery.cookie",
function() {});
define("youpin/record_channel", ["../common/jQuery.cookie"],
function(_cookie) {
    function getURLParam(name) {
        var patrn = new RegExp("(\\?|&)" + name + "=([^&]*)" + "(&|$)");
        var m = window.location.search.match(patrn);
        if (m != null) return decodeURI(m[2]);
        return null
    }
    var channel = getURLParam("channel");
    if (channel) {
        $.cookie("channel", channel, {
            path: "/"
        })
    }
});
define("youpin/footer_hover", [],
function() {
    $(".footer > span").hover(function() {
        $(this).children().show()
    },
    function() {
        $(this).children().hide()
    })
});
define("youpin/clickLog", [],
function() {
    function clickLog(type) { (new Image).src = "http://v.youpin.58.com/statistic/index?type=" + type + "&time=" + (new Date).getTime()
    }
    $(function() {
        var url = window.location.href;
        if (url.indexOf("x.shtml") > -1) {
            clickLog("D")
        } else {
            clickLog("L")
        }
    })
});
define("youpin/detail_common", ["./backtop", "./Y_lazyload", "./order_tan", "./detail_picshow", "./fixed_top", "./detail_flawspic", "./record_channel", "./footer_hover", "./clickLog"],
function() {
    $(window).Y_lazyload({
        time_out: 1e3
    });
    $("#demo1").banqh({
        box: "#demo1",
        pic: "#ban_pic1",
        pnum: "#ban_num1",
        prev_btn: "#prev_btn1",
        next_btn: "#next_btn1",
        pop_prev: "#prev2",
        pop_next: "#next2",
        prev: "#prev1",
        next: "#next1",
        pop_div: "#demo2",
        pop_pic: "#ban_pic2",
        pop_xx: ".pop_up_xx",
        mhc: ".mhc",
        autoplay: true,
        interTime: 5e3,
        delayTime: 400,
        pop_delayTime: 400,
        order: 0,
        picdire: true,
        mindire: true,
        min_picnum: 5,
        pop_up: true
    });
    $(".contenL_nav li").click(function() {
        var indexli = $(".contenL_nav li").index(this);
        $(this).addClass("pre").siblings().removeClass("pre");
        $(".contenL_nav_afterbox").children(".contentL_boxs").hide().eq(indexli).show()
    })
});
define("_pkg/youpin/youpin_common_detail", ["youpin/detail_common"],
function(youpin_detail_common) {});