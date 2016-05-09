define(['./diaoqiZZ', './lazyload', './backtop', './tank','./getData',],
function(diaoqiZZ, lazyload, backtop,tank,getData) {
    var load = function(){
    	alert("text");
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
		// 	__global4fe.tankWord="网页版暂不支持，快来下载APP吧";
		// 	__global4fe.clickClose="tan_close";
		// 	tank.tankShow();
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