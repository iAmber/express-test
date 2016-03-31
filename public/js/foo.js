//bar.js

$(function(){
	WBAPP.setTitle("卖家秘籍");
	var el = {
		edit:$("#edit"),
		refresh:$("#refresh"),
		again:$("#again")
	};
	$.tool = function() {};
	$.ui=function(){};
	$.ui.bindTouchGoto = function(arr, gotofun, hoverstyle) {
        var x_ismove, x_finger;
        arr.each(function(index, ele) {
            $(ele).bind("touchstart", function(e) {
                x_ismove = false;
                x_finger = e.touches.length;
                hoverstyle ? $(this).addClass(hoverstyle) : "";
                e.stopPropagation()
            }).bind("touchmove", function(e) {
                x_ismove = true;
                hoverstyle ? $(this).removeClass(hoverstyle) : "";
                e.stopPropagation()
            }).bind("touchend", function(e) {
                hoverstyle ? $(this).removeClass(hoverstyle) : "";
                if (x_ismove || x_finger > 1) {
                    e.stopPropagation();
                    return
                }
                e.stopPropagation();
                if (typeof gotofun == "function") {
                    gotofun(e, $(this), index)
                }
            })
        })
    };
    $.tool.getppu = function() {
        var ppu = "";
        if (typeof WBAPP._cookie("get","PPU",false) == "string") {
            ppu = WBAPP._cookie("get","PPU",false)
        }
        return ppu
    };
	$.tool.refreshInfo = function(arr) {
		var _is6 = false;
        if (WBAPP.appVersion >= "6.0.0.0" || WBAPP.appVersion >= "6.0.0") {
            _is6 = true;
        }
        var btn_refresh = arr;
        $.ui.bindTouchGoto(btn_refresh, function(e, obj, index) {
            var par_li = $(obj).closest("ul");
            var infoid = par_li.attr("infoid");
            if (par_li.hasClass("hover")) {
                par_li.removeClass("hover")
            }
            var url_step1 = "http://app.58.com/app/refresh/step1?callback=?";
            var sendajaxrecharge = function(tiptextold, tiptextnew) {
                if (WBAPP.appVersion >= "5.5") {
                    WBAPP.showDialog("pay", "提示",tiptextnew, "dialogcallback","充值并刷新", "取消");
                    function dialogcallback(index) {
                        if (index == 0) {
                            $.ajax({
                                type: "get",
                                url: url_step1,
                                data: {
                                    "infoid": infoid,
                                    "PPU": $.tool.getppu()
                                },
                                success: function(data) {
                                    var data_json = JSON.parse(data);
                                    if (typeof data_json == "object") {
                                        if (data_json.hasOwnProperty("islogin") && data_json.islogin === false) {
                                            window.location.href = "http://my.58.com/app/login";
                                            return
                                        }
                                        var code = data_json.code;
                                        var balance = parseFloat(data_json.balance);
                                        var unitprice = parseFloat(data_json.unitprice);
                                        var status = data_json.status;
                                        if (status == "true") {
                                            switch (code) {
                                            case "5":
                                            case "7":
                                                perform_refresh(false);
                                                break;
                                            case "2":
                                                sendajaxrecharge("该信息部分内容不符合规范,不能使用免费刷新。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "该信息部分内容不符合规范,不能使用免费刷新。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。");
                                                break;
                                            case "4":
                                                sendajaxrecharge("已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。");
                                                break;
                                            case "6":
                                                sendajaxrecharge("商家送刷新活动已结束。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。");
                                                break;
                                            case "8":
                                            case "9":
                                                sendajaxrecharge("今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。");
                                                break
                                            }
                                        } else {
                                            if (status == "false") {
                                                WBAPP.toastMsg("该帖不支持刷新。")
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    WBAPP.setWebLog("dialog","recharge58","5", []);
                } else {
                    WBAPP.showDialog("single","提示", tiptextold, "","确定")
                }
            };
            var sendajaxrecharge2 = function(tiptextold, tiptextnew) {
                WBAPP.showDialog("single","提示", tiptextold, "","确定");
            };
            $.ajax({
                type: "get",
                url: url_step1,
                data: {
                    "infoid": infoid,
                    "PPU": $.tool.getppu()
                },
                dataType:"jsonp",
                success: function(data) {
                    var data_json = data;
                    if (typeof data_json == "object") {
                        if (data_json.hasOwnProperty("islogin") && data_json.islogin ===false) {
                            window.location.href = "http://my.58.com/app/login";
                            return
                        }
                        var code = data_json.code;
                        var balance = parseFloat(data_json.balance);
                        var unitprice = parseFloat(data_json.unitprice);
                        var status = data_json.status;
                        if (status == "true") {
                            switch (code) {
                            case "1":
                                WBAPP.showDialog("double", "提示","该信息部分内容不符合规范,不能使用免费刷新。本次刷新将扣除推广余额" + unitprice + "元，是否刷新该信息？(您的推广余额为" + balance + "元)","dialog_refresh", "刷新", "取消");
                                function dialog_refresh(index) {
                                    if (index == 0) {
                                        perform_refresh(true)
                                    }
                                }
                                break;
                            case "2":
                                if (navigator.userAgent.indexOf("Android") > -1) {
                                    sendajaxrecharge("该信息部分内容不符合规范,不能使用免费刷新。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "该信息部分内容不符合规范,不能使用免费刷新。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。")
                                } else {
                                    sendajaxrecharge2("该信息部分内容不符合规范,不能使用免费刷新。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。", "该信息部分内容不符合规范,不能使用免费刷新。本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。")
                                }
                                break;
                            case "3":
                                WBAPP.showDialog("double", "提示","已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新将扣除推广余额" + unitprice + "元，是否刷新该信息？(您的推广余额为" + balance + "元)","dialog_refresh","刷新", "取消");
                                function dialog_refresh(index) {
                                    if (index == 0) {
                                        perform_refresh(false)
                                    }
                                }
                                break;
                            case "4":
                                if (navigator.userAgent.indexOf("Android") > -1) {
                                    sendajaxrecharge("已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。")
                                } else {
                                    sendajaxrecharge2("已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。", "已经有超过500人浏览过该条信息，不能再使用免费刷新啦~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。")
                                }
                                break;
                            case "5":
                                goRefreshBuyPage(infoid);
                                break;
                            case "6":
                                if (navigator.userAgent.indexOf("Android") > -1) {
                                    sendajaxrecharge("本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。")
                                } else {
                                    sendajaxrecharge2("本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。", "本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。")
                                }
                                break;
                            case "7":
                                goRefreshBuyPage(infoid);
                                break;
                            case "8":
                                if (WBAPP.appVersion >= "5.5") {
                                    if (navigator.userAgent.indexOf("Android") > -1) {
                                        sendajaxrecharge("今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。")
                                    } else {
                                        sendajaxrecharge2("今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。")
                                    }
                                } else {
                                    if (navigator.userAgent.indexOf("Android") > -1) {
                                        WBAPP.showDialog("double","提示", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值,需要定时提醒您刷新吗?","dialog_refresh", "去设置", "取消");
                                        function dialog_refresh(index) {
                                            if (index == 0) {
                                                var param = {
                                                    "action": "remind_refresh"
                                                };
                                                WBAPP._nativeBridge(param)
                                            }
                                        }
                                    } else {
                                        WBAPP.showDialog("double","提示", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。,需要定时提醒您刷新吗?","dialog_refresh", "去设置", "取消");
                                        function dialog_refresh(index) {
                                            if (index == 0) {
                                                var param = {
                                                    "action": "remind_refresh"
                                                };
                                                WBAPP._nativeBridge(param)
                                            }
                                        }
                                    }
                                }
                                break;
                            case "9":
                                if (navigator.userAgent.indexOf("Android") > -1) {
                                    sendajaxrecharge("今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请用5.5以上版本客户端进行充值。", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。")
                                } else {
                                    sendajaxrecharge2("今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。", "今天的免费刷新已经用光了~本次刷新需要支付" + unitprice + "元,您的账号余额为" + balance + "元。请到网页版充值购买。")
                                }
                                break;
                            case "10":
                                WBAPP.showDialog("double","提示", "本次刷新免费，是否刷新该信息？", "dialog_refresh","刷新", "取消");
                                function dialog_refresh(index) {
                                    if (index == 0) {
                                        perform_refresh(true)
                                    }
                                }
                                break
                            }
                        } else {
                            if (status == "false") {
                                WBAPP.toastMsg("该帖不支持刷新。")
                            }
                        }
                    }
                },
                error: function() {
                    WBAPP.toggleLoadingBar("hide", "请求中，请稍等...", "block");
                    WBAPP.toastMsg("网络异常，请重新操作试试。")
                }
            });
            function perform_refresh(isfree) {
                var _is6 = false;
                if (WBAPP.appVersion >= "6.0.0.0" || WBAPP.appVersion >= "6.0.0") {
                    _is6 = true
                }
                WBAPP.toggleLoadingBar("show", "正在刷新中...", "block");
                var url_step2 = "http://app.58.com/app/refresh/step2?callback=?";
                $.ajax({
                    type: "get",
                    url: url_step2,
                    data: {
                        "infoid": infoid,
                        "PPU": $.tool.getppu(),
                        "isfree": isfree

                    },
                    success: function(data2) {
                        WBAPP.toggleLoadingBar("hide", "正在刷新中...", "block");
                        var data_json2 = JSON.parse(data2);
                        if (typeof data_json2 == "object") {
                            if (data_json.hasOwnProperty("islogin") && data_json.islogin === false) {
                                window.location.href = "http://my.58.com/app/login";
                                return
                            }
                            var status2 = data_json2.status;
                            var vflag2 = parseInt(data_json2.vflag);
                            if (status2 == "true") {
                                if (!!vflag2) {
                                    WBAPP.showDialog("double", "提示","刷新成功！需要定时提醒您刷新吗?", "dialog_refresh","去设置", "取消");
                                    function dialog_refresh(index) {
                                        if (index == 0) {
                                            var param = {
                                                "action": "remind_refresh"
                                            };
                                            WBAPP._nativeBridge(param)
                                        }
                                    }
                                } else {
                                    WBAPP.showDialog("single", "提示","刷新成功！","", "确定")
                                }
                            } else {
                                WBAPP.showDialog("single", "提示","刷新失败，请稍后重试！", "","确定")
                            }
                        }
                    },
                    error: function() {
                        WBAPP.toggleLoadingBar("hide", "请求中，请稍等...", "block");
                        WBAPP.toastMsg("网络异常，请重新操作试试。")
                    }
                })
            }
            function goRefreshBuyPage(infoid) {
                WBAPP.loadPage("link", "http://refresh.vip.58.com/app/refresh/" + infoid + "?source=2&systemName=ios", "购买刷新", false)
            }
        }, "btnhover1")
	}
	$.tool.refreshInfo_v2 = function(arr) {
		var _is6 = false;
	    if (WBAPP.appVersion >= "6.0.0.0" || WBAPP.appVersion >= "6.0.0") {
            _is6 = true;
        }
	    var btn_refresh = arr;
	    $.ui.bindTouchGoto(btn_refresh, function(e, obj, index) {
	        var par_li = $(obj).closest("ul");
	        var infoid = par_li.attr("infoid");
	        var isError = false;
	        if (par_li.hasClass("hover")) {
	            par_li.removeClass("hover")
	        }
	        $.ajax({
	            type: "get",
	            url: "http://refresh.vip.58.com/app/refreshstate/" + infoid + "?callback=?",
	            data: {
	                "PPU": $.tool.getppu(),
	                "source": 2
	            },
	            datatype: "jsonp",
	            success: function(data) {
	                var _msg = data.msg;
	                isError = data.errorCode < 0 ? true : false;
	                if (isError) {
	                    WBAPP.showDialog("single", "提示",_msg,"", "确定")
	                } else {
	                    switch (data.bizCode) {
	                    case "1":
	                        WBAPP.showDialog("double", "提示","本次刷新免费，是否刷新该信息？","dialogcallback", "刷新", "取消");
							function dialogcallback(index) {
	                            if (index == 0) {
	                                perform_refresh(true)
	                            }
	                        }
	                        break;
	                    case "2":
	                    case "3":
	                        goRefreshBuyPage(infoid);
	                        break;
	                    default:
	                        WBAPP.toastMsg("刷新状态异常。")
	                    }
	                }
	            },
	            error: function() {
	                WBAPP.toggleLoadingBar("hide", "请求中，请稍等...", "block");
	                WBAPP.toastMsg("网络异常，请重新操作试试。")
	            }
	        });
	        function perform_refresh(isfree) {
	            var _is6 = false;
	            if (WBAPP.appVersion >= "6.0.0.0" || WBAPP.appVersion >= "6.0.0") {
	                _is6 = true
	            }
	            WBAPP.toggleLoadingBar("show", "正在刷新中...", "block");
	            var url_step2 = "http://app.58.com/app/refresh/step2?callback=?";
	            $.ajax({
	                type: "get",
	                url: url_step2,
	                data: {
	                    "infoid": infoid,
	                    "PPU": $.tool.getppu(),
	                    "isfree": isfree
	                },
	                success: function(data2) {
	                    WBAPP.toggleLoadingBar("hide", "正在刷新中...", "block");
	                    var data_json2 = data2;
	                    if (typeof data_json2 == "object") {
	                        if (data_json.hasOwnProperty("islogin") && data_json.islogin ===false) {
	                            window.location.href = "http://my.58.com/app/login";
	                            return
	                        }
	                        var status2 = data_json2.status;
	                        var vflag2 = parseInt(data_json2.vflag);
	                        if (status2 == "true") {
	                            if (!!vflag2) {
	                                WBAPP.showDialog("double", "提示","刷新成功！需要定时提醒您刷新吗?", "dialog_refresh","去设置", "取消");
	                                function dialog_refresh(index) {
	                                    if (index == 0) {
	                                        var param = {
	                                            "action": "remind_refresh"
	                                        };
	                                        WBAPP._nativeBridge(param)
	                                    }
	                                }
	                            } else {
	                                WBAPP.showDialog("single", "提示","刷新成功！" , "","确定");
	                            }
	                        } else {
	                            WBAPP.showDialog("single", "提示","刷新失败，请稍后重试！", "","确定")
	                        }
	                    }
	                },
	                error: function() {
	                    WBAPP.toggleLoadingBar("hide", "请求中，请稍等...", "block");
	                    WBAPP.toastMsg("网络异常，请重新操作试试。")
	                }
	            })
	        }
	        function goRefreshBuyPage(infoid) {
	            WBAPP.loadPage("link", "http://refresh.vip.58.com/app/refresh/" + infoid + "?source=2&systemName=android", "购买刷新", false)
	        }
	    }, "btnhover1")
	};

	el.edit.on('click',function(){
		var obj=$(this);
		var par_li = obj.closest("ul");
    	var infoid = par_li.attr("infoid");
    	var edit_url="http://p.webapp.58.com/update/"+infoid;
    	WBAPP.loadPage("publish", edit_url, "修改信息",true, false, false, "hide", false, true, false);
	});
	el.again.on('click',function(){
		var obj=$(this);
		var par_li = obj.closest("ul");
    	var infoid = par_li.attr("infoid");
     	var again_url="http://p.webapp.58.com/1/5/s5?guide=true";
     	WBAPP.getPosition("getPosCallback");
		function getPosCallback(lon, lat, source){
		    WBAPP.toastMsg(lon + "  " + lat + "  " + source);
		}
     	WBAPP.loadPage("publish", again_url, "二手物品",true, false, false, "hide", false, true, false);
	})
	if (navigator.userAgent.indexOf("Android") > -1) {
        $.tool.refreshInfo_v2($(".des_refresh"))
    } else {
        $.tool.refreshInfo($(".des_refresh"))
    }
})
	