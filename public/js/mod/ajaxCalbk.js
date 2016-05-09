/**
 * 专区数据请求回调处理
 */

define(['../common/util', '../common/lazyload', '../common/exceptionTip','../common/setPicSize','./lunbo','../common/config'], function(util, LazyLoad, exceptionTip,setPicSize,lunbo,config) {
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
            var downloadUrlStr=downloadUrl+'?'+"&"+__global4fe.afterSearch;
            var downloadUrlStrCode=encodeURIComponent(downloadUrlStr);
            var erweima_api='http://api.vip.58.com/genqrcode?size=200x200&margin=0&content='
            var apiUrl=erweima_api+downloadUrlStr;
            console.log(apiUrl);
            if(__global4fe.zzfrom&&__global4fe.zzfrom!==undefined){
                var erweimaImgStr='<img src="'+erweima_api+downloadUrlStrCode+'" alt=""/>'
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
                    galleryImgHtml+='<li><img rel="'+galleryImg+'" alt=""></li>'
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
                +'<p>'+spInfoRespData.content+'</p>'
                +'<i class="right">喜欢就快联系我吧，我在转转等你。</i>'
              +'</div>'
              +'<div class="boby_pic">'
                +picsHtml
              +'</div>';

            var galleryLunbo='<div class="g_img"><span><img id="img1" rel="'+galleryImg0+'"></span></div>'
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
                        var liuyanImg='<span class="liuyan_face"><img src="'+portr+'" alt=""></span>'
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
                util.render(liuyan_title[0],liuyan_titleStr,true,function() {
                    var imgLoad = new LazyLoad(liuyan_title, 1);
                    imgLoad.init();
                });
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
                touxiang='<div class="personal_touxiang">'+'<img src="'+portr+'" alt="">'+'</div>';
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
                        baby_desc+='<li class="clearfix" onclick="clickLog(\''+clickLogStr+'\')" url="'+url+'"><dl>'+'<dt><img rel="'+picUrl+'" alt=""></dt>'
                                  +'<dd>'+babytitleStrUtil+'</dd>'
                                  +'<dd class="info_price"><i>'+babydata[i].nowPrice+'</i>元</dd></dl></li>';
                    }
                    baby_desc+='</ul>';
                }
            }
            
            util.render(sale_baby[0],baby_desc,true,function() {
                var imgLoad = new LazyLoad(sale_baby, 1);
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
                        if(tuijianUrlStrPath&&tuijianUrlStrPath!==undefined&&tuijianUrlStrPath!==""){
                            var tuijianUrlStrPathHtml="&cateId="+tuijianUrlStrPath+"&";
                        }else{
                            var tuijianUrlStrPathHtml='&';
                        }
                        var pic= tuijiandata[i].infoImage;
                        var picUrl=setPicSize.adjust(pic,100,75);

                        var url=location.pathname+'?infoId='+tuijiandata[i].infoId+tuijianUrlStrPathHtml+__global4fe.afterSearch;
                        tuijian_desc+='<li class="clearfix" onclick="clickLog(\''+clickLogStr+'\')" url="'+url+'"><dl>'+'<dt><img rel="'+picUrl+'" alt=""></dt>'
                                  +'<dd>'+tuijiandata[i].title+'</dd>'
                                  +'<dd class="info_price"><i>'+tuijiandata[i].nowPrice+'</i>元</dd></dl></li>';
                    }
                    tuijian_desc+='</ul>';
                    util.render(tuijian[0],tuijian_desc,true,function() {
                        var imgLoad = new LazyLoad(tuijian, 1);
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
