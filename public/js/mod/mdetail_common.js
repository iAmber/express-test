define('../mod/diaoqiZZ',[],function(){
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
 comment: 图片lazload模块
 */
define('../mod/lazload', [],
function() {
    function LazyLoad(setele, RATIO) {
        this.setele = setele;
        this.RATIO = RATIO;
    }
    LazyLoad.prototype = {
        init: function() {
            var _this = this;
            _this.showimg();
            $(window).on('resize',
            function(event) {
                _this.showimg();
            });

            $(window).on('scroll',
            function() {
                _this.showimg();
            });
        },
        showimg: function() {
            var _this = this;
            var flag = false;
            if (flag) return;
            var position = _this.setele.offset().top;
            var h_end = _this.setele.offset().top + _this.setele.height();
            var h = document.body.scrollTop + window.screen.height;
            if (position < h && h > document.body.scrollTop) {
                flag = true;
                _this.setsrc(_this.RATIO);
            }

        },
        setsrc: function(RATIO) {
            var _this = this;
            var src = "";
            _this.setele.find('img').each(function(index, el) {
                src = $(el).attr('rel');
                if (src) this.src = src;
                _this._adjust(this, src, RATIO);
            });
        },
        _adjust: function(elem, src, RATIO) {
            var img = new Image();
            img.src = src;
            $(img).on("load",
            function() {
                /*var RATIO = 0.82;  */
                var elemWidth = img.width;
                var elemHeight = img.height;
                var containerWidth = $(elem).parents('.list_img').width();
                var containerHeight = containerWidth * RATIO;
                //以容器宽为准等比压缩
                if (elemHeight > RATIO * elemWidth) {
                    $(elem).css({
                        'width': '100%',
                        'position': 'absolute',
                        'left': '0'
                    });
                    elemHeight = $(elem).height();
                    if (elemHeight > containerHeight) {
                        $(elem).css('top', -Math.abs(elemHeight - containerHeight) / 2 + "px");
                    }
                } else {
                    $(elem).css({
                        'height': '100%',
                        'width': 'auto',
                        'position': 'absolute',
                        'left': '0'
                    });
                    elemWidth = $(elem).width();
                    if (elemWidth > containerWidth) {
                        $(elem).css('left', -Math.abs(elemWidth - containerWidth) / 2 + "px");
                    }
                }
            });
        },

    }

    LazyLoad.prototype.constructor = LazyLoad;

    return LazyLoad;
});

define('../mod/setPicSize', [],
function() {
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
function FastClick(layer, options) {

    var oldOnClick;
    options = options || {};
    this.trackingClick = false;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchIdentifier = 0;
    this.touchBoundary = options.touchBoundary || 10;
    this.layer = layer;
    this.tapDelay = options.tapDelay || 200;
    if (FastClick.notNeeded(layer)) {
        return
    }

    function bind(method, context) {
        return function() {
            return method.apply(context, arguments)
        }
    }
    var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
    var context = this;
    for (var i = 0,
    l = methods.length; i < l; i++) {
        context[methods[i]] = bind(context[methods[i]], context)
    }
    if (deviceIsAndroid) {
        layer.addEventListener("mouseover", this.onMouse, true);
        layer.addEventListener("mousedown", this.onMouse, true);
        layer.addEventListener("mouseup", this.onMouse, true)
    }
    layer.addEventListener("click", this.onClick, true);
    layer.addEventListener("touchstart", this.onTouchStart, false);
    layer.addEventListener("touchmove", this.onTouchMove, false);
    layer.addEventListener("touchend", this.onTouchEnd, false);
    layer.addEventListener("touchcancel", this.onTouchCancel, false);
    if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function(type, callback, capture) {
            var rmv = Node.prototype.removeEventListener;
            if (type === "click") {
                rmv.call(layer, type, callback.hijacked || callback, capture)
            } else {
                rmv.call(layer, type, callback, capture)
            }
        };
        layer.addEventListener = function(type, callback, capture) {
            var adv = Node.prototype.addEventListener;
            if (type === "click") {
                adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                    if (!event.propagationStopped) {
                        callback(event)
                    }
                }), capture)
            } else {
                adv.call(layer, type, callback, capture)
            }
        }
    }
    if (typeof layer.onclick === "function") {
        oldOnClick = layer.onclick;
        layer.addEventListener("click",
        function(event) {
            oldOnClick(event)
        },
        false);
        layer.onclick = null
    }
}
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
var deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function(target) {

    switch (target.nodeName.toLowerCase()) {
    case "button":
    case "select":
    case "textarea":
        if (target.disabled) {
            return true
        }
        break;
    case "input":
        if (deviceIsIOS && target.type === "file" || target.disabled) {
            return true
        }
        break;
    case "label":
    case "video":
        return true
    }
    return /\bneedsclick\b/.test(target.className)
};
FastClick.prototype.needsFocus = function(target) {

    switch (target.nodeName.toLowerCase()) {
    case "textarea":
        return true;
    case "select":
        return ! deviceIsAndroid;
    case "input":
        switch (target.type) {
        case "button":
        case "checkbox":
        case "file":
        case "image":
        case "radio":
        case "submit":
            return false
        }
        return ! target.disabled && !target.readOnly;
    default:
        return /\bneedsfocus\b/.test(target.className)
    }
};
FastClick.prototype.sendClick = function(targetElement, event) {

    var clickEvent, touch;
    if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur()
    }
    touch = event.changedTouches[0];
    clickEvent = document.createEvent("MouseEvents");
    clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent)
};
FastClick.prototype.determineEventType = function(targetElement) {

    if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
        return "mousedown"
    }
    return "click"
};
FastClick.prototype.focus = function(targetElement) {

    var length;
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length)
    } else {
        targetElement.focus()
    }
};
FastClick.prototype.updateScrollParent = function(targetElement) {

    var scrollParent, parentElement;
    scrollParent = targetElement.fastClickScrollParent;
    if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
            if (parentElement.scrollHeight > parentElement.offsetHeight) {
                scrollParent = parentElement;
                targetElement.fastClickScrollParent = parentElement;
                break
            }
            parentElement = parentElement.parentElement
        } while ( parentElement )
    }
    if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop
    }
};
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

    if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode
    }
    return eventTarget
};
FastClick.prototype.onTouchStart = function(event) {

    var targetElement, touch, selection;
    if (event.targetTouches.length > 1) {
        return true
    }
    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];
    if (deviceIsIOS) {
        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
            return true
        }
        if (!deviceIsIOS4) {
            if (touch.identifier === this.lastTouchIdentifier) {
                event.preventDefault();
                return false
            }
            this.lastTouchIdentifier = touch.identifier;
            this.updateScrollParent(targetElement)
        }
    }
    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
        event.preventDefault()
    }
    return true
};
FastClick.prototype.touchHasMoved = function(event) {

    var touch = event.changedTouches[0],
    boundary = this.touchBoundary;
    if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
        return true
    }
    return false
};
FastClick.prototype.onTouchMove = function(event) {

    if (!this.trackingClick) {
        return true
    }
    if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
        this.trackingClick = false;
        this.targetElement = null
    }
    return true
};
FastClick.prototype.findControl = function(labelElement) {

    if (labelElement.control !== undefined) {
        return labelElement.control
    }
    if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor)
    }
    return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
};
FastClick.prototype.onTouchEnd = function(event) {

    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
    if (!this.trackingClick) {
        return true
    }
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
        this.cancelNextClick = true;
        return true
    }
    this.cancelNextClick = false;
    this.lastClickTime = event.timeStamp;
    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    if (deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent
    }
    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === "label") {
        forElement = this.findControl(targetElement);
        if (forElement) {
            this.focus(targetElement);
            if (deviceIsAndroid) {
                return false
            }
            targetElement = forElement
        }
    } else if (this.needsFocus(targetElement)) {
        if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === "input") {
            this.targetElement = null;
            return false
        }
        this.focus(targetElement);
        this.sendClick(targetElement, event);
        if (!deviceIsIOS || targetTagName !== "select") {
            this.targetElement = null;
            event.preventDefault()
        }
        return false
    }
    if (deviceIsIOS && !deviceIsIOS4) {
        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
            return true
        }
    }
    if (!this.needsClick(targetElement)) {
        event.preventDefault();
        this.sendClick(targetElement, event)
    }
    return false
};
FastClick.prototype.onTouchCancel = function() {

    this.trackingClick = false;
    this.targetElement = null
};
FastClick.prototype.onMouse = function(event) {

    if (!this.targetElement) {
        return true
    }
    if (event.forwardedTouchEvent) {
        return true
    }
    if (!event.cancelable) {
        return true
    }
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation()
        } else {
            event.propagationStopped = true
        }
        event.stopPropagation();
        event.preventDefault();
        return false
    }
    return true
};
FastClick.prototype.onClick = function(event) {

    var permitted;
    if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true
    }
    if (event.target.type === "submit" && event.detail === 0) {
        return true
    }
    permitted = this.onMouse(event);
    if (!permitted) {
        this.targetElement = null
    }
    return permitted
};
FastClick.prototype.destroy = function() {

    var layer = this.layer;
    if (deviceIsAndroid) {
        layer.removeEventListener("mouseover", this.onMouse, true);
        layer.removeEventListener("mousedown", this.onMouse, true);
        layer.removeEventListener("mouseup", this.onMouse, true)
    }
    layer.removeEventListener("click", this.onClick, true);
    layer.removeEventListener("touchstart", this.onTouchStart, false);
    layer.removeEventListener("touchmove", this.onTouchMove, false);
    layer.removeEventListener("touchend", this.onTouchEnd, false);
    layer.removeEventListener("touchcancel", this.onTouchCancel, false)
};
FastClick.notNeeded = function(layer) {

    var metaViewport;
    var chromeVersion;
    var blackberryVersion;
    if (typeof window.ontouchstart === "undefined") {
        return true
    }
    chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
    if (chromeVersion) {
        if (deviceIsAndroid) {
            metaViewport = document.querySelector("meta[name=viewport]");
            if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                    return true
                }
                if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                    return true
                }
            }
        } else {
            return true
        }
    }
    if (deviceIsBlackBerry10) {
        blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
        if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
            metaViewport = document.querySelector("meta[name=viewport]");
            if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                    return true
                }
                if (document.documentElement.scrollWidth <= window.outerWidth) {
                    return true
                }
            }
        }
    }
    if (layer.style.msTouchAction === "none") {
        return true
    }
    return false
};
FastClick.attach = function(layer, options) {

    return new FastClick(layer, options)
};
if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
    define('../mod/m.fastclick', [],
    function() {

        return FastClick
    })
} else if (typeof module !== "undefined" && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick
} else {
    window.FastClick = FastClick
};
/*
 comment: qqm详情页图片轮换
 */

define('../mod/zzSlide', ['../mod/m.fastclick'],
function(FastClick) {
    FastClick.attach(document.body);
    var windowH = $(window).height(); 
    var slideX = (function() {
        var _slide = function(node, duration, width, left, clickable) {
            this._eleX = 0;
            this._index = 0;
            this._length = node.children('li').length;
            this._main = node; // ul
            this._startX = 0;
            this._startY = 0;
            this._duration = duration;
            this._width = width;
            this._left = left;
            this._clickable = clickable;
            this._img = node.find('li img'); // 图片
            $('.total_img').text(this._length);
        };

        _slide.prototype = {
            _bindEvents: function() {
                var _this = this;
                this._main.bind("touchstart",
                function(e) {
                    _this._touchStart(e, _this);
                });
                this._main.bind("touchmove",
                function(e) {
                    _this._touchMove(e, _this);
                });
                this._main.bind("touchend",
                function(e) {
                    _this._touchEnd(e, _this);
                });
            },
            _setBigImage: function() {
                if (this._main.length > 0) {
                    $('.bigimg_box ul').html(this._main.html().replace(/small/g, 'big').replace(/220/g, 300).replace(/155/g, 415));
                }
                if ($('.image_area_new ul').length > 0) {
                    $('.bigimg_box ul').html($('.image_area_new ul').html());
                    var bigimg_boxH = windowH - 50 + "px";
                    $(".bigimg_box li").css("height", bigimg_boxH);
                    $('.bigimg_box img').each(function(index, elem) {
                        //$(elem).parent("li").removeAttr("style");
                        $(elem).removeAttr("style");
                    });
                }
            },

            _click: function() {
                // add image to bigimage tag.
                this._setBigImage();
                if ($('.downloadAPP').length > 0) {
                    $('.downloadAPP').hide();
                }
                var bigimage = m58.slideX.bind($('.bigimg_box ul'), '300ms', 320, 0, false);
                if (this._clickable) {
                    var img = $(this._img.get(this._index));
                    this._showImage(this._index);
                    var width = parseInt($(".image_area_w").css("width"));
                    $('.bigimg_box ul').css('-webkit-transform', 'translateX(-' + this._index * width + 'px)');
                    if (typeof bigimage !== 'undefined') {
                        bigimage._index = this._index;
                        bigimage._showImage(this._index);
                        bigimage._showImage(this._index + 1);
                        $('.curr_img').text(this._index + 1)
                    }
                    $('#viewBigImagebg').css('height', document.body.offsetHeight + 50 + 'px');
                    $('#viewBigImagebg, #viewBigImage').show();
                    $('.pic_logo,.solder_info,.backlist').hide();

                }
            },

            _showImage: function(index) {
                var img = $(this._img.get(index));
                var ref = img.attr('ref');
                if (ref) {
                    img.attr('src', ref);
                    img.removeAttr('ref');
                    if ($(".image_area_new").length > 0 && ($("#viewBigImage").css("display") == "none" || $("#viewBigImage").length == 0)) {
                        this._adjust(img, ref);
                    }
                }
            },
            _adjust: function(elem, src) {
                var img = new Image();
                img.src = src;
                $(img).on("load",
                function() {
                    var RATIO = 1;
                    var elemWidth = img.width;
                    var elemHeight = img.height;
                    var containerWidth = $(window).width();
                    var containerHeight = containerWidth * RATIO;
                    //以容器宽为准等比压缩
                    if (elemHeight > elemWidth) {
                        $(elem).css({
                            'width': '100%',
                            'position': 'absolute',
                            'left': '0'
                        });
                        elemHeight = $(elem).height();
                        if (elemHeight > containerHeight) {
                            $(elem).css('top', -Math.abs(elemHeight - containerHeight) / 2 + "px");
                        }
                    } else {
                        $(elem).css({
                            'height': '100%',
                            'width': 'auto',
                            'position': 'absolute',
                            'left': '0'
                        });
                        elemWidth = $(elem).width();
                        if (elemWidth > containerWidth) {
                            $(elem).css('left', -Math.abs(elemWidth - containerWidth) / 2 + "px");
                        }
                    }
                });
            },
            _moveTo: function(x) {
                this._main.css({
                    '-webkit-transform': 'translateX(' + x + 'px)'
                });
            },

            _touchStart: function(e, _this) {
                e.stopPropagation();
                var finger0 = e.targetTouches[0];
                _this._startX = finger0.pageX;
                _this._startY = finger0.pageY;
                var transform = _this._main.css('-webkit-transform');
                var pattern = /\(|, {0,}|\)/;
                _this._eleX = (transform.indexOf('translate') >= 0) ? +transform.split(pattern)[1].replace('px', '') : +transform.split(pattern)[5];
            },

            _touchMove: function(e, _this) {
                e.stopPropagation();
                var finger0 = e.targetTouches[0];
                var endX = finger0.pageX;
                var offsetX = endX - _this._startX + _this._eleX;
                _this._main.css('-webkit-transition', '0');
                _this._moveTo(offsetX);
                if (Math.abs(endX - _this._startX) > 5) {
                    e.preventDefault();
                }
            },

            _touchEnd: function(e, _this) {
                var finger0 = e.changedTouches[0];
                var endX = finger0.pageX;
                var offsetX = endX - _this._startX;
                var offsetY = finger0.pageY - _this._startY;
                if (Math.abs(offsetY) <= 5 && Math.abs(offsetX) <= 5) {
                    _this._click();
                } else if (Math.abs(offsetX) > 5) {
                    var index = (offsetX > 0) ? --_this._index: ++_this._index;
                    if (index < 0) {
                        index = 0;
                        _this._index = 0;
                    }
                    if (index >= _this._length) {
                        index = _this._length - 1;
                        _this._index = _this._length - 1;
                    }
                    _this._showImage(index);
                    _this._showImage(index + 1);
                    this._main.parent().parent().find('.curr_img').text(index + 1);
                    _this._main.css('-webkit-transition', '150ms');
                    if ($(".image_area_new").length) {
                        var _width = parseInt($(".image_area_new").css("width"));
                        _this._moveTo( - index * _width);
                    } else {
                        _this._moveTo( - index * _this._width + _this._left);
                    }

                }
                var total_img = parseInt($(".total_img_s").text());
                var _width = ($('.imgCover').width()) / total_img;
                var curr_img = parseInt($(".imgNum .curr_img").text());
                $('.num').css({
                    'width': _width + 'px',
                    'left': (curr_img - 1) * _width + 'px'
                });
            },
            init: function() {
                this._bindEvents();
                this._showImage(0);
                this._showImage(1);
            }
        };

        _slide.bind = function(node, duration, width, left, clickable) {
            var obj = new m58.slideX(node, duration, width, left, clickable);
            obj.init();
            return obj;
        };
        return _slide;
    })();
    return slideX;
    /*window.m58 = window.m58 || {};
     window.m58.slideX = slideX;*/
    /*console.log("oo,我执行了");
     (function () {
     if ($('.image_area').length > 0) {
     m58.slideX.bind($('.image_area ul'), '300ms', 230, 50, true);
     }
     $('.btn_back span').bind('click', function (e) {
     $('#viewBigImagebg, #viewBigImage').hide();
     $(".downloadAPP").show();
     });
     }());*/
});

define('../mod/detail', ['../mod/diaoqiZZ', '../mod/lazload', '../mod/setPicSize', '../mod/zzSlide','../mod/zzdetail_mask'],
function(diaoqiZZ, lazload, setPicSize, zzSlide,mask) {
    $(function() {
        window.m58 = window.m58 || {};
        window.m58.slideX = zzSlide;
        var globleData;
        var getMyInfos;
        var liuyanData;
        var tuijianData;
        var recommandData;
        var userData;
        var userData_arry;
        var Varry;
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
        var ptype=URLdata.from;
        var request = {
            xiangqing: function() {
                var jsonpStr=_jsonpHost+"/zz/transfer/getInfoById" + decodeURIComponent(location.search) + "&callback=?"
                //$.getJSON("http://zhuanzhuan.58.com/zz/transfer/getInfoById" + decodeURIComponent(location.search) + "&callback=?",
                $.getJSON(jsonpStr,
                function(data) {
                    globleData = data;
                    //alert("globleData:"+globleData);
                    if (data.respCode == "-1" || data.respCode == -1) {
                        $('.huadongtu').remove();
                        $('.shangpin_info').remove();
                        $('.jieshao').remove();
                        $('.tuijian').remove();
                        $(".liuyan").remove();
                        $('.xinjian').remove();
                        $('.fix_button').remove();
                        $('body').append("<div class='notfound'><img src='http://m.zhuanzhuan.58.com/Mzhuanzhuan/Mshare/img/notfound.png'><p>来不及说再见，宝贝就被删除了</p></div>");
                        /*$('.gozhuanzhuan').before();*/
                        return false;
                    } else {
                        //alert(globleData);
                        var cateId = globleData.respData.cateId;
                        var localId = globleData.respData.city;
                        var price = globleData.respData.nowPrice;
                        // alert(price);
                        Render.render_jieshao();
                        Render.render_slideImg();
                        Render.render_viewBigImage();
                        Render.render_shangpin_info();
                        request.recommand(cateId, localId, price);
                        request.fixButton();
                    }
                });
                $(".gozhuanzhuan").on("click",
                function() {
                    var diaoqi = new diaoqiZZ();
                    diaoqi.init();
                });
            },
            xinjian: function() {
                Render.render_xinjian();
            },
            liuyan: function() {
                var liuyan_jsonpStr=_jsonpHost+"/zz/transfer/getInfoComments" + decodeURIComponent(location.search) + "&pageNum=1&pageSize=20&callback=?";
                $.getJSON(liuyan_jsonpStr, function(data) {
                    liuyanData = data;
                    if (!isEmptyObject(liuyanData.respData)) {
                        Render.render_liuyan()
                    }
                })
            },
            tuijian: function() {
                var tuijian_jsonpStr=_jsonpHost+"/zz/transfer/getMlistingDetailRecommendInfos" + decodeURIComponent(location.search) + "&callback=?";
                $.getJSON(tuijian_jsonpStr,
                //$.getJSON("http://zhuanzhuan.58.com/zz/transfer/getMlistingDetailRecommendInfos" + decodeURIComponent(location.search) + "&callback=?",
                function(data) {
                    //$.getJSON("http://web.zhuanzhuan.58v5.cn/zz/transfer/getMlistingDetailRecommendInfos"+decodeURIComponent(location.search)+"&callback=?",function(data){
                    tuijianData = data;
                    if (!isEmptyObject(tuijianData.respData)) {
                        Render.render_tuijian();
                    } else {
                        $('.tuijian').remove();
                    }
                });
            },

            recommand: function(cateId, localId, price) {
                $.getJSON("http://ershou.58.com/recommend?zzDispcateId=" + cateId + "&localId=" + localId + "&price=" + price + "&infoNum=4&callback=?",
                function(data) {
                    recommandData = data;
                    if (!isEmptyObject(recommandData.respData)) {
                        if(ptype!=undefined && ptype != ''){
                       
                        }else{
                            Render.render_recommand();
                        }
                        
                    } else {
                        $('.recommand').remove();
                    }
                });
            },
            fixButton: function() {
                Render.render_fixButton();
            },
            init: function() {
                request.xiangqing();
                request.liuyan();
                request.tuijian();
                request.xinjian();
            }
        };
        var Render = {
            render_slideImg: function() {
                var _parent = $(".huadongtu");
                _parent.empty();
                var html = "<div class='image_area_w image_area_w_new'>";
                html += "<div class='image_area image_area_new'>";
                html += "<ul>";
                var array_img_num = globleData.respData.pics.split("|");
                var img_num = setPicSize.adjust(array_img_num, 500, 500);
                for (var j = 0; j < img_num.length; j++) {
                    if (img_num[j].length > 0) {
                        html += "<li><img src='' ref='" + img_num[j] + "'>";
                        if (globleData.respData.status == "3") {
                            html += "<span class='solder_finished'></span>"
                        } else {
                            html += " "
                        }
                        html += "</li>";
                    }
                }
                html += "</ul>";
                html += "<div class='info_bg'></div>";
                html += "<div class='solder_info'>";
                html += "<a class='solder_info_a' href='personal.html?getUid=" + globleData.respData.uid + "&uidB=" + globleData.respData.uid + "&fullCate=" + URLdata.fullCate + "&fullLocal=" + URLdata.fullLocal +"&from="+ptype+"'>";
                if ('portrait' in globleData.respData && globleData.respData.portrait != "") {
                    var portr = globleData.respData.portrait;
                    html += "<img class='solder_touxiang' src='" + portr + "'/>";
                } else {
                    html += "<img class='solder_touxiang' src='http://m.zhuanzhuan.58.com/Mzhuanzhuan/commonImg/ic_user_default.png'/>";
                }
                html += "<b class='solder_name'> " + globleData.respData.nickName + "</b></a></div>";
                html += "<div class='liulan'>" + globleData.respData.viewCount + "人浏览</div>";
                html += "<div class='imgNum'><span class='curr_img'>1</span>/<span class='total_img_s'>" + img_num.length + "</span></div>";
                html += "<span class='pic_logo'></span>";
                if (img_num.length > 1) {
                    html += "<div class='bg'>";
                    html += "<div class='imgCover'></div><div class='num' ></div></div>";
                    html += "</div></div>";
                }

                _parent.append(html);
                var total_img = img_num.length;
                var _width = ($('.imgCover').width()) / total_img;
                var curr_img = parseInt($(".imgNum .curr_img").text());
                $('.num').css({
                    'width': _width + 'px',
                    'left': (curr_img - 1) * _width + 'px'
                });
                var _w = parseInt($('.solder_name').width()) + 47;
                $('.solder_info').css('width', _w + "px");
                $('.image_area_new li').css('height', $('.image_area_new li').width() + "px");
                if ($('.image_area').length > 0) {
                    m58.slideX.bind($('.image_area ul'), '300ms', 230, 50, true);
                };
                $(".solder_info_a").on("click",
                function() {
                    if(ptype!=undefined && ptype != ''){
                        if(ptype=="ganjim"){
                            var _from="zzdetailtouxiangclick";

                        }else if(ptype=="gjmesban"){
                            var _from="gjmzzdetailtouxiangclick";

                        }else{
                            var _from="zhuanzhuan_touxiang";
                        }
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate);
                    }else{
                        var _from = "zhuanzhuan_touxiang"
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '');
                    }   
                });
            },
            render_viewBigImage: function() {
                var html = "<div id='viewBigImagebg'></div>";
                html += "<div id='viewBigImage'><div class='bigimg_topbar'>";
                html += "<div class='btn_back'><span>返回</span></div>";
                html += "<div class='bigimg_num'><span class='curr_img'>1</span>";
                var img_num = globleData.respData.pics.split("|");
                html += "/<span class='total_img'>" + img_num.length + "</span></div></div>";
                html += "<div class='bigimg_box'><ul></ul></div></div>";
                $("body").append(html);
                $('.btn_back span').bind('tap',
                function(e) {
                    $('#viewBigImagebg, #viewBigImage').hide();
                    $('.pic_logo,.solder_info,.backlist').show();

                });
            },
            render_shangpin_info: function() {
                var _parent = $(".shangpin_info");
                _parent.empty();
                var html = "<div class='jiage'>";
                var nowPr = parseInt(globleData.respData.nowPrice);
                var oriPr = parseInt(globleData.respData.oriPrice);
                if (nowPr > 10000) {
                    nowpr = ((nowPr / 10000).toFixed(2)) + "万";
                }
                if (oriPr > 10000) {
                    oriPr = ((oriPr / 10000).toFixed(2)) + "万";
                }
                html += "<span>￥<strong>" + nowPr + "</strong></span>";
                if (oriPr > 0) {
                    html += "<b>￥" + oriPr + "</b>";
                }
                if (globleData.respData.freigth > 0) {
                    html += "<i>运费" + globleData.respData.freigth + "元</i>";
                }

                html += "<div class='miaoshu'>" + globleData.respData.title + "&nbsp;&nbsp;&nbsp;&nbsp;" + globleData.respData.content + "</div>";
                html += "<div class='weizhi'><p></p>";
                if ('villageName' in globleData.respData) {
                    html += "<span>" + globleData.respData.cityName + "</span> <b> &nbsp;|&nbsp; </b><a href='xiaoqu.html?villageId=" + globleData.respData.village + "'> " + globleData.respData.villageName + " </a>";
                } else if ('businessName' in globleData.respData) {
                    html += "<span>" + globleData.respData.cityName + "</span> <b> &nbsp;|&nbsp; </b><span> " + globleData.respData.businessName + " </span>";
                } else {
                    html += "<span>" + globleData.respData.cityName + "</span> <b> &nbsp;|&nbsp; </b><span> " + globleData.respData.areaName + " </span>";
                }
                html += "</div>";
                if (globleData.respData.label.length > 0) {
                    html += "<div class='biaoqian'>";
                    var biaoqian = globleData.respData.label.split("|");
                    for (var j = 0; j < biaoqian.length; j++) {
                        if (biaoqian[j].length > 0) {
                            html += "<p>" + biaoqian[j] + "</p>";
                        }
                    }
                    html += "</div>";
                }
                var len = globleData.respData.loveUserHeadImg.length;
                var peopleNm = globleData.respData.collectCount;
                if (len > 0) {
                    html += "<div class='xihuan'><span>" + peopleNm + "人喜欢</span>";
                    if (len > 4) {
                        html += "<b></b>";
                    }
                    for (var ii = 0; ii < len; ii++) {
                        if (globleData.respData.loveUserHeadImg[ii] && globleData.respData.loveUserHeadImg[ii] != '') {
                            var loveUserHeadImg = globleData.respData.loveUserHeadImg[ii];
                            html += "<img src='" + loveUserHeadImg + "'/>";
                        } else {
                            html += "<img src='http://pic2.58cdn.com.cn/p1/big/n_v1bl2lwtlr3pzflqs2ympa.jpg%7C/p1/big/n_v1bkuymc3s3pzfkuu2b4yq.jpg'/>";
                        }
                    }
                    html += "</div></div>";
                }
                _parent.append(html);
                /*$(".want").on("tap",function(){
                var diaoqi = new diaoqiZZ();
                diaoqi.init();
            });*/
            },
            render_jieshao: function() {
                var _parent = $(".jieshao");
                _parent.empty();
                var html = "";
                html += "<a href='personal.html?getUid=" + globleData.respData.uid + "&uidB=" + globleData.respData.uid + "&fullCate=" + URLdata.fullCate + "&fullLocal=" + URLdata.fullLocal +"&from="+ptype+"'><div class='personal_info'>";
                html += "<strong>  </strong>";
                if ('portrait' in globleData.respData && globleData.respData.portrait != '') {
                    var portr = globleData.respData.portrait;
                    html += "<img class='touxiang' src='" + portr + "'/>";
                } else {
                    html += "<img class='touxiang' src='http://m.zhuanzhuan.58.com/Mzhuanzhuan/commonImg/ic_user_default.png'/>";
                }
                html += "<p>" + globleData.respData.nickName + "</p>";
                html += "<span>" + globleData.respData.cityName + "</span>";
                html += "<div class='info'>";
                if (globleData.respData.goodCommentCount && parseInt(globleData.respData.goodCommentCount) > 0) {
                    html += "<b>好评<i>" + globleData.respData.goodCommentCount + "</i></b>";
                }
                if (globleData.respData.sellingCount && parseInt(globleData.respData.sellingCount) > 0) {
                    html += "<b>宝贝<i>" + globleData.respData.sellingCount + "</i></b>";
                }
                if (parseInt(globleData.respData.joinDays, 10) < 10) {
                    html += "<b>转转新人</b></div></div></a>";
                } else if (parseInt(globleData.respData.joinDays, 10) < 365) {
                    html += "<b>加入转转<i>" + globleData.respData.joinDays + "</i>天</b></div></div></a>";
                } else {
                    var days = Math.floor(parseInt(globleData.respData.joinDays, 10) / 365);
                    html += "<b>加入转转<i>" + days + "</i>年</b></div></div></a>";
                }
                _parent.append(html);
                $(".jieshao a").on("click",
                function() {
                    //clickLog("maidian_render_jieshao");
                    if(ptype!=undefined && ptype != ''){
                        if(ptype=="ganjim"){
                            var _from="zzdetailgerenclick";

                        }else if(ptype=="gjmesban"){
                            var _from="gjmzzdetailgerenclick";

                        }else{
                            var _from="zhuanzhuan_gerenxinxi";
                        }
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate);
                    }else{
                        var _from="zhuanzhuan_gerenxinxi"
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '')
                    }
                });
            },
            render_liuyan: function() {
                var _parent = $(".liuyan");
                _parent.empty();
                var len = liuyanData.respData.length;
                if (len > 0) {
                    var html = "<div class='content'><h5>留言<span>（" + len + "）</span></h5>";
                    html += "<ul>";
                    if (len > 3) {
                        len = 3
                    }
                    for (var ii = 0; ii < len; ii++) {
                        if ("portrait" in liuyanData.respData[ii] && liuyanData.respData[ii].portrait != "") {
                            var portr = setPicSize.adjust(liuyanData.respData[ii].portrait, 100, 100);
                            html += "<li><img class='touxiang' src='" + portr + "'/>"
                        } else {
                            html += "<li><img class='touxiang' src='http://img.58cdn.com.cn/zhuanzhuanftp/mzz/images/common/ic_user_default.png'/>"
                        }
                        var time = caluateTime(liuyanData.respData[ii].time);
                        html += "<div class='time'>" + time + "</div>";
                        html += "<p><b>" + liuyanData.respData[ii].fromNickName + "</b>";
                        if ("toNickName" in liuyanData.respData[ii] && liuyanData.respData[ii].toNickName != "") {
                            html += "<span>回复</span><strong>@" + liuyanData.respData[ii].toNickName + "</strong>"
                        }
                        html += "</p><div class='xinxi'>" + liuyanData.respData[ii].content + "</div></li>"
                    }
                    html += "</ul>";
                    if (liuyanData.respData.length > 3) {
                        html += "<div class='seeAll'>查看全部留言<span></span></div></div>"
                    }
                }
                _parent.append(html);
                if ($(".seeAll").length > 0) {
                    $(".seeAll").on("click",function() {
                        var _from="zhuanzhuan_morecomment"
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '')
                        var diaoqi = new diaoqiZZ;
                        diaoqi.init('detail', URLdata.infoId,true,this); //传入caller，触发的dom

                    })
                }
                $(".content").css("border-top", "1px solid #e7e7e7")
            },
            render_tuijian: function() {
                var _parent = $(".tuijian");
                var html = '';
                _parent.empty();
                var len = tuijianData.respData.length;
                if (len > 0) {
                    var html = "<h5>更多宝贝，都在转转</h5>";
                    html += "<ul>";
                    if (len > 3) {
                        len = 3;
                    }
                    for (var ii = 0; ii < len; ii++) {
                        var infoImage = setPicSize.adjust(tuijianData.respData[ii].infoImage, 210, 280);
                        html += "<li class='tuijian_li'><a href='" + tuijianData.respData[ii].infoUrl +"&from="+ptype+ "'><div class='list_img'><img rel='" + infoImage + "'>";
                        html += "<p>￥" + tuijianData.respData[ii].nowPrice + "</p></div></a></li>";
                    }
                }
                html += "</ul>";
                _parent.append(html);
                $('.list_img').css('height', $('.list_img').width() + "px");
                $(".tuijian li").each(function() {
                    var ll = new lazload($(this), 1);
                    ll.init();
                });
                $(".tuijian li").on("click",
                function() {
                    //clickLog("maidian_zztuijian");
                    if(ptype!=undefined && ptype != ''){
                        if(ptype=="ganjim"){
                            var _from="zzdetailtuijianclick";

                        }else if(ptype=="gjmesban"){
                            var _from="gjmzzdetailtuijianclick";

                        }else{
                            var _from="zhuanzhuan_tuijian";
                        }
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate);
                    }else{
                        var _from="zhuanzhuan_tuijian";
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '') 
                   }
                });
            },
            render_recommand: function() {
                var _parent = $(".recommand");
                var html = '';
                _parent.empty();
                var respData = recommandData.respData;
                var len = recommandData.respData.length;
                if (len > 3) {
                    var len = 4;
                    var html = "<p class='tip'>58推荐</p>";
                    html += '<div class="reco_price"><p class="reco_title"><i class="reco_pri"></i>';
                    html += '同价位的' + recommandData.cateName;
                    html += '</p>';
                    html += '<ul class="list-info">';

                    respData.map(function(item, index) {
                        if (item && index < 4) {
                            var infoUrl = item.mUrl;
                            var price = item.price;
                            var biz = item.biz;
                            var title = item.title;
                            var pic = item.pic;
                            var postDate = item.postDate;
                            var cityName = item.city;

                            html += '<li><a href="' + infoUrl + '"> ';
                            html += '<div class="img_wrap"><img src="' + pic + '" class="info_img"></div>';
                            //html += "<div class='img_wrap'><img class='info_img' rel='"+infoImage+"'></div>";
                            //html += "<p>￥"+recommandData.respData[ii].nowPrice+"</p></div></a></li>";
                            html += '<dl><dt class="tit">' + title + '</dt>';
                            html += '<dd class="attr"><span class="img_num">' + biz + '&nbsp;/&nbsp;</span>' + cityName + '&nbsp;/&nbsp;' + postDate + '</dd>';
                            html += '<dd class="attr"><span class="price"> <strong>' + price + '</strong></span></dd></dl>';
                            html += "</a></li>";
                        }
                    });

                    html += "</ul></div>";
                    //html += "<div class='reco_more_button'><a class='reco_more_app pagetype='link' actiontype='click' title='转转列表页' url='http://m.58.com/bj/iphonesj/pve_5463_678615?minprice=3040_4560'>查看更多  &gt;";
                    html += '<i class="arrow_right_blue"></i></a><div></div>';
                    html += '<a href="' + recommandData.recommendUrl + '" class="reco_more">更多同价位的' + recommandData.cateName + '&nbsp;>';
                    html += '<i class="arrow_right_blue"></i></a></div>';
                    html += '';
                    _parent.append(html);
                    $('.img_wrap').css('height', $('.img_wrap').width() + "px");
                    clickLog('from=detail_zz_tongjiawei_show&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '')

                    $(".list-info li a").on("click",
                    function() {
                        //clickLog("maidian_zztuijian");
                        clickLog('from=detail_zz_tongjiawei_click&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '')

                    });
                    $(".reco_more").on("click",
                    function() {
                        //clickLog("maidian_zztuijian");
                        clickLog('from=detail_zz_tongjiawei_more&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '')

                    });
                } else {
                    _parent.empty();
                }
                //  /*$(".list-info li").each(function() {
                //         var ll = new lazload($(this),1);
                //         ll.init();
                //     });*/
                //    /* $(".recommand_li").delegate("a", "click", function() {
                //         var That = $(this);
                //         getUrl(That)
                //     });
                //     $(".reco_more_button").delegate("a", "click", function() {
                //         var That = $(this);
                //         getUrl(That)
                //     });*/
            },
            render_xinjian: function() {
                var _parent = $(".xinjian");
                _parent.empty();
                var html = '';
                html += '<img class="xinjian_img" src="img/detial_xin.png" alt=""></a>';
                html += '<span class="xinjian_download"></span>';
                _parent.append(html);
                var n = 0;
                $(".xinjian").on("click",
                function() {
                    var diaoqi = new diaoqiZZ();
                    // 区分m端58和赶集的埋点
                    if(ptype!=undefined && ptype != ''){
                        if(ptype=="ganjim"){
                            var _from="zzdetailxxxiazaiclick";

                        }else if(ptype=="gjmesban"){
                            var _from="gjmzzdetailxxxiazaiclick";

                        }else{
                            var _from="zhuanzhuan_xiaoxin";
                        }
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate);
                    }else{
                        var _from="zhuanzhuan_xiaoxin"
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '');
                    }
                    diaoqi.init('detail', URLdata.infoId);
                });

                /*$(".xinjian").on("touchstart", function() {

                 });*/
            },
            render_fixButton: function() {
                var _parent = $(".fix_button");
                _parent.empty();
                var html = '<span class="fix_price">总价：';
                var nowPr = parseInt(globleData.respData.nowPrice);
                if (nowPr > 10000) {
                    nowpr = ((nowPr / 10000).toFixed(2)) + "万";
                };
                html += '<i>' + nowPr + '</i>元</span>';
                if(ptype!=undefined && ptype != ''){
                    if(ptype=="ganjim"||ptype=="gjmesban"){
                        html += '<span class="fix_gozhuanzhuan">联系卖家，去转转</span>';
                    }else{
                        html += '<span class="fix_gozhuanzhuan">来转转，领20元红包</span>';
                    }
                }else{
                    html += '<span class="fix_gozhuanzhuan">来转转，领20元红包</span>';
                }
                _parent.append(html);
                mask.init();
                $("body").on("click",".zzdetail_mask .tiyan",function(){
                    //红包弹窗，区分赶集和58点击埋点
                    var type=ptype?((ptype=="ganjim"||ptype=="gjmesban")?'1':'0'):'0';
                    var maskfrom=(type=="0")?"zz_tankuangclick":"gjmhbtcclick";
                    clickLog('from='+maskfrom);
                    $(".zzdetail_gray, .zzdetail_mask").remove();
                    $("body").attr("style", "");
                    var diaoqi=new diaoqiZZ();
                    diaoqi.init('detail',URLdata.infoId);
                })
                $("body").on("click",".zzdetail_mask_close",function(){
                    clickLog('from=zz_tankuangclose');
                    $(".zzdetail_gray, .zzdetail_mask").remove();
                    $("body").attr("style", "");
                })

                $(".fix_gozhuanzhuan").on("click",
                function() {
                    var diaoqi = new diaoqiZZ();
                    // 区分m端58和赶集的埋点
                    if(ptype!=undefined && ptype != ''){
                        if(ptype=="ganjim"){
                            var _from="zzdetailxiazaiclick";
                            diaoqi.init('detail', URLdata.infoId,true);

                        }else if(ptype=="gjmesban"){
                            var _from="gjmzzdetailxiazaiclick";
                            diaoqi.init('detail', URLdata.infoId,true);

                        }else{
                            var _from="zhuanzhuan_xiazai";
                            diaoqi.init('detail', URLdata.infoId);
                        }
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate);
                    }else{
                        var _from="zhuanzhuan_xiazai";
                        clickLog('from='+_from+'&cate=' + URLdata.fullCate + '&area=' + URLdata.fullLocal + '');
                        diaoqi.init('detail', URLdata.infoId);
                    }
                   
                });
            },
        };
        function caluateTime(tt) {
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
        };
        function isEmptyObject(obj) {
            for (var n in obj) {
                return false
            }
            return true;
        };
        
        request.init();
    });
});
define('../mod/zzdetail_mask',['../mod/cookie','../mod/diaoqiZZ'],function(cookie,diaoqi){
    
    var mask={
        init:function(){
            if(!cookie.get("zzdetail_mask")){
                var height = $(window).height();
                var width = $(window).width();
                var zzdetail_gray='<div class="zzdetail_gray"></div>';
                var zzdetail_mask='<div class="zzdetail_mask"><img class="tiyan" src="img/zzdetail_mask.png" /><img class="zzdetail_mask_close" src="img/zzdetail_mask_close.png" /></div>';
                $("body").append(zzdetail_gray,zzdetail_mask);
                $(".zzdetail_gray, .zzdetail_mask").show();
                //红包弹窗，区分赶集和58的展现埋点
                var type=ptype?((ptype=="ganjim"||ptype=="gjmesban")?'1':'0'):'0';
                var maskfrom=(type=="0")?"zz_tankuang":"gjmhbtcshow";
                clickLog('from='+maskfrom);
                $("body").css({
                    position: "fixed",
                    left: 0,
                    top: 0,
                    height: height,
                    overflow: "auto",
                    overflow: "hidden"
                })
                
                cookie.set("zzdetail_mask", 1, 7);
                $(".zzdetail_gray, .zzdetail_mask").on("touchmove",function(){
                    return false;
                })
                
            }
        }
    }
        
    // })
    return mask;

})
define("../mod/cookie", [], function() {
    var cookie = {
        set:function (key,value,t){
            var oDate=new Date();
            oDate.setDate(oDate.getDate()+t);
            document.cookie=key+'='+value+';expires='+oDate.toGMTString();
        },
         get:function(key){
            if(document.cookie){
                var arr=document.cookie.split('; ');
                for(var i=0;i<arr.length;i++){
                    var arr1=arr[i].split('=');
                    if(arr1[0]==key){
                        return arr1[1];
                    }
                }
            }
        },
         remove:function(key){
            setCookie(key,'',-1);
        }
    }
    return cookie;
});
define('listing_detail_common', ['../mod/detail'],
function(detail) {

});