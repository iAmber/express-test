define(['../common/config'],function(config) {
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
                var downloadUrlStr=downloadUrl+'?infoId='+__global4fe.infoId+"&"+__global4fe.afterSearch;
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