define([],function(){
    function MdiaoqiZZ(){ }
    MdiaoqiZZ.prototype = {
        hasApp: true,
        init: function(openType, id,down,caller) {
            var ptype=URLdata.from;
            var __this = this;
            if ($.os.ios) {
                clickLog('from=zzdqm-ios&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '')
                this.downIOS(openType, id)
            } else {
                clickLog('from=zzdqm-android&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '') 
                this.downAndriod(openType, id)
            }
            setTimeout(function() {
                if (!__this.hasApp) {
                    if(down==true){
                        if ($.os.ios) {
                            window.location.href = "https://itunes.apple.com/cn/app/id1002355194";
                        }else{
                             locationNative = websiteConf.url_android;
                             if($(caller).hasClass('seeAll')){
                                if(ptype=="ganjim" || ptype=="gjmesban"){
                                   locationNative = locationNative.replace(/[^_]*(.apk$)/,"991.apk")
                                }else{
                                   //58M
                                   locationNative = locationNative.replace(/[^_]*(.apk$)/,"990.apk")
                                }
                             }
                            window.location.href = locationNative;
                        }
                    }else{
                        if(ptype!=undefined && ptype != ''){
                            if(ptype=="ganjim"){
                                var _from = "gjmeslistqrzz";
                            }else if(ptype=="gjmesban"){
                                var _from = "gjmesindexban";
                            }else{
                                var _from = "detail";
                            };
                            window.location.href = _webHost+"/Mzhuanzhuan/listing/detail_hb.html?from="+_from+"&infoId="+URLdata.infoId+"&ptype="+ptype;
                        }else{
                            var _from="Mhbdownload";
                            window.location.href = _webHost+"/Mzhuanzhuan/listing/detail_hb.html?from="+_from+"&infoId="+URLdata.infoId+"&ptype="+ptype;
                        }
                    }
                }else{
                    console.log("hasApp  erro");
                }
            },
            1000);

        },
        downIOS: function(openType, id) {
            var timeout, t1;
            var ifr = document.createElement("iframe");
            if (Boolean(navigator.userAgent.match(/OS [9]_\d[_\d]* like Mac OS X/i))) {
                t1 = Date.now();
                window.location.href = "zhuanZhuanMStart://?openType=" + openType + "&id=" + id
            } else {
                if (openType == undefined || id == undefined) {
                    t1 = Date.now();
                    ifr.setAttribute("src", "zhuanZhuanMStart://")
                } else {
                    t1 = Date.now();
                    ifr.setAttribute("src", "zhuanZhuanMStart://?openType=" + openType + "&id=" + id)
                }
                ifr.setAttribute("style", "display:none");
                document.body.appendChild(ifr)
            }
            var _this = this;
            timeout = setTimeout(function() {
                _this.try_to_open_app(t1);
            },
            600);
            return false
        },
        downAndriod: function(openType, id) {
            var timeout, t1;
            var ifr = document.createElement("iframe");
            if (openType == undefined || id == undefined) {
                t1 = Date.now();
                ifr.setAttribute("src", "zhuanzhuan://");
            } else {
                t1 = Date.now();
                ifr.setAttribute("src", "zhuanzhuan://?openType=" + openType + "&id=" + id)
            }
            ifr.setAttribute("style", "display:none");
            document.body.appendChild(ifr);
            var _this = this;
            timeout = setTimeout(function() {
                _this.try_to_open_app(t1);
            },
            600);
            return false
        },
        try_to_open_app: function(t1) {
            var t2 = Date.now();
            if (!t1 || t2 - t1 < 800) {
                this.hasApp = false;
            }
        }
    }
    MdiaoqiZZ.prototype.constructor = MdiaoqiZZ;
    return MdiaoqiZZ;
});