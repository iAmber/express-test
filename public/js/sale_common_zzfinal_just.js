var svn_revision =4268;

define('common/config',[],function(){
	var feCfg = ____json4fe,
		config = {};
	if (feCfg.locallist) {
		var city;
		if ($.isArray(feCfg.locallist)) {
			city = feCfg.locallist[0];
			locallist = feCfg.locallist;
		} else {
			city = feCfg.locallist;
			locallist = [city];
		}
		config.city = city;
		config.locallist = locallist;
	}
	if (feCfg.catentry) {
		var rootcate, cate, catelist;
		if ($.isArray(feCfg.catentry)) {
			cate = feCfg.catentry[feCfg.catentry.length - 1];
			catelist = feCfg.catentry;
		} else {
			cate = feCfg.catentry;
			catelist = [cate];
		}
		if (feCfg.rootcatentry) {
			catelist.unshift(feCfg.rootcatentry);
		}
		rootcate = catelist[0];
		config.rootcate = rootcate;
		config.cate = cate;
		config.catelist = catelist;
	}
	var g = feCfg.modules,
	f = g == "home" || g == "homepage",
	e = g == "list" || g == "listpage",
	d = g == "final" || g == "finalpage",
	n = g == "my" || g == "mypage",
	k = g == "post" || g == "postpage";
	
	config.j = feCfg;
	config.isHome = g == "home" || g == "homepage";
	config.isList = g == "list" || g == "listpage";
	config.isFinal = g == "final" || g == "finalpage";
	config.isMy = g == "my" || g == "mypage";
	config.isPost = g == "post" || g == "postpage";
	
	return config;
});
/*
	本版本是修改过的版本，修改如下：
	1、options.domain默认设置成'.58.com'（Line：24）
	2、options中传入method，表示要编码、解码（escape、encodeURIComponent）的方法（之所以要用这个参数是因为ipcity这个cookie对应的值是用escape编码的，PPU这个cookie是用encodeURIComponent编码的。默认用encodeURIComponent。至于为什么用不同的编码方式，表示不知道～）
*/
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {expires : 365};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
		var method = encodeURIComponent;
		if(options && options.method == escape){
			method = escape;
		}
        var path = options.path ? '; path=' + options.path : '';
		options.domain = options.domain ? options.domain : '.58.com';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', method(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
					var method = decodeURIComponent;
					if(options && options.method == unescape){
						method = unescape;
					}
                    cookieValue = method(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
define("common/jQuery.cookie", function(){});

define('common/util.string',[],function () {
  return {
    isString: function (v) {
      return $.type(v) === 'string';
    },
    format: function (str) {
      var args = $(arguments).toArray().slice(1);
      return str.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
      });
    },
    trim: function(source){  
        var re = /^\s+|\s+$/g;  
        return source.replace(re, "");  
    }, 
    /** 
     * 截取字符串，判断全角半角，全角占用2个长度
     */
    substringEx: function (source, length) {
      if (source.length * 2 <= length) return source;
      var index = 0;
      for (var i = 0, leni = source.length; i < leni; i++) {
        if (source.charCodeAt(i) > 128) {
          index += 2;
        } else {
          index++;
        }
        if (index == length) {
          return source.substring(0, i + 1);
        } else if (index == length + 1) {
          return source.substring(0, i);
        }
      }
      return source;
    },
    getLengthEx: function (source) {
      var index = 0;
      for (var i = 0, leni = source.length; i < leni; i++) {
        if (source.charCodeAt(i) > 128) {
          index += 2;
        } else {
          index++;
        }
      }
      return index;
    },
    getShortText: function (source, length) {
      if (length < 3) return '...';
      return this.getLengthEx(source) > length ? this.substringEx(source, length - 3) + '...' : source;
    }
  };
});

define('common/login',['common/jQuery.cookie', 'common/config', 'common/util.string'], function(cookie, config, string){
	/**  
	目前主站登录后系统会添加的cookie：
	58cooper 给第三方合作商用的标识
	www58com（deprecated，v8重构准备弃用） 旧版登录标识，前端很多脚本依赖这个cookie显示用户名
	PPU（v8以后用这个来判断是否已经登录） 新版登录标识，每个项目中提供给passport客户端和前端使用
    */
	var CONF = {
		LOGINURL : 'https://passport.58.com/login/?callback=?',
		LOGINOUTURL : 'http://my.58.com/ajax/loginout/?callback=?',
		SIMLOGINURL : 'http://my.58.com/simlogin/?callback=?&type=ajax&radom=',
		MSGURL : 'http://message.58.com/api/msgcount/?callback=?',
		COOKIEKEY : 'PPU'
	};
	var cookieMap = {};
	var login = {
		containerid : "logintext",
		parseCookie : function(){
			var val = $.cookie(CONF.COOKIEKEY);		
			if (!val) 
				return;
			//PPU="UID=1"，先把外层的双引号去掉
			val = val.substring(1, val.length - 1).split('&');	
			for(var i = 0, len = val.length; i < len;i ++){
				var kv = val[i].split('=');
				cookieMap[kv[0]] = kv[1];
			}
		},
		isLogin : function(){
			var userId = this.getUserId();
			return userId &&　0 != userId;
		},
		login : function(){
			/*var self = this;              
			boot.require('widgets.window', function (Frame, win) {              
				win.getInstance().show("登录", self.simLOGINURL, 300, 200, true);              
			});*/              		
		},
		getUserId : function(){
			return cookieMap['UID'] || '0';
		},
		getUserName : function(){
			return decodeURIComponent(cookieMap['UN'] || '');
		},
		getSiteKey : function(){
			return cookieMap['SK'] || '';
		},
		logout : function(){
			/*var self = this;              
			js.jsonp(this.logouturl, null, function () {              
				self.show();              
				Frame.log('business.user', 'success', '用户成功注销');              
			}, function () {              
				Frame.log('business.user', 'error', '用户注销失败');              
			});*/              		
		},
		getRegParam:function(){
            var utm_arg = '';
            try{
                var params = window.location.search.split("&"),
                    args = [];
                    for(var i=params.length;i--;){
                        var key = params[i].split("=")[0];
                        if(key.indexOf("utm_source") != -1){
                            args[0] = params[i].split("=")[1];
                        }
                        if(key.indexOf("spm") != -1){
                            args[1] = params[i].split("=")[1];
                        }
                    }
                    utm_arg = (args.length==2)?"?utm_source="+args[0]+"&spm="+args[1]:"";
                }catch(e){
                    utm_arg = "";
                }
                return utm_arg;
        },
		show : function(){
			var container = $('#' + this.containerid);
			if(!container.length){
				return;
			}
			var utm_arg = this.getRegParam();
			var loginHtml = '<a href="https://passport.58.com/login/?path={0}" target="_self">登录</a><span class="gap">|</span><a href="https://passport.58.com/reg/'+utm_arg+'" target="_self">注册</a>', 
				infoHtml = '', 
				msgHtml = '';
			if(!config.isMy){
				infoHtml = '{0}{1}<a href="https://passport.58.com/logout?path={2}&back=now" style="margin-left:10px" target="_self">退出</a>';
				msgHtml = '(<span class="red"><a style="color:#F00;margin: 0px;" href="http://my.58.com/liuyanjieshou/" title="你有{0}条未读短信息">{0}</a></span>)';		
			}
			var outUrl = escape(location.href);
			if(this.isLogin()){
                if(!$.cookie("bangtoptipclose")){          
					infoHtml += '<div id="bangtoptip" style="display: block; width: 270px;left: -52px;" class="msgTips"><i class="msgTips_arrow" style="left: 143px;"></i><i class="msgTips_close" onclick="document.getElementById(\'bangtoptip\').style.display=\'none\';"></i><div class="msgTips_con" style="background-position:0 -1999px; padding:5px 10px;">现在使用58帮帮独享三大特权！<a href="http://bangbang.58.com?source=9" target="_blank"><font color="#0000ff">查看详细>></font></a></div><i class="shadow"></i></div>';              
					window.setTimeout(function(){              
						$('#bangtoptip').hide();              
						$.cookie('bangtoptipclose',1);              
					},20000);              
                }    
				var _this = this;
				$.getJSON(
					CONF.MSGURL,{
						userid : _this.getUserId(),
						type : 3
					},
					function(data){      
						container.html(
							string.format(
								infoHtml, 
								_this.getUserName(), 
								data.count > 0 ? string.format(msgHtml, data.count) : '',
								outUrl
							)
						);      
					}
				);    
			}
			else{
				/*var host = window.location.hostname,
					hosthome = host.substring(0, host.indexOf("."));*/
				container.html(string.format(loginHtml, outUrl));   
			}
		}
	};
	login.parseCookie();
	return login;   
});
define('common/imLoad',['common/config', 'common/jQuery.cookie', 'common/login'], function(config, cookie, login){

	/*(function(){
		if(config.j.loadImState=="1"){
			return;
		}
		var strStyle=" position:fixed;bottom:36px;right:0px;";
		if (im_isIE6) {
			strStyle='_position: absolute;TOP: expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight-' +36 + ');right:0px;';
		}
		var str='<style type="text/css">body,dl,ol,ul,li,dt,dd,p,h2,h3,h4{margin:0;padding:0;list-style:none;-webkit-text-size-adjust:none}'
				//+'body{font:12px/1.2 arial,Tahoma,"SimSun",sans-serif;color:#333;}'
				+'#bangpop a{text-decoration:none; color:#0054c7} #bangpop a:hover{text-decoration:underline}'
				+'#bangpop .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden} #bangpop .clearfix{display:inline-block;}'
				+'#bangpop * html .clearfix {height:1%;}#bangpop .clearfix {	display:block;}'
				+'#bangpop.talk {display:none;'+strStyle+'width:173px;height:126px;padding:2px; background:url(http://img.58cdn.com.cn/bangbang/im/talkicon.gif) no-repeat 0 -33px; overflow:hidden;}'
				+'#bangpop a.close{width:9px;height:9px; overflow:hidden;background:url(http://img.58cdn.com.cn/bangbang/im/talkicon.gif) no-repeat; display:inline-block; overflow:hidden; cursor:pointer;position:absolute;top:9px;right:9px;}'
				+'#bangpop .t_bd{padding:26px 0px 0px 10px; line-height:26px;font-size:14px;}'
				+'#bangpop .t_bd a{color:#006aad}'
				+'#bangpop a.zixunbtn{width:74px;height:26px; display:inline-block; background:url(http://img.58cdn.com.cn/bangbang/im/zixun1.gif);line-height:20px; text-align:center;color:#fff;float:right; margin:10px }'
				+'</style>'
				+'<div id="bangpop" class="talk"><a href="javascript:void(0);" class="close"></a><div class="t_bd"><a href="javascript:void(0)"  name="zaixian" class="uname" ></a>在线哦<br/>    '
        +'在线沟通有效保护隐私！<a href="javascript:void(0);" name="zaixian" class="zixunbtn" alt="一键咨询"></a></div></div>';
		$(document.body).append(str);
		$("#bangpop .close").click(function(){
			$("#bangpop").hide();
			return false;
		});
	}());*/

	window.IM_Init_Btn = function(result){
		if(!result)
			return;
		
		var ntalkGif = 'http://img.58cdn.com.cn/bangbang/res/images/offline.gif',
			talkGif = 'http://img.58cdn.com.cn/bangbang/res/images/online.gif';  
		if(config.isFinal){  
			for(var i = 0; i < result.length; i++) {  
				var DOC = document;  
				var o = DOC.getElementById("imgbang"+result[i].uid),tip=DOC.getElementById("bantip");  
				if(o) {  
					var c = config;  
					var t={id:c.j.infoid,title:im_page_title.oldTitle,url:location.href,uid:c.j.userid,pubTime:'',publisher:''};
					if($("#v-hasjl").length>0){
						t.tipsInCB=$("#v-hasjl").html();
					}
					o.style.display = '';  
					o.onclick = function(){  
						if(!swfobject.hasFlashPlayerVersion(im_fp_version)){
							showFLVTooLow();
							return;
						}
						IM_SendMessage(c.j.userid,t);  
						//$("#bangpop").hide();
                         var sta = location.search.substring(1).split("&");
                        var pd, str, psid, inx, type;

                        for (var i = 0; i < sta.length; i++) {
                            if (sta[i].indexOf("psid") > -1) {
                                pd = sta[i].split("=")[1];

                            }
                            if (sta[i].indexOf("entinfo") > -1) {
                                str = sta[i].split("=")[1];
                                inx = str.indexOf("_") + 1;
                                type = str.substring(inx);
                            }
                        }
                        if (____json4fe.sid == "") {
                            psid = pd;
                        } else {
                            psid = ____json4fe.sid;
                        }
						 clickLog("'from=FC_bangbang_message&entityId="+____json4fe.infoid+"&entityType="+type+"&psid="+psid+"'");
					}  
					if(result[i].status == "0") {  
						o.src = ntalkGif;  
					} else {  
						if(require)
							require(['http://img.58cdn.com.cn/js/v8/modules/house/imGuide.js']);
						o.src = talkGif;  
						// 如果没cookie才显示  
						if(!$.cookie("bangbigtip2")){
							if(config.isFinal) {
								if("35" == config.cate.dispid || "36" == config.cate.dispid ||"37" == config.cate.dispid) {
									// return;
								}
							}  
							if($("#bangbigtip").length==0){
								$("#bangbangWrapBox").before('<style >#bangbangWrapBox{position:relative;z-index:995}.bangbangTips2013{width:340px; height:325px; position:absolute;top:15px;left:-27px;z-index:9998; background:url("http://img.58cdn.com.cn/ui6/detail/tips18.png") no-repeat;}.b_btn2,.b_close{display:block;width:103px;height:33px;position:absolute;cursor:pointer}.b_btn2{width:107px;height:25px;left:74px;top:149px}.b_close{width:34px; height:34px;left:304px; top:93px;}</style>').append('<div class="bangbangTips2013" id="bangbigtip" style="display:none"><span class="b_btn2" title="联系对方" id="bangtipsendmsg"></span><span class="b_close" title="关闭" onclick="document.getElementById(\'bangbigtip\').style.display=\'none\';"></span></div>');
							}
							
							
							// 显示大提示  
							$("#bangbigtip").show(); 
							$("#bangbigtip .b_close").click(function(){
								$.cookie("bangbigtip2",1);
							});		
							$("#bangtipsendmsg").attr("name","zaixian");
							$("#bangtipsendmsg").click(function(){  
								//$("#bangpop").hide();
								IM_SendMessage(c.j.userid,t);  
							});  
							// 5秒后隐藏这大提示  
							setTimeout(function(){  
								$("#bangbigtip").hide();  
								$.cookie("bangbigtip2",1);  
							},10000);
						}  
						var catids=[];
						for(var i=0;i<config.catelist.length;i++){
							catids[i]=config.catelist[i].dispid;
						}
						catids=catids.join(",");
						/*$("#bangpop .uname").html(c.j.linkman)[0].onclick=(function(event){
							$("#bangpop").hide();
							IM_SendMessage(c.j.userid,t);
							//clickLog('from=IM_pop_username&category='+catids);
						});
						$("#bangpop .zixunbtn")[0].onclick=(function(event){
							(function(){
								if(im_instance){
									IM_SendMessage(c.j.userid,{url:document.location.href,id:c.j.infoid,title:im_page_title.oldTitle,time:new Date()},"1");
								}else{
									setTimeout(arguments.callee, 1500);
								}
									
							})();
							$("#bangpop").hide();
							//clickLog('from=IM_pop_button_zixun&category='+catids);
						});
						$("#bangpop").show();*/
                    } 
					if(tip){  
						tip.style.display = "";  
					}  
					if($("#buttombang").length){  
						$("#buttombang").attr('src', o.src);  
					} 
					//二手房经纪人的帮帮
					if($("#jjrimgbang").length){
						$("#jjrimgbang").attr('src', o.src);  
					}
				}  
			}  
			IM_Recommend(config.j.userid,{url:document.location.href,id:config.j.infoid,title:im_page_title.oldTitle,time:new Date()});
		}else if(config.isList){  
			var isZaixian = location.search.indexOf("zaixian=1")>-1;  
			for(var i=0,len=result.length;i<len;i++){  
				var item = result[i],showicon = false;  
				if(item){  
					if($("span").hasClass("jingpin")) {
						if(item.status == "1"){
							showicon = true;
						}
					} else {
						if(isZaixian || item.status == "1"){
							showicon = true;  
						}
					}
					//if(!showicon) continue;  
					$("span[name=zaixian_"+item.uid+"]").each((function(u, _showicon){  
						return function(){  
							if(_showicon === true){
								$(this).addClass("ico bbonline").css("cursor","pointer"); 
							}   
							if(!$(this).attr("zx")){  
								$(this).click(function(){  
									if(!swfobject.hasFlashPlayerVersion(im_fp_version)){
										showFLVTooLow();
										return;
									}
									//a[class=t] 标题的class为t  
									var oLink = $(this).parent().find("a[class=t]"),  
										infoid = oLink.attr("href")?oLink.attr("href").match(/\/(\d+)x/i)[1]:'',  
										oInfo = {  
											id:infoid,  
											title:oLink.html()?oLink.html().replace(/<[^>]+>/ig,""):'',  
											url:oLink.attr("href")?oLink.attr("href"):'',  
											uid:u,  
											pubTime:'',  
											publisher:''  
										};  
									if($("#v-hasjl").length>0){
										oInfo.tipsInCB=$("#v-hasjl").html();
									}
									IM_SendMessage(u,oInfo);  
								});  
								$(this).attr("zx",1);  
							}  
						}  
					})(item.uid, showicon));  
				}  
			}  
		}  
	};
	
	var bang = {  
		init:function(o){  
			// 9224全职招聘  9225求职信息   13941兼职招聘  
			//if(config.rootcate.dispid=="13941" || config.rootcate.dispid=="9224" || config.rootcate.dispid=="9225") return;
			var l = config.city.listname,cate = config.cate.listname;  
			var userid = login.getUserId(),sitekey = login.getSiteKey(),cookie = uidList = "";  
			if(userid && sitekey){  
				cookie = userid + ';'+sitekey;  
			}else if(config.rootcate.listname=="house" || (config.rootcate.listname=="job") || (config.rootcate.listname=="sale")){
					cookie="0;0";
			}else if( ",shenghuo,shangwu,xiuxianyl,yiliaobaojian,hunjiehunqing,shop,zhuangxiujc,zhaoshang,lvyouxiuxian,canyin,qichefw,jiaoyu,shenghuo,shangwu,jiaoyu,zhaoshang,bianminfw,".indexOf(","+config.rootcate.listname+",")>-1){
				cookie="0;0";
			}	
			
			IM_Init(cookie, cate +","+l);  
			if(config.isFinal){  
				
					uidList = config.j.userid;  
					IM_QueryUserState_New(0,uidList,IM_Init_Btn);
					//if(config.catelist[0].listname=="house"){
						
						
					//}
			}  
			else if(config.isList){  
				var a  = document.getElementsByTagName("tr"),aUid=[],contains = false;  
				for(var i = 0,len=a.length;i<len;i++){  
					var logr = a[i].getAttribute("logr");  
					if(logr){  
						for(var k = 0,aLen=aUid.length;k<aLen;k++){  
							if(logr === aUid[k]){  
								contains=true;  
								break;  
							}  
						}  
						if(!contains){  
							aUid.push(logr.match(/\S*?_\S*?_([\-\d]+)/)[1]);  
						}  
					}  
				}  
				var a  = document.getElementsByTagName("li");  
				for(var i = 0,len=a.length;i<len;i++){  
					var logr = a[i].getAttribute("logr");  
					if(logr){  
						for(var k = 0,aLen=aUid.length;k<aLen;k++){  
							if(logr === aUid[k]){  
								contains=true;  
								break;  
							}  
						}  
						if(!contains){  
							aUid.push(logr.match(/\S*?_\S*?_([\-\d]+)/)[1]);  
						}  
					}  
				} 
				//房产新增个人房源
				var arr = $('div[logr]');
				for(var i=0,len=arr.length;i<len;i++){
					var logr = $(arr[i]).attr('logr');
					if($.inArray(logr,aUid) == -1){
						aUid.push(logr.match(/\S*?_\S*?_([\-\d]+)/)[1]);  
					}
				}
				if(aUid && aUid.length>0){  
					IM_QueryUserState_New(2,aUid.join(","),IM_Init_Btn,"2");  
				}  
			}   
		},  
		closetip:function(){  
			var oTip = $("#bangtipbox")[0];  
			if(!oTip) return;  
			if(oTip.style.display != "none"){  
				$("#bangtipbox").hide();  
				$.cookie("isclosedbangtip","1");  
			}  
		},  
		showtip:function(){  
			var val = $.cookie("isclosedbangtip"),oTip=document.getElementById("bangtipbox"),login=login.isLogin();  
			if(val || !login) return;  

			if(!oTip){  
				var aHtml = ['<style type="text/css">','.bubble{width:300px; border:1px solid #F5E493; border-radius:2px; background:#FFFEE0; position:absolute; }',  
					'.bubble p{padding:10px; line-height:normal;}',  
					'.bubble .shadow{ width:100%; height:1px; border:0; padding:0 !important; background:#f0f0f0; font-size:0; overflow:hidden; position:absolute; bottom:-2px; left:0; }',  
					'.bubble-close{ display:block; float:right; margin-right:10px; margin-top:5px; *display:inline; font:700 12px Comic Sans MS, sans-serif;  color:#E8B98E; cursor:pointer;}',  
					'.bubble-box{ width:0 !important; height:0; overflow:hidden; background:transparent; position:absolute; bottom:-9px; left:131px;}',  
					'.arrow-bottom{ border-style:solid;_border-style:solid dotted dotted dotted; border-width:8px 8px 0 8px; border-color:#f5e495 transparent transparent transparent;}',  
					'.bubble-box-{bottom:-8px;}',  
					'.arrow-bottom-{border-width:8px 8px 0 8px; border-top-color:#FFFEE0;}',  
					'.bangbang-top-bubble{width:300px;left:50px; top:-42px;}',  
					'.bangbang-bottom-bubble{ width:240px; left:-86px; top:-90px;}',  
					'.bangbang-bottom-bubble h2{ margin:10px 10px 0; font-weight:normal;}',  
					'.bangbang-bottom-bubble p{ padding:5px 10px; line-height:1.6}',  
					'.bangbang-bottom-bubble p.load{ padding-bottom:10px;}',  
					'</style>',  
					'<span id="spanbangtipclose" onclick="fe.business.bang.closetip();" class="bubble-close">X</span>',  
					'<h2>温馨提示：</h2>',  
					'<p>保持打开58同城任意页面，有意者可同您即时沟通，请关注此处提醒。</p>',  
					'<i class="shadow"></i>',  
					'<i class="bubble-box arrow-bottom"></i>',  
					'<i class="bubble-box bubble-box- arrow-bottom arrow-bottom-"></i>'],  
					_div = document.createElement("div");  
				_div.setAttribute("id","bangtipbox");  
				_div.innerHTML = aHtml.join("");  
				document.getElementById("im_mainDiv").appendChild(_div);  
				setTimeout(function(){  
					var box = document.getElementById("bangtipbox");  
					box.className = "bubble f12 bangbang-bottom-bubble";  
					if($.browser.msie && $.browser.version == "6.0" && !$.support.style){  
						box.style.top = "-85px";  
					}  
				},100);  
			}  
		}  
	};  
	bang.init();  

	var changeFlashStyle = function(id){  
		// 重新加载定位样式，解决被iframe挡住问题  
		var m = document.getElementById(id);  
		if(!m) return;  
		m.style.position = "";  
		setTimeout(function(){m.style.position = "fixed"},10);  
	}  

	setTimeout(function(){  
		changeFlashStyle("im_mainDiv");  
		changeFlashStyle("im_chatBoxDiv");  
	},500);  
	
	function showFLVTooLow(){
		if($("#IM_VERTOOLOW").length==0){
		var styletc="margin:-100px 0px 0px -150px;left:50%;";
		if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0") ) {
			styletc="margin:-133px 0px 0px -150px;_position:absolute;_top:expression(eval(document.documentElement.scrollTop+233));left:50%;right:50%";
		}
		$(document.body).append("<style>* html .clearfix {height:1%;}.clearfix {	display:block;}#IM_VERTOOLOW.tc{width:365px;height:225px;padding:4px 10px 4px 5px; background:url(http://img.58cdn.com.cn/bangbang/im/base/tc_bg.png) no-repeat;position: fixed;top:45%;z-index:1200;"+styletc+"}#IM_VERTOOLOW .tc_hd{ line-height:36px; height:36px;padding-left:40px;padding-right:14px;color:#333333;font-weight:bold;position:relative;font-size:14px;text-align:left;}#IM_VERTOOLOW .tc_hd i{width:14px;height:16px; display:inline-block;background:url(http://img.58cdn.com.cn/bangbang/im/base/tcimg.png) no-repeat -136px 0;position:absolute;top:10px;left:18px;}#IM_VERTOOLOW a.close{width:9px;height:9px;background:url(http://img.58cdn.com.cn/bangbang/im/base/tcimg.png) no-repeat -128px -24px; display:inline-block;position:absolute;right:14px;top:13px;}a:hover.close{background-position:-138px -24px;}#IM_VERTOOLOW .tc_bd{padding:25px 20px; text-align:center;}.tc_bd p{ line-height:31px; font-size:14px;text-align:left}#IM_VERTOOLOW .download{margin-top:12px; width:127px;height:41px;background:url(http://img.58cdn.com.cn/bangbang/im/base/tcimg.png) no-repeat 0 0; display:inline-block}#IM_VERTOOLOW .download span{ display:block; ext-indent:-999em; overflow:hidden}#IM_VERTOOLOW a:hover.download{background-position:0 -42px;}a:active.download{background-position:0 -84px;}</style>")
		.append('<div id="IM_VERTOOLOW" style="display:none" class="tc"><div class="tc_hd"><i></i>抱歉，您的flash版本太低...<a href="javascript:void(0);" class="close" alt="关闭"></a></div><div class="tc_bd"><p>下载新版flash player工具，才能与对方在线<br/>交流哦~</p><a href="http://get.adobe.com/cn/flashplayer/" target="_blank" class="download" onclick="clickLog(\'&from=IM_pop_flashplayer_download\')"><span>        </span></a></div></div>');
		if($.browser.msie && $.browser.version=="6.0"){
			$(document.body).append('<script type="text/javascript" src="http://img.58cdn.com.cn/bangbang/im/base/pngie.js"></script>')	;
		}
		$("#IM_VERTOOLOW").click(function(evt){
				if($(evt.target).hasClass("close")){
					$("#IM_VERTOOLOW").hide();
				}
			});
		}
		$("#IM_VERTOOLOW").show();
		//clickLog('&site_name=58&tag=pvsiters&from=IM_pop_flashplayer&rand='+Math.random())
		if($.browser.msie && $.browser.version=="6.0"){
			DD_belatedPNG.fix('#IM_VERTOOLOW.tc');
		}
	}  
});
define('common/topbarCity',['common/config'], function(config){
	return {
		getHtml : function(){
			return '<h2>' + config.city.name + '</h2>';
		}
	};
});
define('common/localize',['common/config', 'common/jQuery.cookie', 'common/util.string'], function(config, cookie, string){ 
	/** 
	 * 获取 合适的城市，并提供链接 
	 * 获取规则为：1.根据ip判断，2.判断省会城市 
	 */  
	var getlocal = {  
		//不需要跳转的城市  
		arr1: ['bj|北京', 'tj|天津', 'sh|上海', 'cq|重庆', 'tw|台湾', 'hk|香港', 'am|澳门', 'sz|深圳', 'dl|大连', 'su|苏州', 'cn|其他'],  
		//城市和省会对应表  
		arr2: [  
			["sjz|石家庄", "bd|保定", "cangzhou|沧州", "chengde|承德", "dingzhou|定州", "gt|馆陶", "hd|邯郸", "hs|衡水", "lf|廊坊", "qhd|秦皇岛", "ts|唐山", "xt|邢台", "zjk|张家口", "zd|正定", "zx|赵县", "zhangbei|张北"],   
			["zz|郑州", "ay|安阳", "changge|长葛", "hb|鹤壁", "jiaozuo|焦作", "jiyuan|济源", "kaifeng|开封", "luoyang|洛阳", "luohe|漯河", "mg|明港", "ny|南阳", "pds|平顶山", "puyang|濮阳", "sq|商丘", "smx|三门峡", "xx|新乡", "xc|许昌", "xy|信阳", "yuzhou|禹州", "yanling|鄢陵", "zk|周口", "zmd|驻马店"],   
			["hrb|哈尔滨", "dq|大庆", "dxal|大兴安岭", "hegang|鹤岗", "heihe|黑河", "jms|佳木斯", "jixi|鸡西", "mdj|牡丹江", "qqhr|齐齐哈尔", "qth|七台河", "suihua|绥化", "sys|双鸭山", "yich|伊春"],   
			["cc|长春", "bc|白城", "baishan|白山", "jl|吉林", "liaoyuan|辽源", "songyuan|松原", "sp|四平", "th|通化", "yanbian|延边"],   
			["sy|沈阳", "as|鞍山", "benxi|本溪", "cy|朝阳", "dl|大连", "dandong|丹东", "fushun|抚顺", "fx|阜新", "hld|葫芦岛", "jinzhou|锦州", "liaoyang|辽阳", "pj|盘锦", "tl|铁岭", "wfd|瓦房店", "yk|营口", "pld|庄河"],   
			["jn|济南", "bz|滨州", "dz|德州", "dy|东营", "heze|菏泽", "jining|济宁", "kl|垦利", "linyi|临沂", "lc|聊城", "lw|莱芜", "qd|青岛", "rizhao|日照", "ta|泰安", "wf|潍坊", "weihai|威海", "yt|烟台", "zb|淄博", "zaozhuang|枣庄", "zhangqiu|章丘", "zc|诸城"],   
			["hu|呼和浩特", "alsm|阿拉善盟", "bt|包头", "bycem|巴彦淖尔盟", "chifeng|赤峰", "erds|鄂尔多斯", "hlbe|呼伦贝尔", "hlr|海拉尔", "tongliao|通辽", "wuhai|乌海", "wlcb|乌兰察布", "xl|锡林郭勒盟", "xam|兴安盟"],   
			["nj|南京", "cz|常州", "dafeng|大丰", "ha|淮安", "lyg|连云港", "nt|南通", "su|苏州", "shuyang|沭阳", "suqian|宿迁", "taizhou|泰州", "wx|无锡", "xz|徐州", "yz|扬州", "yancheng|盐城", "zj|镇江"],   
			["hf|合肥", "anqing|安庆", "bengbu|蚌埠", "bozhou|亳州", "ch|巢湖", "chizhou|池州", "chuzhou|滁州", "fy|阜阳", "hn|淮南", "huaibei|淮北", "huangshan|黄山", "hexian|和县", "hq|霍邱", "la|六安", "mas|马鞍山", "suzhou|宿州", "tongling|铜陵", "tongcheng|桐城", "wuhu|芜湖", "xuancheng|宣城"],   
			["ty|太原", "changzhi|长治", "dt|大同", "jincheng|晋城", "jz|晋中", "lvliang|吕梁", "linfen|临汾", "linyixian|临猗", "qingxu|清徐", "shuozhou|朔州", "xinzhou|忻州", "yuncheng|运城", "yq|阳泉"],   
			["xa|西安", "ankang|安康", "baoji|宝鸡", "hanzhong|汉中", "sl|商洛", "tc|铜川", "wn|渭南", "xianyang|咸阳", "yanan|延安", "yl|榆林"],   
			["lz|兰州", "by|白银", "dx|定西", "gn|甘南", "jinchang|金昌", "jyg|嘉峪关", "jq|酒泉", "linxia|临夏", "ln|陇南", "pl|平凉", "qingyang|庆阳", "tianshui|天水", "wuwei|武威", "zhangye|张掖"],   
			["hz|杭州", "huzhou|湖州", "jx|嘉兴", "jh|金华", "lishui|丽水", "nb|宁波", "quzhou|衢州", "sx|绍兴", "tz|台州", "wz|温州", "yiwu|义乌", "zhoushan|舟山"],   
			["nc|南昌", "fuzhou|抚州", "ganzhou|赣州", "jj|九江", "ja|吉安", "jdz|景德镇", "px|萍乡", "sr|上饶", "xinyu|新余", "yingtan|鹰潭", "yichun|宜春", "yxx|永新"],   
			["wh|武汉", "es|恩施", "ez|鄂州", "hshi|黄石", "hg|黄冈", "jingzhou|荆州", "jingmen|荆门", "qianjiang|潜江", "shiyan|十堰", "snj|神农架", "suizhou|随州", "tm|天门", "xf|襄阳", "xiaogan|孝感", "xiantao|仙桃", "xianning|咸宁", "yc|宜昌"],   
			["cs|长沙", "changde|常德", "chenzhou|郴州", "hy|衡阳", "hh|怀化", "ld|娄底", "shaoyang|邵阳", "xiangtan|湘潭", "xiangxi|湘西", "yy|岳阳", "yongzhou|永州", "yiyang|益阳", "zhuzhou|株洲", "zjj|张家界"],   
			["gy|贵阳", "anshun|安顺", "bijie|毕节", "lps|六盘水", "qdn|黔东南", "qn|黔南", "qxn|黔西南", "tr|铜仁", "zunyi|遵义"],   
			["cd|成都", "ab|阿坝", "bazhong|巴中", "deyang|德阳", "dazhou|达州", "ga|广安", "guangyuan|广元", "ganzi|甘孜", "ls|乐山", "luzhou|泸州", "liangshan|凉山", "mianyang|绵阳", "ms|眉山", "scnj|内江", "nanchong|南充", "panzhihua|攀枝花", "suining|遂宁", "yb|宜宾", "ya|雅安", "zg|自贡", "zy|资阳"],   
			["km|昆明", "bs|保山", "cx|楚雄", "dali|大理", "diqing|迪庆", "dh|德宏", "honghe|红河", "lj|丽江", "lincang|临沧", "nujiang|怒江", "pe|普洱", "qj|曲靖", "ws|文山", "bn|西双版纳", "yx|玉溪", "zt|昭通"],   
			["xj|乌鲁木齐", "aks|阿克苏", "ale|阿拉尔", "bygl|巴音郭楞", "betl|博尔塔拉", "changji|昌吉", "hami|哈密", "ht|和田", "klmy|克拉玛依", "kel|库尔勒", "ks|喀什", "kzls|克孜勒苏", "shz|石河子", "tlf|吐鲁番", "tmsk|图木舒克", "wjq|五家渠", "yili|伊犁"],   
			["yinchuan|银川", "guyuan|固原", "szs|石嘴山", "wuzhong|吴忠", "zw|中卫"],   
			["xn|西宁", "guoluo|果洛", "huangnan|黄南", "hx|海西", "haidong|海东", "haibei|海北", "hainan|海南", "ys|玉树"],   
			["lasa|拉萨", "al|阿里", "changdu|昌都", "linzhi|林芝", "nq|那曲", "rkz|日喀则", "sn|山南"],   
			["nn|南宁", "baise|百色", "bh|北海", "chongzuo|崇左", "fcg|防城港", "gl|桂林", "gg|贵港", "hc|河池", "hezhou|贺州", "liuzhou|柳州", "lb|来宾", "qinzhou|钦州", "wuzhou|梧州", "yulin|玉林"],   
			["gz|广州", "chaozhou|潮州", "dg|东莞", "fs|佛山", "huizhou|惠州", "heyuan|河源", "jm|江门", "jy|揭阳", "mm|茂名", "mz|梅州", "qingyuan|清远", "sd|顺德", "sz|深圳", "st|汕头", "sg|韶关", "sw|汕尾", "taishan|台山", "yj|阳江", "yangchun|阳春", "yf|云浮", "zh|珠海", "zs|中山", "zhanjiang|湛江", "zq|肇庆"],   
			["fz|福州", "ly|龙岩", "nd|宁德", "np|南平", "pt|莆田", "qz|泉州", "sm|三明", "wuyishan|武夷山", "xm|厦门", "zhangzhou|漳州"],   
			["haikou|海口", "sanya|三亚", "wzs|五指山"]  
		],  
		containerid : 'topbar_ipconfig',  
		cookiekey: 'ipcity',  
		/** 
		 * 初始化城市判断，首先判断当前ip，然后判断城市省会 
		 */  
		init: function(){  
			var self = this;  
			var v = $.cookie(self.cookiekey, undefined, {method : unescape});  
			if (v) {  
				var c = v.split('|');  
				if (config.city.listname == c[0])   
					return;  
				else {  
					self.addCityLink(c[0], c[1]);  
				}  
			}  
			else {  
				$.getJSON(
					"http://user.58.com/userdata/getlocal/?callback=?",
					null,
					function(data){  
						if (data && data.list) {  
							//var now = new Date();  
							//var day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);  
							var expireDays = 1;
							$.cookie(self.cookiekey, data.list + '|' + data.local, {expires:expireDays, method : escape});  
							if (!data.list)   
								return;  
							  
							/** 
							 * 如果当前选择城市和用户ip所在地不同，则提示用户ip所在地 
							 * 如果当前选择城市和用户ip相同，则判断当前选择城市是否为省会，否则提示用户省会城市 
							 */  
							if (config.city.listname != data.list) {  
								self.addCityLink(data.list, data.local);  
							}  
							else {  
								var re = new RegExp("^" + config.city.listname + '\\|'), sh;  
								for (var i = 0, leni = self.arr1.length; i < leni; i++) {  
									if (re.test(self.arr1[i]))   
										return;  
								}  
								for (var i = 0, leni = self.arr2.length; i < leni; i++) {  
									for (var j = 0, lenj = self.arr2[i].length; j < lenj; j++) {  
										if (re.test(self.arr2[i][j])) {  
											if (j == 0)   
												return;  
											sh = self.arr2[i][0].split('|');  
											self.addCityLink(sh[0], sh[1]);  
											$.cookie(self.cookiekey, sh[0] + '|' + sh[1], {expires:expireDays, method : escape});  
											break;  
										}  
									}  
								}  
							}  
						}  
					}
				);  
			}  
		},  
		/** 
		 * 添加 跳转城市 链接 
		 * @arguments 
		 * @param {Object} 城市listname 
		 * @param {Object} 城市名 
		 */  
		addCityLink: function(list, local){
			var self = this,   
				element = $('#' + self.containerid);  
			if (!element.length)   
				return;  
			if(element.html().indexOf(local)>-1){
				return ;
			}
			var lens=$('#'+self.containerid+' a').length;
			var ss=$('#'+self.containerid+' a').eq(lens-1);
			var a=$("<a>",{
				id : 'link_city_change',
				href : 'http://' + list + '.58.com/' + (
					(config.isList || config.isFinal) && 
					config.cate ? config.cate.listname + "/" : ""), 
				target: '_self',  
				html : local
			});
			ss.after(a);
			a.click(function(){
				$.cookie('city', list);  
				$.cookie('58home', list);   
			});
		}
	};  
	return getlocal;
});
define("common/jQuery.onAvailable", [],function(){
	  $.fn.onAvailable = function(fn){
	    var sel = this.selector;
	    var timer;
	    if (this.length > 0) {
	        fn.call(this);   
	    }
	    else {
	        timer = setInterval(function(){
	            if ($(sel).length > 0) {
	                fn.call($(sel));
	                clearInterval(timer);  
	            }
	        },50);  
	    }
	};
});

define('common/topbarChangeCity',['common/config', 'common/localize','common/jQuery.onAvailable'], function(config,jqAvailable){
	var excludeDispids = ['356', '8659', '8645', '8658', '152', '8668'];
	
	return {
		getHtml : function(){
			if(-1 < $.inArray(config.cate.dispid, excludeDispids)){
				return '';
			}
			if(config.isHome || config.isMy){
				return '';
			}
			
			$('#topbar_ipconfig').onAvailable(function(){
				
			});
			if(config.isList || config.isFinal){
				return ' <span id="topbar_ipconfig">[<a href="http://www.58.com/' + config.cate.listname + '/changecity/" target="_self">切换城市</a>]</span><span class="gap">|</span>'
			}
			if(config.isPost){
				return ' <span id="topbar_ipconfig">[<a href="http://post.58.com/postindex.htm" target="_self">切换城市</a>]</span><span class="gap">|</span>';
			}
			return ' <span id="topbar_ipconfig">[<a href="http://www.58.com/changecity.aspx" target="_self">切换城市</a>]</span><span class="gap">|</span>';
		}
	};
});
define('common/topbarWap',['common/config'], function(config){
	return {
		getHtml : function(){
			if(config.isList){
				var html = '<span style="position: relative;"><a id="topbar_shouji_58" target="_blank" class="mobile" href="http://wap.58.com/wap.html?from=' + config.city.listname + 'list_top/">手机上58</a><span class="c_999"></span><span id="topbar_shoujispan" style="width: 341px; height: 141px; display: none; position: absolute; left: 74px; top: 0; "><img id="topbar_img" style="display:none;" src="http://img.58cdn.com.cn/ui6/titellist.gif" border="0" usemap="#Map" /><map name="Map" id="Map"><area id="topbar_close" shape="rect" coords="317,44,333,62" href="#" /><area target="_blank" id="topbar_kehuduan" shape="rect" coords="214,101,308,126" href="#" /></map></span>';
				html+='<style>.bar_left{overflow:visible;}.mbox{top:26px;_top:27px;display:none;position:absolute; left:-10px; text-align:center; background:#fff;width:580px; border:1px solid #d1d1d1; z-index:99; padding:5px 0;}.mbox ul{overflow:hidden;}.mbox ul li{width:192px;float:left;border-left:1px dashed #e5e5e5;margin:0; position:relative;left:-1px; height:181px;}.mbox p span{color:#1155cc;}.mbox li div, .mbox .m_jiao{background:url("http://img.58cdn.com.cn/ui6/index/bg_top_ewm.gif") no-repeat 0 0;margin:0 auto;}.mbox .m_jiao{z-index:100;background-position: -232px -128px; width:13px;height:8px;position:absolute;left:26px;top:-8px;} .mbox .m_khd{width:137px;height:137px;}.mbox .m_wx{background-position: -148px 0;width:113px;height:113px;}.mbox .m_llq{background-position: 0 -143px; width:169px; height:48px; margin-top:36px;}</style>';
				html+='<div id="mobileBox" class="mbox" style="display: none;"><div class="m_jiao"></div><ul><li><p>扫描二维码安装58同城客户端</p><div class="m_khd"></div></li><li><p><span>微信</span>扫描二维码使用58同城</p><div class="m_wx"></div><p style="color:#666;">微信公众号：58同城</p></li><li><p>手机浏览器访问58同城</p><div class="m_llq"></div></li></ul><div class="clear"></div></div></span>';
				
				/*var img = $('#topbar_img'), shoujispan = $('#topbar_shoujispan'), hideShouJiTooltip;
				$('#topbar_shouji_58').mouseover(function(){
					img.css('display', 'block');
					shoujispan.css('display', 'inline-block');
					hideShouJiTooltip = function(){
						img.hide();
						shoujispan.hide();
					};
					stopTimeout = setTimeout(hideShouJiTooltip, 3000);
					
				});
				img.mouseover(function(){
					clearTimeout(stopTimeout); 
					img.css('display', 'block');
					shoujispan.css('display', 'inline-block');
				});
				$('#topbar_close').one('click', function(){
						img.hide();
						shoujispan.hide();
				})
				.mouseover(function(){
					img.css('display', 'block');
					shoujispan.css('display', 'inline-block');
				});
				$('#topbar_kehuduan').one('click', function(){
					$(this).attr('href', 'http://wap.58.com/wap.html?from=' + config.city.listname + 'list_top/');
					img.hide();
					shoujispan.hide();
				})
				.mouseover(function(){
					img.css('display', 'block');
					shoujispan.css('display', 'inline-block');
				});
				shoujispan.mouseout(function(){
					img.hide();
					shoujispan.hide();
				});*/
				
				return html;
			}
			if(config.isTopList){
				return '<span><a target="_blank" class="mobile" href="http://wap.58.com/wap.html?from=' + config.city.listname + 'sort_top/">手机上58</a><span class="c_999"></span></span>'
			}
			if(config.isFinal){
				return '<span><a target="_blank" class="mobile" href="http://wap.58.com/wap.html?from=' + config.city.listname + 'detail_top/">手机上58</a><span class="c_999"></span></span>';
			}
			if(config.isMy){
				return '<div class="bar_left"><a href="http://bj.58.com/">58同城首页</a><span class="gap">|</span><a target="_blank" class="mobile" href="http://wap.58.com/wap.html?from=center_top/">手机上58</a></div>';
			}
			return '';
		}
	};
});
define('common/topbarBackHome',['common/config'], function(config){
	return {
		getHtml : function(){
			if(!config.isHome && !config.isMy && !config.isFinal){
				return '<div id="modify"><a href="http://' + (config.city.listname || 'www') + '.58.com/">58同城首页</a><span class="gap">|</span></div>';
			}
			return '';
		}
	};
});
define('common/topbarMsg',['common/config', 'common/login'], function(config, login){
	return {
		getHtml : function(){
			if(!config.isMy || !login.isLogin()){
				return '';
			}
			
			var html = '<div id="topbar_message" class="haschild">消息<span class="arrow"></span> <div id="topbar_messagebox" class="hc"><i class="shadow"></i></div></div>';
			var userId = login.getUserId();	
			$('#topbar_message').live('mouseenter', function(){
				$(this).addClass('hover');
				var container = $('#topbar_messagebox');
				$.getJSON(
					'http://jiaoyou.58.com/interface/getcount?callback=?',
					{uid:userId},
					function(data){
						$('#yuehui').html('<i>' + data.count + '</i>我的约会');
					}
				);

				$.getJSON(
					'http://message.58.com/api/msgcount/?callback=?',
					{userid:userId,type:3},
					function(data){
						$('#sysmsgcount').html('<i>' + data.count + '</i>系统消息');
					}
				);
				container.html('<a href="http://my.58.com/msgrev" onclick="_gaq.push([\'pageTracker._trackEvent\', \'58_my\', \'top_message\', \'link_click_sys\']);" id="sysmsgcount"><i></i>系统消息</a><a target="_blank" onclick="_gaq.push([\'pageTracker._trackEvent\', \'58_my\', \'top_message\', \'link_click_jiaoyou\']);" href="http://jiaoyou.58.com/message/" id="yuehui">我的约会</a>');
			})
			.live('mouseleave', function(){
				$(this).removeClass('hover');
			});
			return html;
		}
	};
});
define('common/jQuery.flashCookie',[],function(){
	Rookie.get_browser=function(){//获取浏览器类型
		var ua = navigator.userAgent.toLowerCase();
		if(window.ActiveXObject){return "ie"};
		if(/firefox/i.test(ua)){return "firefox"};
		if(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)){return "chrome"};
		if(window.opera){return "opera"};
		if(window.openDatabase){return "safari"};
		return "other";
	}
	Rookie.getSWF=function(movieName){//获取引用swf文件的dom对象函数
		if (window.document[movieName]){
			return window.document[movieName];
		}else{
			return document.getElementById(movieName);
		}
	}
	Rookie.swfReady=function(){//供swf 调用此函数以通知js：swf文件已经加载
		Rookie.asToJs=true;
	}
	Rookie.cross=function(){//供swf调用，以通知swf文件是否跨域请求
		return Rookie.crossDomain;
	}
	function Rookie(callBack){
		var i=1;//设置一个轮询计数的变量
		(function(){//轮询获取页面中swf文件DOM对象的闭包函数
			//判断是否能读取swf文件的DOM对象，如果能读取就把对象赋值给Rookie.local属性
			if(Rookie.local=Rookie.getSWF("rookieswf")){
				(function(){//轮询swf是否成功调用js函数的闭包函数
					i++;//递增一次计数变量
					if(Rookie.asToJs){//判断swf是否调用js函数成功，如果成功则为true
						try{
							//判断js是否成功调用swf定义的函数，如果调用成功则返回true，并赋值给Rookie.local.available属性
							Rookie.local.available=Rookie.local.callAS();
						}catch(e){
							try{
								//如果swf调用js成功，而js调用swf不成功，说明是调用swf缺少跨域权限，向浏览器控制台输出调试内容
								//console.warn("But your DOMAIN is NOT ALLOWED.");
							}catch(e){
							};
							return;
						}
						callBack.call(Rookie.local);//如果as和js互相调用成功，则插件初始化成功，则执行回调函数
					}else{//如果swf还未调用js函数，则轮询，继续试探是否调用
						if(i>150){// 轮询次数过多，swf文件始终无法调用js，此数字可以根据网络情况适当修改
							//轮询终止，如果swf文件始终没有调用js，说明网络错误或swf文件路径传递错误导致swf文件无法加载
							//再或者客户端浏览器不支持flash
							try{//用try语句向浏览器开发面板输出调试内容
								//console.warn("But network failure,or check your swf file path,or browser do not support Flash");
							}catch(e){
							};
							return;
						};
						setTimeout(arguments.callee,20);
					}
				})();
			}else{//如果获得不到swf文件的DOM对象，则轮询继续尝试读取
				setTimeout(arguments.callee,20);
			}
		})();
	}
	(function(){//即时运行的匿名闭包函数执行初始代码，减少全局变量污染
		var scripts = document.getElementsByTagName('script');
		//var swfFile = scripts[scripts.length - 1].src.split("?")[1];//获取页面引用js时传递的swf路径
		var swfFile = "http://img.58cdn.com.cn/js/file6/rookie.swf";
		if((/http:\/\//i).test(swfFile)&&swfFile.indexOf(window.location.host)==-1){Rookie.crossDomain=true;}
		//如果swf文件路径通过http引用并且主机名不等于当前页面，则说明是跨域使用swf
		swfFile+="?"+Math.floor(Math.random()*100000);	//给swf路径增加随机数，解决IE缓存swf文件问题
		var flash='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="1" height="1" id="rookieswf"><param name="movie" value="'+swfFile+'" /><param name="allowScriptAccess" value="always" /><embed src="'+swfFile+'" width="1" height="1" name="rookieswf" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
		var flashCont=document.createElement("div");
		(function(){//轮询判断body加载的闭包函数
			//console.info("search body");
			if(document.body){//如果能够读取doby对象，则插入swf文件到HTML文档中
					flashCont.innerHTML=flash;  
					document.body.insertBefore(flashCont,document.body.firstChild);
					flashCont.style.display = 'none';
			}else{
				setTimeout(arguments.callee,15);
			}
		})();//匿名闭包函数，方便用 arguments.callee 回调自身
	})();
	window.Rookie = Rookie;
	jQuery.flashCookie = function(name, value){
		Rookie(function(){
			if(value){
				this.write(name, value);
			}else{
				this.read(name);
			}
		})
	}
});
define('common/jQuery.localStorage',[],function(){
	jQuery.localStorage = function(name, value){
		if(value){
			window.localStorage.setItem(name, value);
		}
		else{
			return window.localStorage.getItem(name);
		}
	};
});
/*
	comment: ie的存储介质 
*/
define("common/jQuery.userData", [/*"依赖模块1", "依赖模块2",...*/], function(/*var_dep1, var_dep2,...*/) {
	var Userdata = {  
		    storageObject: null,  
		    initialize: function() {  
		        if (!this.storageObject) {  
		            this.storageObject = document.createElement("div");  
		            this.storageObject.addBehavior("#default#userData");  
		            this.storageObject.style.display = "none";  
		            document.body.appendChild(this.storageObject);  
		        }  
		    },  
		    set: function(key, value) {  
		        if (!this.storageObject){  
		            this.initialize();  
		        }  
		        this.storageObject.setAttribute(key, value);  
		        this.storageObject.save("OfflineStorage");  
		        return value;  
		    },  
		    get : function(key){  
		        if (!this.storageObject){  
		            this.initialize();  
		        }  
		        this.storageObject.load("OfflineStorage");  
		        return this.storageObject.getAttribute(key);  
		    },  
		    del: function(key) {  
		        if (!this.storageObject){  
		            this.initialize();  
		        }  
		        this.storageObject.removeAttribute(key);  
		        this.storageObject.save("OfflineStorage");  
		    }  
		};  
	jQuery.userData = function(name, value){
		if(value){
			Userdata.set(name, value);
		}
		else{
			return Userdata.get(name);
		}
	};
  }
);

define('common/jQuery.superCookie',['common/jQuery.flashCookie', 'common/jQuery.localStorage', 'common/jQuery.userData'], function(flashCookie, localStorage, userData){
	return function(name, value, callback){
		if($.isFunction(value)){
			callback = value;
			value = null;
		}
		else{
			//callback = $.noop;
		}
		var storage = null;
		var flashCookieTimer = setInterval(function(){
			if(window.localStorage){
				storage = $.localStorage;
			}
			else if($.userData){
				storage = $.userData;
			}
			else if($.flashCookie){
				storage = $.flashCookie;
			}
			else{
				return;
			}
			clearTimeout(flashCookieTimer);
			value = storage(name, value);
			if(typeof( callback ) == 'function'){
				callback.call(window, value);
			}
		}, 10);
	};
});
define('common/historyFinal',['common/config','common/jQuery.cookie','common/jQuery.superCookie', 'common/util.string'], function(jfconf,cookie, superCookie, string){ 
	var config = {
		loadingText: '正在加载数据',      
		nodataText: '暂无浏览记录...',      
		//loadfailText: '数据加载失败...', 
		cookie_key_final: 'final_history',      
		data_url_final: 'http://user.58.com/userdata/getinfo/?callback=?', 
		finalRecordCount: 5,
		container_id : 'feet_final'
	};
	var historyData = [];
	var loadData = false;
	var container = null;
	var defaultRender = function(){
		if (historyData.length) {      
			var html = '',tpl = '<li><a href="{0}">{1}</a></li>';      
			for (var i = 0, len = historyData.length; i < len; i++) {   
				var  d = historyData[i];
				html += string.format(tpl, d.url, d.title.length > 16 ? d.title.substring(0, 14) + '...' : d.title);      
			}      
			container.html(html);      
		} 
		else {      
			container.html('<li>' + config.nodataText + '</li>');      
		}
	};
	return {
		add : function(){
			var infoId = jfconf.j.infoid;
			var key = config.cookie_key_final;
			//获取存储的浏览记录
			superCookie(key,function(val){
				var his = val ||$.cookie(key) || ""; 
				var re = new RegExp(infoId, 'ig');      
				his = his.replace(re, '').replace(/,+/g, ',').replace(/(^,)|(,$)/g, '');      
				if (!his){
					his = infoId;
				} else{
					his = infoId + ',' + his;  
				}    
				his = his.split(',').slice(0, config.finalRecordCount).join(',');      
				superCookie(key, his); 
			});
		},
		render : function(){
			container = $('#'+config.container_id);
			if(!container.length)
				return;
			superCookie(config.cookie_key_final, function(data){
				container.html('<li>' + config.loadingText + '</li>'); 
				if(!data){
					container.html('<li>' + config.nodataText + '</li>'); 
					return;
				}
				data = data.split(',').slice(0, config.finalRecordCount).join(','); 
				if(loadData === false){
					$.getJSON(
						config.data_url_final,{      
							ids: data,      
							type: 6      
						},
						function(serverData){    
							historyData = serverData;    
							loadData = true;    
							defaultRender();
						}	
					);  
				}
				else{
					defaultRender();
				}
			});
		}
	};
});
jQuery.extend(
    {
        /**
         * @see  将json字符串转换为对象
         * @param   json字符串
         * @return 返回object,array,string等对象
         */
        evalJSON:function (strJson) {
            return eval("(" + strJson + ")");
        }
    });
jQuery.extend(
    {
        /**
         * @see  将javascript数据类型转换为json字符串
         * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
         * @return 返回json字符串
         */
        toJSON:function (object) {
            var type = typeof object;
            if ('object' == type) {
                if (Array == object.constructor)
                    type = 'array';
                else if (RegExp == object.constructor)
                    type = 'regexp';
                else
                    type = 'object';
            }
            switch (type) {
                case 'undefined':
                case 'unknown':
                    return;
                    break;
                case 'function':
                case 'boolean':
                case 'regexp':
                    return object.toString();
                    break;
                case 'number':
                    return isFinite(object) ? object.toString() : 'null';
                    break;
                case 'string':
                    return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
                        function () {
                            var a = arguments[0];
                            return  (a == '\n') ? '\\n' :
                                (a == '\r') ? '\\r' :
                                    (a == '\t') ? '\\t' : ""
                        }) + '"';
                    break;
                case 'object':
                    if (object === null) return 'null';
                    var results = [];
                    for (var property in object) {
                        var value = jQuery.toJSON(object[property]);
                        if (value !== undefined)
                            results.push(jQuery.toJSON(property) + ':' + value);
                    }
                    return '{' + results.join(',') + '}';
                    break;
                case 'array':
                    var results = [];
                    for (var i = 0; i < object.length; i++) {
                        var value = jQuery.toJSON(object[i]);
                        if (value !== undefined) results.push(value);
                    }
                    return '[' + results.join(',') + ']';
                    break;
            }
        }
    });
define("common/jQuery.json", function(){});

define("common/historyList", ["common/jQuery.superCookie", "common/jQuery.json", "common/util.string"],
	function(superCookie, json, string) {
		var key = 'browerListKey';
			isLoaded = false;
		return {
			add : function(){
				
			},
			render : function(){
				if(isLoaded === true){
					return;
				}
				var list = [];
				superCookie(key, function(val){
					var html = '<h4 class="category">最近浏览的筛选条件</h4>';
					val=$.evalJSON($.evalJSON(val));
					if(val && val.length>0){
						for(var i = 0, len = val.length;i < len; i++){    
							html += string.format('<li class="item"><a href="{0}" class="topbar-category-item-left">{1}</a></li>', val[i].url, val[i].local);
						}
					}
					html += '<a href="http://bangbang.58.com"><p class="bangbang_pr" style="+padding:0;-padding:8px; padding-left:20px; line-height:30px;">用58帮帮，帮你秒杀新信息<em class="bangbang_newico"></em></p></a><h4 class="category">最近浏览的信息</h4>';   
					$('#myfeetBox').prepend(html); 
					isLoaded = true;
				});
			}
		};
	}
);

define('common/topbarHistory',['common/config', 'common/jQuery.cookie', 'common/historyFinal', 'common/historyList'], function(config, cookie, historyFinal, historyList){
	return {
		getHtml : function(){
			var html = '<div id="myfeet" class="haschild"><span class="topbaricon icon-history">浏览记录</span><div id="myfeetBox" class="hc"><ul id="feet_final"><li>数据加载中...</li></ul><i class="shadow"></i></div>';
			//只对初入网站的人进行提示
			if ('end' != $.cookie('myfeet_tooltip')){
				html += '<!---气泡---><div id="myfeet_tooltip" class="msgTips"><i class="msgTips_arrow"></i><div class="msgTips_con">您的浏览可以被记录啦！</div><i class="shadow"></i></div>';
			}
			html += '</div> ';
			
			//保证气泡只显示一次/当用户鼠标划过气泡，或者5秒后自动隐藏
			if ($.cookie('myfeet_tooltip') != 'end') {
				var tooltipHidden = false,
					myfeet_tooltip = $('#myfeet_tooltip'),
					hideTooltip = function(){
						if(tooltipHidden)
							return;
						myfeet_tooltip = $('#myfeet_tooltip');
						myfeet_tooltip.hide();
						$.cookie('myfeet_tooltip', 'end');
						tooltipHidden = true;
					};
				myfeet_tooltip.live('mouseover', function(){
					hideTooltip();
				});
				setTimeout(hideTooltip, 5000);
			}

			$('#myfeet').live('mouseenter', function(){
				$(this).addClass('hover');
				historyFinal.render();
				if(config.isList){
					historyList.render();
				}
			})
			.live('mouseleave', function(){
				$(this).removeClass('hover');
			});
			
			return html;
		}
	};
});

define('common/topbarSearch',['common/config'], function(config){
	return {
		getHtml : function(){
			if(config.isHome || 'www' == config.city.listname){
				return '';
			}
			var html = '<div id="minsearch" class="haschild">搜索<span class="arrow"></span> <div id="minsearchBox" class="hc"> <input class="keyword" autocomplete="off" value="" id="minsearchkeyword" type="text"> <input id="minsearchsearchbtn" type="button" value="" > <i class="shadow"></i></div></div>';
			
			$('#minsearch').live('mouseenter', function(){
					$(this).addClass('hover');
			})
			.live('mouseleave', function(){
					$(this).removeClass('hover');
			});
			function minsubmit(){
				var key = $('#minsearchkeyword').val();
				key = encodeURIComponent(key.replace(/([^\u0391-\uFFE5a-zA-Z0-9@#\+\-_\. ])/ig, ''));
				if (key) {
					location.href = 'http://' + config.city.listname + '.58.com/sou/jh_' + key + '/final_1/';
				}
				else {
					location.href = 'http://' + config.city.listname + '.58.com/sou/';
				}
			}
			$('#minsearchkeyword').live('keyup', function(evt){
				if (evt.keyCode == 13) {
					minsubmit();
				}
			});
			$('#minsearchsearchbtn').live('click', function(){
				minsubmit();
			});
			
			return html;
		}
	};
});
define('common/topbarMyLogin',['common/config', 'common/login'], function(config, login){
	return {
		getHtml : function(){
			var html = '',
				isLogin = login.isLogin();
			if(!isLogin){
				html += '<div id="login"><a href="https://passport.58.com/login/">登录</a><span class="gap">|</span><a href="https://passport.58.com/reg/">注册</a></div>';
			}
			else{
				html += '<div id="login"  style="margin: 0pt 10px;"><a target="_self" href="https://passport.58.com/logout?path=' + escape(location.href) + '&back=now">退出</a></div>';
			}
			html += '<div id="topbar_my58menu" class="haschild"><a id="topbar_tomy58" target="_self" href="http://my.58.com/?pp=topbar">我的58</a><span class="arrow"></span><div class="hc" id="loginbox"><a id="topbar_tomypost" href="http://my.58.com/index/?pp=topbar">我的发布</a><a id="topbar_tomytradebuy" href="http://my.58.com/buyordermgr/?pp=topbar">买家交易</a><a id="topbar_tomytradesale" href="http://my.58.com/saleordermgr/?pp=topbar">卖家交易</a><a id="topbar_tozhaopinqiuzhi" href="http://my.58.com/zhaopinqiuzhi/?pp=topbar">招聘/简历</a><a id="topbar_toCustomerService" href="http://my.58.com/mycomplain">客户服务</a></div></div>';
			$('#topbar_my58menu').live('mouseenter', function(){
				$(this).addClass('hover');
			})
			.live('mouseleave', function(){
				$(this).removeClass('hover');
			});
			$('#topbar_tomy58').live('click', function(){
				if(isLogin){
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/login/tomy58/']);
				} else {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/nologin/tomy58/']);
				}
			});
			$('#topbar_tomypost').live('click', function(){
				if(isLogin) {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/login/tomypost/']);
				} else {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/nologin/tomypost/']);
				}
			});
			$('#topbar_tozhaopinqiuzhi').live('click', function(){
				if(isLogin) {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/login/tozhaopinqiuzhi/']);
				} else {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/nologin/tozhaopinqiuzhi/']);
				}
			});
			$('#topbar_toCustomerService').live('click', function(){
				if(isLogin) {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/login/toCustomerService/']);
				} else {
					_gaq.push(['pageTracker._trackEvent', 'topbar', 'my58', '/nologin/toCustomerService/']);
				}
			});
			return html;
		}
	};
});
define('common/topbarPostLink',['common/config'], function(config){
	return {
		getHtml : function(){
			if(config.isFinal){
				return '<div id="topPost" style="float:left; padding:0 8px;"><a href="http://post.58.com/t">免费发布信息</a></div>';
				/*var map = {
					'35' : 'ershou_shouji',
					'36' : 'ershou_diannao',
					'37' : 'ershou_shuma'
				};
				if(map[config.cate.dispid]){
					setTimeout(function(){
						var pop_pic_show = $('#pop_pic_show');
						if(pop_pic_show.length) {
							var val = map[config.cate.dispid];
							if ($.cookie(val) != 'end') {
								pop_pic_show.removeAttr('style');
								var LogisticsInfo = $("#LogisticsInfo");
								if(0 < LogisticsInfo.length){
									var offset = LogisticsInfo.offset();
									pop_pic_show.css({
										top : offset.top - pop_pic_show.height(),
										left : offset.left
									});
								}
								$.cookie(val, 'end');
							}
						} 
					},1000);
				}*/
			}
			return '';
		}
	};
});
define('common/topbarSitemap',['common/config', 'common/util.string'], function(config, string){
	function getPMInfo(){
		if(config.isHome){
			return '?utm_source=58.com_homeheader';
		}
		if(config.isList || config.isTopList){
			return '?utm_source=58.com_listheader';
		}
		if(config.isFinal){
			return '?utm_source=58.com_detailheader';
		}
		if(config.isMy){
			return '?utm_source=58.com_myheader';
		}
		return '';
	}
	return {
		getHtml : function(){
			var html = '';
			html += '<div id="sitemap" class="haschild"><span class="topbaricon icon-sitemap">导航</span> <div id="sitemapBox" class="hc">';
			html += string.format('     <div class="maplist"> <a href="{0}/house.shtml">房产</a>：<a href="{0}/zufang/">租房</a>   <a href="{0}/ershoufang/">买房</a>   <a href="{0}/duanzu/">短租</a><br><a href="{0}/sale.shtml">二手</a>：<a href="{0}/diannao/">电脑</a>   <a href="{0}/shouji/">手机</a>   <a href="{0}/jiadian/">家电</a><br><a href="{0}/job.shtml">招聘</a>：<a href="{0}/yewu/">销售</a>   <a href="{0}/kefu/">客服</a>   <a href="{0}/zpshengchankaifa/">普工</a><br><a href="{0}/car.shtml">车辆</a>：<a href="{0}/ershouche/">汽车</a>   <a href="{0}/zuche/">租车</a>   <a href="{0}/pinche/">拼车</a><br><a href="{0}/searchjob.shtml">求职</a>   <a href="{0}/jianzhi.shtml">兼职</a>   <a href="{0}/huangye/">黄页</a>   <a href="{0}/jiaoyu.shtml">培训</a><br><a href="{0}/piaowu.shtml">票务</a>   <a href="{0}/lvyouxiuxian.shtml">旅游</a>   <a href="{0}/pets.shtml">宠物</a>   <a href="{0}/jiaoyou.shtml">交友</a>  </div>', 'http://' + (config.city.listname || 'www') + '.58.com');
			html += '       <div class="mapfuc">';
			html += '<a href="http://t.58.com/' + getPMInfo() + '" class="c_r">同城团购   每日一团</a> <br>';
			html += '<a href="http://post.58.com/t/">免费发布</a>   ';
			//2011年6月9日 高文 http://sys.58control.cn/browse/JISHU-4924
			html += '<a href="http://about.58.com/info/del-menu.html">删除信息</a><br>';
			//2011年6月23日 高文 http://sys.58control.cn/browse/JISHU-5022
			//2011年9月14日 王晶晶 http://sys.58control.cn/browse/JISHU-5622
			html += '<a href="http://about.58.com/yinsibaohu.html?utm_source=top-navigation&utm_medium=58call&utm_campaign=link-click">58隐私保护助手</a><br>';
			html += '<a href="http://wap.58.com/wap.html">手机畅游58同城</a> <br>';
			html += '<a href="http://apply.vip.58.com/">58同城网邻通</a> <br>';
			html += '<a href="http://bangbang.58.com/?source=11" class="bangbang">58帮帮</a> <br>';
			html += '<a class="fduihua" href="http://about.58.com/">帮助中心</a></div>';
			html += '   <i class="shadow"></i></div></div>';
			
			$('#sitemap').live('mouseenter', function(){
				$(this).addClass('hover');
			})
			.live('mouseleave', function(){
				$(this).removeClass('hover');
			});
			
			return html;
		}
	};
});
define("common/topbarVip",['common/config'], function(config){ 
	return {
		getHtml : function(){
			return '<div style="padding-right:10px" class="haschild"><a href="http://vip.58.com/" onclick="javascript:clickLog(\'from=clicktovip&source=detail&city='+config.city.listname+'&cate='+config.cate.dispid+'\');_gaq.push([\'pageTracker._trackEvent\', \'detail\', \'topbar_click\', \'/'+config.city.listname+'/detail/topbar/clicktovip\']);">VIP中心</a></div>';
		}
	}
});


// 导航栏帮助
define('common/topbarHelp',['common/config'], function(config){
    return {
        getHtml : function(){
            return '<div style="padding-right:10px" class="haschild"><a href="http://about.58.com/" onclick="javascript:clickLog(\'from=clicktohelp&source=list&city='+config.city.listname+'&cate='+config.cate.dispid+'\');_gaq.push([\'pageTracker._trackEvent\', \'list\', \'topbar_click\', \'/'+config.city.listname+'/list/topbar/clicktohelp\']);" target="_blank">帮助</a></div>';
        }
    };
});
define('common/topbar',['common/config', 'common/jQuery.cookie', 'common/util.string', 'common/login', 'common/topbarCity', 'common/topbarChangeCity', 'common/topbarWap', 'common/topbarBackHome', 'common/topbarMsg', 'common/topbarHistory', 'common/topbarSearch', 'common/topbarMyLogin', 'common/topbarPostLink', 'common/topbarSitemap','common/topbarVip', 'common/topbarHelp'], function(config, cookie, string, login, topbarCity, topbarChangeCity, topbarWap, topbarBackHome, topbarMsg, topbarHistory, topbarSearch, topbarMyLogin, topbarPostLink, topbarSitemap,topbarVip, topbarHelp){
	var topbar = {
		/**
		 * 是否已经加载
		 */
		loaded : false,
		/**
		 * 初始化导航栏
		 */
		init: function(){
			/**
			 * 保证topbar只被加载一次
			 */
			if(this.loaded) return false;
			this.loaded = true;

			var html = '<div class="w pos">';
			//左边模块
			html += '<div class="bar_left">';
			//城市名称
			html += topbarCity.getHtml();
			//切换城市
			html += topbarChangeCity.getHtml();
			//手机上58
			html += topbarWap.getHtml();
			//左边模块结束
			html +='</div>';
			//右边模块
			html += '<div class="bar_right">';
			//返回首页
			html += topbarBackHome.getHtml();
			if(config.isMy && login.isLogin()){
				//用户登录状态 && 我的58
				html += topbarMyLogin.getHtml();
				//消息
				html += topbarMsg.getHtml();
				//搜索
				html += topbarSearch.getHtml();
			}
			else{
				//搜索
				html += topbarSearch.getHtml();
				//用户登录状态 && 我的58
				html += topbarMyLogin.getHtml();
			}
			
			/*
			var excludeDispids = ['356', '8659', '8645', '8658', '152', '8668'];
			if("bj" == config.city.listname && -1 < $.inArray(config.cate.dispid, excludeDispids)){
				html += '<div id="shopCenter" class="haschild"><a href="http://vip.58.com/" target="_self">商家中心</a><span class="arrow"></span><div id="shopsbox" class="hc"><a href="http://vip.58.com/v2/onlyshopleft/938069/">出售中的商品</a><a href="http://vip.58.com/v2/onlyshopleft/938071/" >订单管理</a><a href="http://vip.58.com/v2/onlyshopleft/938072/" >预约管理</a></div></div>';
			}*/
			//添加VIP代码
			 html += topbarVip.getHtml();
			
			//免费发布信息
			html += topbarPostLink.getHtml();
			//帮助
			html += topbarHelp.getHtml();
			//浏览记录功能
			html += topbarHistory.getHtml();
			//网站导航
			html += topbarSitemap.getHtml();
			//右边模块结束
			html +='</div>';
			//外层封装结束
			html +='</div>';
			$('#topbar').html(html);
			//topbar二维码部分显示控制
			$('#topbar_shouji_58').hover(function(){
				$('.mbox').toggle();
			});
			/*$('#shopCenter').hover(function(){
				$(this).addClass('hover');
			},
			function(){
				$(this).removeClass('hover');
			});*/

			//初始化用户登录状态(为了尽快的显示用户登录状态，所以在这里添加事件，否则可以在模块内使用$(function(){}))
			login.containerid = 'login';
			login.show();
			//获取城市的信息，得到城市的相关城市信息
			if(!config.isPost){
				$.getJSON(
					'http://api.58.com/comm/surroundingcitys-'+config.city.listname+'?api_callback=?',
					null,
					function(data){
						var d;
						if(!data || !(d = data[config.city.listname]) || 0 == d.length)
							return;
						
						var html = '';
						for(var i = 0, len = d.length;i < len; i++){
							var cn = '';
							var cat = '';
							for(var key in data[i]){
								cn = d[i][key];
							}
							var listname = config.catelist[config.catelist.length - 1].listname;
							if(listname !='' && listname != 'city'){
								cat = listname + '/';
							}
							html += string.format(' <a href="http://{0}.58.com/{1}">{2}</a>', key, cat, cn);
						}
						var ipconfig = $('#topbar_ipconfig');
						ipconfig.html(ipconfig.html().replace("]",st+" ]"));
					}
				);
			}
		}
	};
    topbar.init();
});

define('_pkg/sale/sale_common_zzfinal_just',['common/imLoad','common/topbar'], function (common_imLoad,common_topbar) {});
