define('./diaoqiZZ',[],function(){
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
/*
    comment: images lazyload模块
*/
define('./lazyload',[], function() {
    function LazyLoad(setele) {
        this.setele = setele;
        this.imagArr = Array.prototype.slice.call(setele.find('img'));
    }
    LazyLoad.prototype = {
        init: function() {
            var _this = this;
            _this.showimg();
            $(window).on('resize', function(event) {
                _this.showimg();
            });

            $(window).on('scroll', function() {
                _this.showimg();
            });
        },
        showimg: function() {
            var _this = this;
            _this.imagArr.map(function(el, index) {
                if (_this.elementInViewport(el)) {
                    _this.imagArr.splice(index, 0);
                    _this.setsrc(el);
                }
            });
        },

        // 判断元素是否存在视口里
        elementInViewport: function(el) {
            var rect = el.getBoundingClientRect();
            var offsetH = window.innerHeight*2 || document.documentElement.clientHeight*2; // 乘以2提前加载下一屏
            return rect.top >= 0 && rect.top <= offsetH;
        },

        setsrc: function(el) {
            var _this = this;
            var src = "";
            var el = $(el);
            if (el.attr('rel') !== '') {
                src = el.attr('rel');
                var img = new Image();
                img.src = src;
                el.attr('src', src);
                el.attr('rel', '');
                console.info('LazyLoad------' + src);
                _this.adjustImg(img, el);
            }
        },

        // 调整图片大小
        adjustImg: function(img, el) {
            if (el.parents('[data-adjust="adjust"]').length > 0 || el.attr('data-adjust') == "adjust") {
                // console.log('------------adjustImg-----------');
                $(img).on('load', function(e) {
                    var target = e.target;
                    var imgW = target.width;
                    var imgH = target.height;
                    var parentW = el.parent().width();
                    var parentH = el.parent().height();

                    if (imgW >= imgH) {

                        var ratio = parentH / imgH;
                        var newW = ratio * imgW;
                        var offsetLeft = -Math.abs(newW - parentW) / 2 + 'px';
                        el.css({
                            "height": "100%",
                            "width": "auto",
                            "left": offsetLeft
                        });
                    }else if(imgW == imgH) {
                        var ratio = parentH / imgH;
                        var newW = ratio * imgW;
                        var offsetLeft = -Math.abs(newW - parentW) / 2 + 'px';
                        if(newW>parentW){
                            el.css({
                                "width": "100%",
                            });
                        }else{
                            el.css({
                                "height": "100%",
                            });
                        }
                        
                    }else {
                        var ratio = parentW / imgW;
                        var newH = ratio * imgH;
                        var offsetTop = -Math.abs(newH - parentH) / 2 + 'px';
                        el.css({
                            "width": "100%",
                            "height": "auto",
                            "top": offsetTop
                        });
                    }

                    // console.log('-------------img info--------------')
                    // console.log(img.src);
                    // console.log("style:"+el.attr('style'))
                    // console.log("height:"+el.height());
                    // console.log("width:"+el.width())
                });
            }

        }
    };

    LazyLoad.prototype.constructor = LazyLoad;

    return LazyLoad;
});

define('./backtop',[],function() {
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
// 转转 pc 详情页 接口以及页面地址配置

define('../common/config',[], function() {
    
    return {
        /**
         * online
         */
        
        // server api on zhuanzhuan.58.com
        spInfoAPI:'http://zhuanzhuan.58.com/zz/transfer/getInfoById', // 获取详情页头部商品信息
        moreInfoAPI:'http://zhuanzhuan.58.com/zz/transfer/getMlistingDetailRecommendInfos',  // 获取更多宝贝

        liuyanInfoAPI:'http://zhuanzhuan.58.com/zz/transfer/getInfoComments',  // 获取卖家留言
        personnalAPI:'http://zhuanzhuan.58.com/zz/transfer/query',  // 获取个人中心
        personalListAPI:'http://zhuanzhuan.58.com/zz/transfer/getInfosByUserId',  // 获取个人中心列表

        // default datas
        headerIcon:'http://img.58cdn.com.cn/zhuanzhuanftp/images/default_head_icon.png',  // 默认头像
        downloadUrl:'http://m.zhuanzhuan.58.com/Mzhuanzhuan/zzWebInfo/zz58/zzpc/58hb_ld.html'



        /**
         * offline
         */
        // server api on web.zhuanzhuan.58v5
        
        // spInfoAPI：'http://web.zhuanzhuan.58v5/zz/transfer/getInfoById'// 获取详情页头部商品信息
        //moreInfoAPI: 'http://web.zhuanzhuan.58v5/zz/transfer/getMlistingDetailRecommendInfos',  // 获取更多宝贝
        // liuyanInfoAPI: 'http://web.zhuanzhuan.58v5/zz/transfer/getInfoComments',  // 获取卖家留言
        // personnalAPI: 'http://web.zhuanzhuan.58v5/zz/transfer/getInfosByUserId',  // 获取个人中心
        // personalListAPI: 'http://web.zhuanzhuan.58v5/zz/transfer/getInfosByUserId',  // 获取个人中心列表
    
    }
});

define('./tank',['../common/config'],function(config) {
    var tank={
        tankShow:function(){
            console.log(__global4fe.firstLoad);
            // if(__global4fe.firstLoad){ 
            //     __global4fe.firstLoad = false;
            //     var downloadUrl=config.downloadUrl;
            //     var downloadUrlStr=downloadUrl+'?infoId='+__global4fe.infoId+__global4fe.afterSearch;
            //     console.log(downloadUrlStr);
            //     $("#diver_erweima").qrcode({
            //           render: "table", //table方式
            //           width: 200,  // 生成二维码的宽度 
            //           height:200,  // 生成二维码的高度
            //           correctLevel:1 , // 二维码对齐
            //           text: 'http://m.zhuanzhuan.58.com/Mzhuanzhuan/zzWebInfo/zz58/zzpc/detailPc_luodi.html?infoId=669435826538840067&zzfrom=58web&zhuanzhuanSourceFrom=715',  // 二维码路径
            //           //text:downloadUrlStr,  // 二维码路径
            //     });
            //     $('#diver_erweima td').css({'padding':0, 'border':'none'});  // 二维码中td去掉默认属性
            // };
            if(__global4fe.firstLoad){ 
                __global4fe.firstLoad = false;
                var downloadUrl=config.downloadUrl;
                if(__global4fe.zzfrom){
                    if(__global4fe.zzfrom == "ganjiweb"){
                        downloadUrl += "?zzqdFrom=ganjiPC_tohb";
                    }else{
                        downloadUrl += "?zzqdFrom=58PC_tohb";
                    }
                }
                var downloadUrlStr=downloadUrl+'&infoId='+__global4fe.infoId+"&"+__global4fe.afterSearch;
                var downloadUrlStrCode=encodeURIComponent(downloadUrlStr);
                var erweima_api='http://api.vip.58.com/genqrcode?size=200x200&margin=0&content='
                var apiUrl=erweima_api+downloadUrlStr;
                console.log("downloadUrlStr"+downloadUrlStr);
                console.log("apiUrl="+apiUrl);
                var erweimaImg='<img class="left" src="'+erweima_api+downloadUrlStrCode+'" alt=""/>';
                $("#diver_erweima").append(erweimaImg)
                
            };
            if(__global4fe.tankWord&&__global4fe.tankWord!==""&&__global4fe.tankWord!==undefined){
                $(".tan_p").text(__global4fe.tankWord);
                $(".tan_title").text(__global4fe.tankTitle);
                $(".tan_PP").text(__global4fe.tankP);
                $(".tan_close").attr('onclick','clickLog(\''+__global4fe.clickClose+'\')')
                //alert(__global4fe.tankAddClass);
            };
            $("div.tan").css("display", "block");
            $("div.zhe").css({
                width: $(window).width() + "px",
                height: $(window).height() + "px",
                display: "block"
            });
            $("div.tan").css({
                display: "block"
            });

        },
        erweima:function(){
            $("#fix_erweima").slideToggle(1000);
            $(".footer_bg").slideToggle(1000,function(){
                console.log("二维码展示");
            }); 
            
        }    
    } 
    return tank;
});
define('../common/util',[], function() {
    var util = {
        /**
         * 渲染方法
         * @param  {DOM}        container        需要添加html结果的包含元素
         * @param  {DOM}        fragment         html 片段
         * @param  {Boolean}    isappend         true 为添加，false为替换
         * @param  {Function}   callback         回调
         */
        render: function(container, fragment, isappend, callback) {
            if (container) {
                if (isappend) { //添加还是替换 false 为替换
                    $(container).append(fragment);
                } else {
                    container.html(fragment);
                }
                if (typeof callback == 'function') {
                    callback();
                }
            }
        },
        // 获取 URL search
        getSearch: function() {
            var search = location.search;
            if (!search) {
                return false;
            }
            search = search.substr(1, search.length - 1);
            var searchArr = search.split('&');
            return searchArr; //Array
        },
        // 图片加载策略
        imgLoad: function(selector) {

            if (selector) { //局部替换
                var imgList = $(selector + ' img');
            } else {
                var imgList = $('img');
            }

            if (imgList.length > 0) {
                imgList.map(function(index, item) {
                    var src = $(item).attr('data-src');
                    var img = new Image();
                    img.src = src;

                    img.onload = function() {
                        item.src = src;
                        $(item).attr('data-src', '');
                    };
                })
            }

        },
        /**
         * 设置图片尺寸，为了向图片服务器请求一定规格大小的图片
         * @param {String || Array}     picUrl 图片路径，可以为单独的字符串或者是字符串数组
         * @param {Number}              width  请求的宽度
         * @param {Number}              height 请求的高度
         */
        setPicSize: function(picUrl, width, height) {
            var typeofWidth = typeof width;
            var typeofHeight = typeof height;
            if (!picUrl || (typeofWidth !== 'string' && typeofWidth !== 'number') || (typeofHeight !== 'string' && typeofWidth !== 'number')) {
                return false;
            }

            var reg = /\.(jpg$|jpeg$|gif$|png$|bmp$|pic$)/i;

            var make = function(url, width, height) {
                var matchRule = /_\d+_\d+(\.png$|\.jpg$|\.gif$|\.jpeg$|\.bmp$|\.pic$)/i; //匹配路径后边是否是 (xxx_数字_数字.图片拓展名)
                var size = '_' + width + '_' + height;

                if (matchRule.test(url) && util.hasProtocol(url)) { // 改变已有尺寸
                    var suffix = matchRule.exec(url)[1]; // 获取图片拓展名
                    return url.replace(matchRule, size + suffix);
                } else { // 添加新尺寸
                    if (!util.hasProtocol(url)) {
                        var suffix = reg.exec(url)[0];
                        var prefix = url.split(suffix)[0];
                        prefix = 'http://pic' + util.getPicCdn() + '.58cdn.com.cn/zhuanzh/' + prefix;
                        // prefix = 'http://pic' + util.getPicCdn() + '.58cdn.com.cn/' + prefix;
                        return prefix + size + suffix;
                    } else {
                        return url;
                    }
                }
            }; // end make

            if (picUrl instanceof Array) {
                var newPicArr = [];
                picUrl.map(function(item, index) {
                    if (!!item) {
                        if (reg.test(item)) {
                            newPicArr.push(make(item, width, height));
                        }
                    }

                });
                if (newPicArr.length > 0) {
                    return newPicArr;
                };
                return false;
            } else if (typeof picUrl == 'string') {
                if (reg.test(picUrl)) {
                    return make(picUrl, width, height);
                }
                return false;
            }

            return false;
        },
        // 判断URL是否具有 http|https|ftp 协议头
        hasProtocol: function(url) {
            var reg = /^http:\/\/|^https:\/\/|^ftp:\/\//i;
            return reg.test(url);
        },

        // pic1-pic8 图片服务器的随机分配, 分配不成功默认分配 pic4
        getPicCdn: function(uid) {
            if (!uid) {
                return parseInt((Math.random() * 10000) % 8) + 1;
            } else {
                uid = Number(uid);
                if (!uid) {
                    return 4; //uid错误
                }
                return parseInt(uid % 8) + 1;
            }
        },

        // 设置长字符长度，超出加省略号
        setLongStr: function(str, len, flag) {
            if (!str) {
                return '';
            }
            var longStr = '';
            len = !len ? 40 : len;
            if (str instanceof Array) {
                str.map(function(item, index) {
                    if (!flag) {
                        longStr += item;
                    } else {
                        longStr += (flag + item);
                    }
                });
            } else if (typeof str == 'string') {
                longStr = str;
            } else {
                return '';
            }

            longStr = longStr.length > len ? (longStr.substr(0, len) + '...') : longStr;
            return longStr;
        },

        // 提供Native调用传送cookie 并设置 cookie，sessionid 没用
        setCookie4FE: function(sessionid, cookie) {
            cookie = util.utf8to16(util.base64decode(cookie));
            var cookieArr = cookie.split(';');
            cookieArr.map(function(item) {
                if (!!item) {
                    document.cookie = item;
                }
            });
        },

        //获取当前移动终端操作系统
        getPlatform: function() {
            if (/android/i.test(navigator.userAgent)) {
                return "android"
            } else if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                return "ios"
            } else {
                return "other"
            }
        },

        base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        base64DecodeChars: new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),

        /**
         * base64编码
         * @param {Object} str
         */
        base64encode: function(str) {
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += util.base64EncodeChars.charAt(c1 >> 2);
                    out += util.base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += util.base64EncodeChars.charAt(c1 >> 2);
                    out += util.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += util.base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += util.base64EncodeChars.charAt(c1 >> 2);
                out += util.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += util.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += util.base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
        /**
         * base64解码
         * @param {Object} str
         */
        base64decode: function(str) {
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = util.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                /* c2 */
                do {
                    c2 = util.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = util.base64DecodeChars[c3];
                }
                while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = util.base64DecodeChars[c4];
                }
                while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },
        /**
         * utf16转utf8
         * @param {Object} str
         */
        utf16to8: function(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else
                if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
        /**
         * utf8转utf16
         * @param {Object} str
         */
        utf8to16: function(str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx 10xx xxxx
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx10xx xxxx10xx xxxx
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        },

        // 对html标签转义
        escapeHtml: function(htmlStr) {
            if (!htmlStr) {
                return htmlStr;
            }
            return htmlStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },

        // 万元以上取万为单位
        parseMillion: function(data, baseNum) {
            data = parseFloat(data).toFixed(2);
            baseNum = baseNum || 10000;

            if (!data || !Number(baseNum)) {
                return false;
            }

            if (data >= baseNum) {
                return (data / baseNum).toFixed(2) + 'W';
            } else {
                return Number(data);
            }
        },
        // 对段落转义
        replaceAll : function(text,reallyDo, replaceWith, ignoreCase) { 
            if (!RegExp.prototype.isPrototypeOf(reallyDo)) { 
                return text.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith); 
            } else { 
                return text.replace(reallyDo, replaceWith); 
            } 
        } 


    }; // end util

    window.setCookie4FE = util.setCookie4FE; //暴露给Native调用

    return util;
})
;

define('../common/exceptionTip',[], function() {
    var exceptionTip = {
        noData: function() {
            $('#fail').css('margin-top', '10%');
            $('#fail img').attr('src', 'img/wujieguo@2x.png');
            // $('#fail p').html('没有可展示的宝贝，怪我喽~');
            $('#fail p').html('没有可展示的宝贝，怪我喽');
            $('#fail').show();
            // var head = $('#head').length>0 ? $('#head') : $('.headbanner-box');  // 专区列表头部还是专区报名头部
            // head.hide();
            $('.box').hide();
        },

        failLoad: function(hideAll) {
            hideAll = hideAll || false;
            $('#fail img').attr('src', 'img/delate@2x.png');
            $('#fail p').html('加载失败，点击重试');
            $('#fail').show();
            if (hideAll) { // true 为全部隐藏
                var head = $('#head').length>0 ? $('#head') : $('.headbanner-box');  // 专区列表头部还是专区报名头部
                head.hide();
                $('.box').hide();
            } else {
                $('#fail').css('margin-top', '15%');
                $('.box').hide();
            }

        }
    };

    return exceptionTip;
})
;
define('../common/setPicSize',[], function() {
    var setPicSize = {
        make: function(url, width, height) {
            var _url = '';
            if (url.indexOf('http://wx.qlogo.cn') > -1) {
                _index = url.lastIndexOf('/');
                _url = url.substr(0, url.lastIndexOf('/')) + '/96';
                return _url;
            } else {
                if (url.indexOf('http') > -1) {
                    _url = url;
                } else {
                    var random = Math.ceil(Math.random() * 8);
                    _url = "http://pic" + random + ".58cdn.com.cn/zhuanzh/" + url;
                }
                var dotIndex = _url.lastIndexOf('.');
                var suffix = _url.substr(dotIndex, _url.length - 1);
                var prefix = _url.split(suffix)[0];
                return prefix + '_' + width + '_' + height + suffix;
            }
        },
        adjust: function(picUrl, width, height) {
            if (!picUrl) {
                return false;
            }
            if (picUrl instanceof Array) {
                var newPicArr = [];
                picUrl.map(function(item, index) {
                    newPicArr.push(setPicSize.make(item, width, height));
                });
                return newPicArr;
            } else if (typeof picUrl == 'string') {
                return setPicSize.make(picUrl, width, height);
            }
            return false;
        }
    }
    return setPicSize;
});

define('./lunbo',[], function() {
    var lunbo={
        gallery:function(){
            var img_smalls = $("#img_smalls"), img1 = $("#img1");
            var conf = {showPicCnt: 3,tinyPicOutWidth: 99,tinyTo: "small"};
            var _picCount = img_smalls.find("li").length, picWidth = conf["tinyPicOutWidth"], showPicCnt = conf["showPicCnt"], ulWidth = conf["tinyPicOutWidth"] * showPicCnt, clk_pic_type = conf["tinyTo"];
            var img_smallsImg=img_smalls.find("img");
            // var img_scrollRight=$("#img_scrollRight");
            // var img_scrollLeft=$("#img_scrollLeft");
            img_smalls.css("width", _picCount * picWidth);

            $(".gallery").on("click","#img_smalls img",function(e) {
                console.log(e.target);
                var img1Src=e.target.src.replace("tiny", clk_pic_type)
                $("#img1").attr("src", img1Src);
                console.log(img1Src);
                $(e.target).closest("li").addClass("hover").siblings().removeClass("hover")
            });
            $(".gallery").on("click","#img_scrollLeft",function() {
                var currentPosition = $("#img_smalls").position().left;
                if (currentPosition < 0 && !$("#img_smalls").is(":animated")) {
                    $("#img_smalls").animate({left: "+=" + ulWidth + "px"})
                }
            });
            
            $(".gallery").on("click","#img_scrollRight",function() {
                if (_picCount > showPicCnt) {
                    var maxPosition = -((Math.ceil(_picCount / showPicCnt) - 1) * ulWidth);
                    var currentPosition = img_smalls.position().left;
                    if (currentPosition > maxPosition && !img_smalls.is(":animated")) {
                        img_smalls.animate({left: "-=" + ulWidth + "px"})
                    }
                }
            });
        }
    };
    return lunbo;
});
/**
 * 专区数据请求回调处理
 */

define('./ajaxCalbk',['../common/util', './lazyload', '../common/exceptionTip','../common/setPicSize','./lunbo','../common/config'], function(util, LazyLoad, exceptionTip,setPicSize,lunbo,config) {
    var ajaxCalbk = {
        uid:"",
        gender:"",
        shangpin_info_success_calbk: function(data) {
            var info_massege= $(".info_massege");
            var box_left_top= $(".box_left_top");
            var baby_talk= $(".baby_talk");
            var gallery_lunbo= $(".gallery");
            var fix_erweima=$("#fix_erweima");
            var footer_erweima=$(".footer_erweima");
            var downloadUrl=config.downloadUrl;//浮层 二维码生成
            if(__global4fe.zzfrom){
                if(__global4fe.zzfrom == "ganjiweb"){
                    downloadUrl += "?zzqdFrom=ganjiPC_tohb";
                }else{
                    downloadUrl += "?zzqdFrom=58PC_tohb";
                }
            }
            var downloadUrlStr=downloadUrl+"&"+__global4fe.afterSearch;
            var downloadUrlStrCode=encodeURIComponent(downloadUrlStr);
            var erweima_api='http://api.vip.58.com/genqrcode?size=200x200&margin=0&content='
            var apiUrl=erweima_api+downloadUrlStr;
            console.log(apiUrl);
            if(__global4fe.zzfrom&&__global4fe.zzfrom!==undefined){
                var erweimaImgStr='<img src="'+erweima_api+downloadUrlStrCode+'" alt=""/><p class="fix_erweima_p">下载转转</p>'
                util.render(fix_erweima[0],erweimaImgStr,true);
                util.render(footer_erweima[0],erweimaImgStr,true);
            }

            var clickLogchatStr='from=zzpc_callclick&zzfrom='+__global4fe.zzfrom; //统计clickLogchatStr
            var clickLogbuyStr='from=zzpc_buyclick&zzfrom='+__global4fe.zzfrom; //统计clickLogbuyStr
            console.log('shangpin_info_success_calbk');
            var spInfoData=data;
            var spInfoRespData=spInfoData.respData;
            var city=spInfoRespData.city;
            var title=spInfoRespData.title;
            var Dec=spInfoRespData.content;
            var DecContent=util.replaceAll(Dec,"\n","<br/>",true);
            var pics=spInfoRespData.pics;
            var portrait=spInfoRespData.portrait;
            var portraitStr=portrait;
            var status=spInfoRespData.status;
            var label=spInfoRespData.label;
            ajaxCalbk.uid=spInfoRespData.uid;
            var nowPrice=spInfoRespData.nowPrice;
            var nowPriceStr=util.parseMillion(nowPrice,10000);
            var oriPrice=spInfoRespData.oriPrice;
            if(oriPrice&&oriPrice!=="0"){
                var oriPriceStr=util.parseMillion(oriPrice,10000);
                var oriPriceStrs='<span>原价：<i>'+oriPriceStr+'</i>元</span>';
            }else{
                var oriPriceStrs='';
            }
            console.log("折扣="+oriPrice/nowPrice);
            if(oriPrice/nowPrice!==undefined&&oriPrice/nowPrice>=2){
                var isHideStr='<span class=\"cheaper_icon icon_png\">超便宜</span>';
            }else{
                var isHideStr='';
            }
            var labelHtml='';
            if(label&&label.length>0){
                console.log(label);
                var labelNum=label.split("|");
                console.log(labelNum);
                
                for(i=0;i<labelNum.length;i++){
                    labelHtml+='<span>'+labelNum[i]+'</span>'
                }
            }else{
                labelHtml+='<span>真实个人</span><span>担保交易</span><span>支持全国</span>'

            };
            if(pics&&pics.length>0){
                console.log(pics);
                var picsNum=pics.split("|");
                
                console.log(picsNum);
                var galleryImgHtml='';
                var picsHtml='';
                var galleryImg0=setPicSize.adjust(picsNum[0], 338,0);
                for(j=0;j<picsNum.length;j++){
                    var galleryImg=setPicSize.adjust(picsNum[j], 338,0);
                    var picsNumImg=setPicSize.adjust(picsNum[j], 750,0);
                    galleryImgHtml+='<li  data-adjust="adjust"><img rel="'+galleryImg+'" alt=""></li>'
                    picsHtml+='<img src="'+picsNumImg+'" alt="">'
                }
                //LazyLoad.init();
            }
            var spInfoTitle = '<h3 class="info_titile">'+spInfoRespData.title+'</h3>'
                +'<p class="info_p">'
                  +'<span class="look_time">'+spInfoRespData.viewCount+'次浏览</span>'
                 +' <span class="want_person">'+spInfoRespData.collectCount+'人想买</span>'
                +'</p>';
            var spInfoStr='<ul>'
                  +'<li class=\"price_li\">'
                    +'<span class=\"price_now\">现价：<i>'+nowPriceStr+'</i>元</span>'
                    +oriPriceStrs
                    +isHideStr
                  +'</li>'
                  +'<li class=\"palce_li\">'
                    +'<span>区域：<i>'+spInfoRespData.cityName+'-'+spInfoRespData.areaName+'</i></span>'
                  +'</li>'
                  +'<li class=\"biaoqian_li\">'
                  +labelHtml
                  +'</li>'
                  +'<li class=\"button_li\">'
                    +'<span onclick="clickLog(\''+clickLogchatStr+'\')" class=\"talk_button download_button\">联系卖家</span>'
                    +'<span onclick="clickLog(\''+clickLogbuyStr+'\')" class=\"buy_button download_button\">我想买</span>'
                  +'</li>'
                  +'<li class=\"talk_li\">'
                    +'<p>该信息来至【转转】，58同城担保</p>'
                  +'</li>'
                  +'<li class=\"special_li\">'
                    +'<dl class=\"true_dl\">'
                      +'<dt class=\"icon_png\"></dt>'
                      +'<dd class=\"dd1\">真实个人</dd>'
                      +'<dd class=\"dd2\">买家验货 平台打款</dd>'
                    +'</dl>'
                    +'<dl class=\"sale_dl\">'
                      +'<dt class=\"icon_png\"></dt>'
                      +'<dd class=\"dd1\">担保交易</dd>'
                      +'<dd class=\"dd2\">骗子再见 放心交易</dd>'
                    +'</dl>'
                    +'<dl class=\"talk_dl\">'
                      +'<dt class=\"icon_png\"></dt>'
                      +'<dd class=\"dd1\">在线沟通</dd>'
                      +'<dd class=\"dd2\">更隐私 更方便</dd>'
                    +'</dl>'

                  +'</li>'
                +'</ul>';
            var babyTalk='<p class="baby_face  clearfix">'
                +'<span class="baby_face_img"><img src="'+portraitStr+'" alt=""></span>'
                +'<span><i>'+spInfoRespData.nickName+'</i>有话说</span>'
              +'</p>'
              +'<div class="baby_kuang clearfix">'
                +'<span class="icon_png sanjiao"></span>'
                +'<p>'+DecContent+'</p>'
                +'<i class="right">喜欢就快联系我吧，我在转转等你。</i>'
              +'</div>'
              +'<div class="boby_pic">'
                +picsHtml
              +'</div>';

            var galleryLunbo='<div class="g_img"><span data-adjust="adjust"><img id="img1" rel="'+galleryImg0+'"></span></div>'
                      +'<div class="g_thumb">'
                        +'<span id="img_scrollLeft"><a href="javascript:void(0)" class="icon_left"></a></span>'
                        +'<span id="img_scrollRight"><a href="javascript:void(0)" class="icon_right"></a></span>'
                        +'<div class="g_thumb_main">'
                          +'<ul id="img_smalls" style="width: 663px;">'
                            +galleryImgHtml
                          +'</ul>'
                        +'</div>'
                        +'<div class="cl"></div>'
                      +'</div>';  

            var spInfoStrs=spInfoStr;
            if(spInfoData&&spInfoData.respCode=="0"){
                util.render(box_left_top[0],spInfoTitle,true,function() {
                    var imgLoad = new LazyLoad(box_left_top, 1);
                    imgLoad.init();
                });
                util.render(info_massege[0],spInfoStrs,true,function() {
                    var imgLoad = new LazyLoad(info_massege, 0.67);
                    imgLoad.init();
                });
                util.render(baby_talk[0],babyTalk,true);
                util.render(gallery_lunbo[0],galleryLunbo,true,function(){
                    var imgLoad = new LazyLoad(gallery_lunbo, 1.2);
                    imgLoad.init();
                    lunbo.gallery();
                });
                $("#img_smalls li").eq(0).addClass("hover");
            }else{
                exceptionTip.failLoad(true);
            }
        },
        fail_calbk:function(data){
            if(data.respCode&&data.respCode=='-1'){
                exceptionTip.noData();

            }else{
                exceptionTip.failLoad();
            }
        },
        caluateTime: function(tt) {
            var oo = new Date(tt);
            var nowT = new Date();
            var passedTime = parseInt(nowT.getTime()) - parseInt(tt);
            var year = Math.floor(passedTime / (365 * 24 * 60 * 60 * 1000));
            if (year > 0) {
                return year + "年前";
            } else {
                var day = Math.floor(passedTime / (24 * 60 * 60 * 1000));
                if (day > 0) {
                    return day + "天前";
                } else {
                    var hour = Math.floor(passedTime / (60 * 60 * 1000));
                    if (hour > 0) {
                        return hour + "时前";
                    } else {
                        var min = Math.ceil(passedTime / (60 * 1000));
                        return min + "分前";
                    }
                }
            }
        },
        liuyan_Info_success_calbk:function(data){
            var liuyan_list= $(".liuyan_list");
            var liuyan_title= $(".liuyan_title");
            var clickLogmoreStr='from=zzpc_liuyanmoreclick&zzfrom='+__global4fe.zzfrom; 
 
            console.log('liuyan_Info_success_calbk');
            liuyan_list.empty();
            var liuyanData=data;
            var liuyanRespData=liuyanData.respData;

            var len = liuyanRespData.length;
            var liuyan_titleStr='<h3 class="box_title_h3 left">留言（<i>'+len+'</i>）</h3>'
                            +'<a href="#2" onclick="clickLog(\''+clickLogmoreStr+'\')" title="查看更多" class="box_more download_button right">查看更多 >> </a> ';
            if (len > 0) {
                if (len > 3) {
                    len = 3
                }
                var liuyanListStr="";
                for (var ii = 0; ii < len; ii++) {
                    if ("portrait" in liuyanRespData[ii] && liuyanRespData[ii].portrait != "") {
                        var portr = liuyanRespData[ii].portrait;
                        var liuyanImg='<span class="liuyan_face"  data-adjust="adjust"><img src="'+portr+'" alt=""></span>'
                    } else {
                        var liuyanImg='<span class="liuyan_face"><img src="http://img.58cdn.com.cn/zhuanzhuanftp/images/default_head_icon.png" alt=""></span>'
                    }

                    var time = ajaxCalbk.caluateTime(liuyanRespData[ii].time);
                    var liuyanNameStr="";
                    if ("toNickName" in liuyanData.respData[ii] && liuyanData.respData[ii].toNickName != "") {
                        liuyanNameStr += '<i class="liuyan_name">'+liuyanRespData[ii].fromNickName+'<span>回复</span><strong>@' + liuyanData.respData[ii].toNickName + '</strong></i>';
                    }else{
                        liuyanNameStr+='<i class="liuyan_name">'+liuyanRespData[ii].fromNickName+'</i>';

                    }

                    var liuyanWord='<div class="liuyan_meg clearfix">'
                          +liuyanNameStr
                          +'<p class="liuyan_p">'+liuyanRespData[ii].content+'</p>'
                          +'<span class="liuyan_time"><i class="icon_png"></i>'+time+'</span>'
                        +'</div>';
                    liuyanListStr+='<li class="liuyan_li">'
                        +liuyanImg+liuyanWord
                      +'</li>'
                }
                
            }
            if(len&&len>0){

            
                util.render(liuyan_list[0],liuyanListStr,true);
                util.render(liuyan_title[0],liuyan_titleStr,true);
            }else{
                $(".info_liuyan").remove();
            }
        },
        personal_jieshao_success_calbk:function(data){
            var jieshao=$(".personal_jieshao");
            jieshao.empty();
            var jieshaodata=data.respData;
            var vlabel='<ul class="personal_biaoqian clearfix">';
            var label_length=jieshaodata.verifyLabels.length;
            if(jieshaodata.verifyLabels&&label_length>0){
                vlabel+='<li>'+jieshaodata.verifyLabels[0].labelName+'</li>'

            }else{
                vlabel+='';
            }
            vlabel+='</ul>';
            var touxiang="";
            if ("portrait" in jieshaodata && jieshaodata.portrait != "") {
                var portr = jieshaodata.portrait;
                touxiang='<div class="personal_touxiang"  data-adjust="adjust">'+'<img src="'+portr+'" alt="">'+'</div>';
            }else {
                touxiang='<div class="personal_touxiang"><img src="http://img.58cdn.com.cn/zhuanzhuanftp/images/default_head_icon.png" alt="" /></div>'
            }
            var nickName='<p class="personal_name">'+jieshaodata.nickname+'</p>';
            var xingxing='<div class="xingxing clearfix">';
            //星星等级，默认为1
            var levelLa_length;
            var levelSm_length;
            if("largeScore" in jieshaodata &&jieshaodata.largeScore>0){
                levelLa_length=jieshaodata.largeScore;
                for(var i=0;i<levelLa_length;i++){
                    xingxing+='<span class="icon_png "></span>';                    
                }
            }else{
                xingxing+='';
            }
            if("smallScore" in jieshaodata &&jieshaodata.smallScore>0){
                levelSm_length=jieshaodata.smallScore;
                for(var i=0;i<levelSm_length;i++){
                    xingxing+='<span class="icon_png smallScore"></span>';
                }
            }else{
                xingxing+='';
            }
            
            xingxing+='</div>';
            var gender=(jieshaodata.gender)?((jieshaodata.gender=="1")?"他":"她"):"他";
            ajaxCalbk.gender=gender;
            var days=jieshaodata.days;
            var desc="";
            if(days>=0&&days<=30){
                desc=gender+"是一个转转新人";
            }else{
                desc=gender+"加入转转"+days+"天";
            }
            var tradeCount=(jieshaodata.tradeCount)?(jieshaodata.tradeCount):0;
            var chengjiu='<p class="personal_chengjiu">'+desc+'</p>';
            var tradeCount=jieshaodata.tradeCount;
            var trade="";
            if(tradeCount&&tradeCount>0){
                if(tradeCount>=1&&tradeCount<=3){
                    trade+=gender+'已成交<i>'+tradeCount+'</i>笔，小有成就咯';
                }else if(tradeCount>=4&&tradeCount<=10){
                    trade+=gender+'已成交<i>'+tradeCount+'</i>笔，相当厉害了';
                }else{
                    trade+=gender+'已成交<i>'+tradeCount+'</i>笔，闲置达人';
                }
            }else{
                trade='so sad,'+gender+'还没有成交过';
            }
            var tradeStr='<p class="personal_baby">'+trade+'</p>';
            var centerHtml=vlabel+touxiang+nickName+xingxing+chengjiu+tradeStr;
            util.render(jieshao[0],centerHtml,true);
            //评价
            var pingjia=$(".personal_pingjia");
            var pinjia_num=parseInt(jieshaodata.goodcount)+parseInt(jieshaodata.badcount);
            var pingjiaLabel="";
            if(jieshaodata.labels&&jieshaodata.labels.length>0){
                var labels=jieshaodata.labels;
                if (labels.length > 5) {
                       labels.length = 5
                }
                pingjiaLabel+='<h3 class="box_title">大家这么评价'+gender+'</h3>';
                pingjiaLabel+='<ul class="clearfix">';
                for(var i=0;i<labels.length;i++){
                    pingjiaLabel+='<li>'+labels[i].content+'<i>'+labels[i].count+'</i></li>';
                }
            }else{
                //default
            }
            pingjiaLabel+='</ul>';
            util.render(pingjia[0],pingjiaLabel,true,function() {
                var imgLoad = new LazyLoad(pingjia, 1);
                imgLoad.init();
            });
        },
        personal_salebaby_success_calbk:function(data,gender){
            var sale_baby=$(".personal_salebaby");
            sale_baby.empty();
            var clickLogStr = 'from=zzpc_fabuclick&zzfrom='+__global4fe.zzfrom; 
            var babydata=data.respData;
            var gender=(gender)?((gender=="1")?"他":"她"):"他";
            if($.isArray(babydata)){
                var infocount=babydata.length;
                var baby_desc="";
                baby_desc+='<h3 class="box_title">'+gender+'的宝贝（'+babydata.length+'）</h3>'
                              +'<ul class="personal_list">';
                infocount=(infocount>0)?((infocount<=5)?infocount:'5'):0;
                if (infocount>0){
                    for(var i=0;i<infocount;i++){
                        var babyUrl=babydata[i].infoUrl;
                        var babyUrlStrPath=babyUrl.split("cateId=")[1];
                        var babytitleStr=babydata[i].title+babydata[i].content;
                        var babytitleStrUtil=util.setLongStr(babytitleStr,18);
                        if(babyUrlStrPath&&babyUrlStrPath!==undefined&&babyUrlStrPath!==""){
                            var babyUrlStrPathHtml="&cateId="+babyUrlStrPath+"&";
                        }else{
                            var babyUrlStrPathHtml='&';
                        }
                        var pic= babydata[i].pics;
                        var picUrl=setPicSize.adjust(pic,100,75);
                        var url=location.pathname+'?infoId='+babydata[i].infoId+babyUrlStrPathHtml+__global4fe.afterSearch;
                        baby_desc+='<li class="clearfix" onclick="clickLog(\''+clickLogStr+'\')" url="'+url+'"><dl>'+'<dt data-adjust="adjust"><img rel="'+picUrl+'" alt=""></dt>'
                                  +'<dd>'+babytitleStrUtil+'</dd>'
                                  +'<dd class="info_price"><i>'+babydata[i].nowPrice+'</i>元</dd></dl></li>';
                    }
                    baby_desc+='</ul>';
                }
            }
            
            util.render(sale_baby[0],baby_desc,true,function() {
                var imgLoad = new LazyLoad(sale_baby,0.75);
                imgLoad.init();
            });
            $(".personal_list li:last-child").css("border-bottom","none");
            $('.personal_list li').click(function(){
                location.href=$(this).attr("url");
                clickLog=('from=zzpc_fabuclick&zzfrom='+__global4fe.zzfrom);
            });
        },
        personal_tuijian_success_calbk:function(data){
            var tuijian=$(".personal_tuijian");
            tuijian.empty();
            var clickLogStr = 'from=zzpc_tuijianclick&zzfrom='+__global4fe.zzfrom; 
            var tuijiandata=data.respData;
            if($.isArray(tuijiandata)){
                var tuijiancount=tuijiandata.length;
                tuijiancount=(tuijiancount>0)?((tuijiancount<=5)?tuijiancount:'5'):0;
                var tuijian_desc="";
                if(tuijiancount>0){
                    tuijian_desc+='<h3 class="box_title">更多好货，都在转转</h3>'
                              +'<ul class="personal_list">';
                    for(var i=0;i<tuijiancount;i++){
                        var tuijianUrl=tuijiandata[i].infoUrl;
                        var tuijianUrlStrPath=tuijianUrl.split("cateId=")[1];
                        var tuijiantitleStr=tuijiandata[i].title;
                        var tuijiantitleStrUtil=util.setLongStr(tuijiantitleStr,18);

                        if(tuijianUrlStrPath&&tuijianUrlStrPath!==undefined&&tuijianUrlStrPath!==""){
                            var tuijianUrlStrPathHtml="&cateId="+tuijianUrlStrPath+"&";
                        }else{
                            var tuijianUrlStrPathHtml='&';
                        }
                        var pic= tuijiandata[i].infoImage;
                        var picUrl=setPicSize.adjust(pic,100,75);

                        var url=location.pathname+'?infoId='+tuijiandata[i].infoId+tuijianUrlStrPathHtml+__global4fe.afterSearch;
                        tuijian_desc+='<li class="clearfix" onclick="clickLog(\''+clickLogStr+'\')" url="'+url+'"><dl>'+'<dt data-adjust="adjust"><img rel="'+picUrl+'" alt=""></dt>'
                                  +'<dd>'+tuijiantitleStrUtil+'</dd>'
                                  +'<dd class="info_price"><i>'+tuijiandata[i].nowPrice+'</i>元</dd></dl></li>';
                    }
                    tuijian_desc+='</ul>';
                    util.render(tuijian[0],tuijian_desc,true,function() {
                        var imgLoad = new LazyLoad(tuijian, 0.75);
                        imgLoad.init();
                    });
                    $(".personal_list li:last-child").css("border-bottom","none");

                    $('.personal_list li').click(function(){
                        location.href=$(this).attr("url");
                    });
                }else{
                    $(".tuijian_div").remove();
                }
            }
        }
        
    };

    return ajaxCalbk;
})
;
/**
 * pc详情接口请求
 */
define('./getData',['./ajaxCalbk', '../common/config'], function(ajaxCalbk,config){
    var getData = {
        getUserData: function() {
            var userData = decodeURIComponent(location.search).replace("?", "");
            var userData_arry = userData.split("&");
            if (userData_arry.length > 0) {
                for (var i = 0; i < userData_arry.length; i++) {
                    var Varry = userData_arry[i].split("=");
                    getData[Varry[0]] = Varry[1];
                }
            }
        },
        // 获取详情页商品信息
        shangpin_info:function() {
            console.log('getData.spInfoAPI--------------');
            var search=location.search;

            var zq_interface = config.spInfoAPI+search;
            console.log('zq_interface:'+zq_interface);
            $.getJSON(zq_interface+'&callback=?',function(data){

                if(data.respCode&&data.respCode=='0'){
                    window.uid=data.respData.uid;

                    ajaxCalbk.shangpin_info_success_calbk(data);
                    getData.personal_center(window.uid);
                }else{
                    ajaxCalbk.fail_calbk(data);

                }
                
                

            });
            
        },
        // 获取留言信息
        liuyan_Info:function() {
            console.log('getData.liuyanInfoAPI--------------');
            var search=location.search;
            var zq_interface = config.liuyanInfoAPI + search;
            console.log('zq_interface:'+zq_interface);
            $.getJSON(zq_interface+'&callback=?',function(data){
                if(data.respCode&&data.respCode!=='-1'){
                    ajaxCalbk.liuyan_Info_success_calbk(data);
                }else{
                    ajaxCalbk.fail_calbk(data);
                }
            }); 
        },
        //获取个人中心信息
        personal_center:function(uid){
            console.log('getData.personal_center--------------');
            var zq_interface=config.personnalAPI+"?getUid="+uid;
            $.getJSON(zq_interface+'&callback=?', function(data){
                if(data.respCode&&data.respCode!=='-1'){
                    ajaxCalbk.personal_jieshao_success_calbk(data);
                    __global4fe.gender=data.respData.gender;
                    getData.personal_salebaby(uid,1,5,__global4fe.gender);
                }else{
                    ajaxCalbk.fail_calbk(data);
                }
                    
            });
        },
        //获取他的宝贝信息
        personal_salebaby:function(uid,pageNumber,pageSize,gender){
            var zq_interface=config.personalListAPI+"?getUid="+uid+"&uidB="+uid+"&pageNumber="+pageNumber+"&pageSize="+pageSize;
            $.getJSON(zq_interface+'&callback=?',function(data){
               if(data.respCode&&data.respCode!=='-1'){
                    ajaxCalbk.personal_salebaby_success_calbk(data,gender);
               }else{
                    ajaxCalbk.fail_calbk(data);
                }
            });
        },
        //获取转转推荐信息
        personal_tuijian:function(){
            var search=location.search;
            var num="5";
            var zq_interface=config.moreInfoAPI+search+"&count="+num;
            console.log('zq_interface:'+zq_interface);
            $.getJSON(zq_interface+'&callback=?',ajaxCalbk.personal_tuijian_success_calbk);
            
        }
        
    };

    return getData;
});
define('zzdetail_common',['./diaoqiZZ',  './backtop', './tank','./getData',],
function(diaoqiZZ, backtop,tank,getData) {


    var load = function(){
        $("#fail").hide();
        getData.shangpin_info();
        getData.liuyan_Info();
        getData.personal_tuijian();
        window.__global4fe = window.__global4fe ? window.__global4fe : {};
        __global4fe.firstLoad = true;
        getData.getUserData();
        __global4fe.infoId = getData.infoId;
        __global4fe.zzfrom = getData.zzfrom;
        __global4fe.zhuanzhuanSourceFrom = getData.zhuanzhuanSourceFrom;
        __global4fe.afterSearch='zzfrom='+__global4fe.zzfrom+'&zhuanzhuanSourceFrom='+__global4fe.zhuanzhuanSourceFrom;
        __global4fe.tankWord="";
        console.log('__global4fe.infoId='+__global4fe.infoId);
        // $(".info_massege").on("click",".download_button",function(){
        //  __global4fe.tankWord="网页版暂不支持，快来下载APP吧";
        //  __global4fe.clickClose="tan_close";
        //  tank.tankShow();
        // });

        $(".info_liuyan").on("click",".download_button",function(){
            __global4fe.tankWord="网页版暂不支持留言，快来下载APP吧";
            __global4fe.tankTitle="在线沟通，更隐私更方便哦";
            __global4fe.tankP="联系卖家，发起留言";
            __global4fe.clickClose="from=zzpc_liuyanclose&zzfrom="+__global4fe.zzfrom;
            tank.tankShow();
        });
        $(".info_massege").on("click",".talk_button",function(){
            __global4fe.tankWord="网页版暂不支持聊天，快来下载APP吧";
            __global4fe.tankTitle="在线沟通，更隐私更方便哦";
            __global4fe.tankP="联系卖家，发起聊天";
            __global4fe.clickClose="from=zzpc_callclose&zzfrom="+__global4fe.zzfrom;
            tank.tankShow();
        });
        $(".info_massege").on("click",".buy_button",function(){
            __global4fe.tankWord="网页版暂不支持购买，快来下载APP吧";
            __global4fe.tankTitle="微信支付，担保交易才安全";
            __global4fe.tankP="在线支付，发起订单";
            __global4fe.clickClose="from=zzpc_buyclose&zzfrom="+__global4fe.zzfrom;
            tank.tankShow();
        });

        $("#fix_erweima").click(function(){
            tank.erweima();
        });
        $(".footer_close").click(function(){
            $(".footer_bg").slideUp(1000);
            $("#fix_erweima").show(1000);
        });
        $(".tan_close").click(function(){
            $("div.tan").css("display", "none");
            $("div.zhe").css("display", "none")
        });
    }
    load();
    $("#fail").click(function(){
        load();
    })
    


});