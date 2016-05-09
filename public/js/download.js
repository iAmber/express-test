(function () {
		var URLdata={
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
		function MdiaoqiZZ(){ }
		MdiaoqiZZ.prototype = {
		    hasApp:true,
		    URLdata:{},
		    init: function(openType, id) {
		        var __this = this;
		        if ($.os.ios) {
		            this.downIOS(openType, id);
		            setTimeout(function () {
		                if (!__this.hasApp) {
		                    window.location.href = "https://itunes.apple.com/cn/app/id1002355194";
		                }
		            }, 900);
		        } else {
		            if('client' in __this.getUserData() && (__this.getUserData().client == '58APP' || __this.getUserData().client == '58app')){
		                WBAPP.downloadApp("open", "1002355194", websiteConf.url_android, "com.wuba.zhuanzhuan", "com.wuba.zhuanzhuan.activity.LaunchActivity");
		            }else{
		                this.downAndriod(openType, id);
		                setTimeout(function () {
		                    if (!__this.hasApp) {
		                        window.location.href = websiteConf.url_android;
		                    }
		                }, 900);
		            }
		        }
		        
		    },
		    downIOS: function(openType, id) {
		        var timeout,t1 ;
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
		        timeout = setTimeout(function () {
		                        _this.try_to_open_app(t1);
		                    }, 500);
		        return false
		    },
		    downAndriod: function(openType, id) {
		        var timeout,t1 ;
		        var ifr = document.createElement("iframe");
		        ifr.setAttribute("style", "display:none");
		        if (openType == undefined || id == undefined) {
		            t1 = Date.now();
		            ifr.setAttribute("src", "zhuanzhuan://");
		        } else {
		            t1 = Date.now();
		            ifr.setAttribute("src", "zhuanzhuan://?openType=" + openType + "&id=" + id)
		        }
		        document.body.appendChild(ifr);
		        var _this = this;
		        timeout = setTimeout(function () {
		                        _this.try_to_open_app(t1);
		                    }, 500);
		        return false
		    },
		    try_to_open_app:function(t1){
		        var t2 = Date.now();
		         if (!t1 || t2 - t1 < 700) {
		            this.hasApp = false;
		        }
		    },
		    getUserData:function() {
		        var userData = decodeURIComponent(location.search).replace("?","");
		        var userData_arry = userData.split("&");
		        if(userData_arry.length>0){
		            for(var i=0;i<userData_arry.length;i++){
		                    var Varry = userData_arry[i].split("=");
		                    this.URLdata[Varry[0]] = Varry[1];
		                }
		        }
		        return this.URLdata;
		    }
		};
		MdiaoqiZZ.prototype.constructor = MdiaoqiZZ;
		URLdata.getUserData();
		var zzinfoId=URLdata.infoId;
		var zzfrom=URLdata.zzfrom;
		var zhuanzhuanSourceFrom=URLdata.zhuanzhuanSourceFrom;

		if(zzinfoId&&zzinfoId!==undefined&&zzinfoId!==''){
			var diaoqizz = new MdiaoqiZZ();
			diaoqizz.init('detail',zzinfoId);
		}else{
			var diaoqizz = new MdiaoqiZZ();
			diaoqizz.init();
		}
		
		



}());