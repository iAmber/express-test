/**
 * pc详情接口请求
 */
define(['./ajaxCalbk', '../common/config'], function(ajaxCalbk,config){
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
})