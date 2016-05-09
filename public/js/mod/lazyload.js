/*
    comment: images lazyload模块
*/
define([], function() {
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
