define([], function() {
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