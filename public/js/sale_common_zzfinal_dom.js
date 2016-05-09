var svn_revision =4263;

/*
	comment:url解析
 */
define('sale/zz_getData',[], function() {
	var getData={
		getUserData :function() {
	        var userData = decodeURIComponent(location.search).replace("?", "");
	        var userData_arry = userData.split("&");
	        if (userData_arry.length > 0) {
	            for (var i = 0; i < userData_arry.length; i++) {
	                var Varry = userData_arry[i].split("=");
	                getData[Varry[0]] = Varry[1];
	            }
	        }
	    },
	    setConfig:function(){
	    	getData.getUserData();
	    	window.__global4fe = window.__global4fe ? window.__global4fe : {};
	    	__global4fe={
		        "infoId":getData.infoId,
		        "zzfrom":getData.zzfrom,
		        "zhuanzhuanSourceFrom":getData.zhuanzhuanSourceFrom
		    };
	    }
	}
    return getData;
});

/*
	comment:设置二维码
 */
define('sale/setqrCode',['sale/zz_getData'], function(getData) {
    $(function(){
    	getData.setConfig();
	    var downloadUrl="http://m.zhuanzhuan.58.com/Mzhuanzhuan/zzWebInfo/zz58/zzpc/58hb_ld.html";
		if(__global4fe.zzfrom){
	        if(__global4fe.zzfrom == "ganjiweb"){
	            downloadUrl += "?zzqdFrom=ganjiPC_tohb";
	        }else{
	            downloadUrl += "?zzqdFrom=58PC_tohb";
	        }
	    }
	    var afterSearch='zzfrom='+__global4fe.zzfrom+'&zhuanzhuanSourceFrom='+__global4fe.zhuanzhuanSourceFrom;
	    var downloadUrlStr=downloadUrl+'&infoId='+getData.infoId+"&"+afterSearch;
	    var downloadUrlStrCode=encodeURIComponent(downloadUrlStr);
	    var erweima_api='http://api.vip.58.com/genqrcode?size=200x200&margin=0&content=';
	    var apiUrl=erweima_api+downloadUrlStr;
	    var erweimaImg=erweima_api+downloadUrlStrCode;
	    $("img.qrCode").attr("src",erweimaImg); 
    })
});

/*
	comment:回到顶部
 */
define('sale/zz_backtop',[],function() {
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

/*
	comment:图片相册
 */
define('sale/zz_album',[], function() {
    var album={
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
    return album;
});

/*
	comment:util
 */
define('sale/util',[], function() {
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
});

/*
	comment:setPicSize
 */
define('sale/setPicSize',[], function() {
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

define('sale/zz_newPic',['sale/setPicSize'],function(sale_setPicSize) {
    return function(obj,width,height){
    	var len=obj.length;
    	for(var i=0;i<obj.length; i++){
    		var url=obj.eq(i).attr("src");
    		url=sale_setPicSize.adjust(url,width,height);
    		obj.eq(i).attr("src",url);
    	}
    }
});

/*
    comment: images lazyload模块
*/
define('sale/lazyload',[], function() {
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


define('_pkg/sale/sale_common_zzfinal_dom',
	['sale/setqrCode','sale/zz_album','sale/zz_backtop','sale/util','sale/setPicSize',"sale/zz_newPic"], 
	function (setqrCode,album,backtop,sale_util,sale_setPicSize,sale_zz_newPic) {
		album.gallery();
		sale_zz_newPic($("#img_smalls img"), 338,0);
});
