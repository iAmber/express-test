var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  		title: 'Express01',
  		content:'这是一些扯淡的话'
  	});
});
router.get('/pc/zz_detail', function(req, res) {
  res.render('pc/zz_detail', { 
		title: '转转详情页' ,
		pageModel:{
		    "commInfo": {
		        "dispLocal": {
		            "depth": 0, 
		            "dispLocalID": 1, 
		            "fullPath": "1", 
		            "isVisible": true, 
		            "listName": "bj", 
		            "localID": 1, 
		            "localName": "北京", 
		            "order": 1, 
		            "pID": 0, 
		            "type": 0
		        }, 
		        "dispCategory": {
		            "businessType": -1, 
		            "cateID": 36, 
		            "cateName": "苹果", 
		            "cateidList": "36", 
		            "depth": 2, 
		            "dispCategoryGroup": 1, 
		            "dispCategoryID": 7957, 
		            "filter": "objecttype=11", 
		            "fullPath": "5,36,7957", 
		            "infoCateidList": "36", 
		            "isVisible": true, 
		            "listName": "iphonesj", 
		            "order": 3, 
		            "pID": 36, 
		            "system": 0, 
		            "type": 1
		        }
		    }, 
		    "infoModel": {
		        "commentInfos": [
		            {
		                "city": 0, 
		                "commentsId": "726714655396888577", 
		                "content": "卖的比新的还贵", 
		                "fromNickName": "niko，，", 
		                "fromUid": "38420024030998", 
		                "imageNum": 0, 
		                "infoId": "722063975298138114", 
		                "isCredited": false, 
		                "nowPrice": "3000元", 
		                "portrait": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLC9l0O9dAwOibTVNgmTfZFO7lImwynXAfMO7zrDxWqu7YPjtQwEyW9BJViaYnFIUDKicvZ6zsrvkVPOQ/0", 
		                "relationship": "", 
		                "time": "1462097250000", 
		                "title": "iphone6", 
		                "toUid": "37504232718871", 
		                "uid": "37504232718871"
		            }, 
		            {
		                "city": 0, 
		                "commentsId": "724554232698535939", 
		                "content": "不要", 
		                "fromNickName": "哦耶哦喽哦买噶", 
		                "fromUid": "37504232718871", 
		                "imageNum": 0, 
		                "infoId": "722063975298138114", 
		                "isCredited": true, 
		                "nowPrice": "3000元", 
		                "portrait": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLB0xEV9HtVwQu1XpHw1wIw4R10HQibWfjyxCemH6UEicHiaNXJHKnLy4E3MfgpKIeZLh9yuibgueMc2jw/0", 
		                "relationship": "", 
		                "time": "1461582165000", 
		                "title": "iphone6", 
		                "toNickName": "A 雷疯哥哥", 
		                "toUid": "38944027802126", 
		                "uid": "37504232718871"
		            }
		        ], 
		        "moreInfos": [
		            {
		                "city": 0, 
		                "imageNum": 0, 
		                "infoId": "728084379058634754", 
		                "infoImage": [
		                    "http://pic2.58cdn.com.cn/zhuanzh/n_v1bl2lwwp4zyvfpqnwv5nq.jpg"
		                ], 
		                "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=728084379058634754&cateId=2101018&fullCate=5,36,7957&fullLocal=1", 
		                "nowPrice": "1868", 
		                "title": "9.99新个人自用64G苹果5S转让"
		            }, 
		            {
		                "city": 0, 
		                "imageNum": 0, 
		                "infoId": "727859492680564740", 
		                "infoImage": [
		                    "http://pic1.58cdn.com.cn/zhuanzh/n_v1bl2lwkbe7yuvo3svyvmq.jpg"
		                ], 
		                "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=727859492680564740&cateId=2101018&fullCate=5,36,7957&fullLocal=1", 
		                "nowPrice": "3199", 
		                "title": "iphone se 64g 玫瑰金"
		            }, 
		            {
		                "city": 0, 
		                "imageNum": 0, 
		                "infoId": "728117567797788676", 
		                "infoImage": [
		                    "http://pic6.58cdn.com.cn/zhuanzh/n_v1bkuymc5o54vfos4oluhq.jpg"
		                ], 
		                "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=728117567797788676&cateId=2101018&fullCate=5,36,7957&fullLocal=1", 
		                "nowPrice": "3300", 
		                "title": "64G苹果5se ，全网通4G网络"
		            }
		        ], 
		        "ownInfos": [
		            {
		                "area": "1142", 
		                "areaName": "朝阳", 
		                "audited": 0, 
		                "cateId": 0, 
		                "city": 1, 
		                "cityName": "北京", 
		                "collectCount": 0, 
		                "commentCount": 0, 
		                "content": 
		                	"9成新|64GB|银色\n支持移动2G/联通4G/电信3G•在二手优品，每部手机都经过前苹果Geinus Bar专业质检工程师的19项功能检测和32项外观检测，确保手机无任何功能性障碍，无进水、无拆修、无翻新、无卡贴•二手优品平台为售出手机提供30质保，让您放心使用\n•顺丰保价包邮，安全快速送达\n•当前商品优品编码：YPM31413\n•机器版本：其他版本\n•保修情况：无苹果官方保修\n•购买方式：转转平台下单在线支付（担保交易），暂不支持货到付款及分期付款\n•所有在转转购机的用户，附送品胜充电器一套\n•二手优品所售手机均为个人用户寄卖，平台仅对手机质量及价格合理性进行评估，以确保买家买到质量优良、价格合理的正品手机，手机的售卖价格由寄卖方决定，暂不支持议价\n•成色说明：\n99新——全新或仅拆封未使用\n95新——使用过无使用痕迹\n9新——有轻微使用痕迹\n8新——有较明显使用痕迹•二手优品，让您放心选购二手iPhone！", 
		                "freigth": 0, 
		                "goodCommentCount": 0, 
		                "imageNum": 0, 
		                "infoId": "728047447481548803", 
		                "infoImage": [
		                    "http://pic.58.com/bidding/big/n_v1bkujjd2dymuvojhtpzaa.jpg"
		                ],  
		                "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=728047512619089923&fullCate=5,36,7957&fullLocal=1", 
		                "isCollected": false, 
		                "isHide": false, 
		                "nowPrice": "1780", 
		                "postageExplain": 0, 
		                "status": 1, 
		                "title": "#官方质检#iPhone5s"
		            }, 
		            {
		                "area": "1142", 
		                "areaName": "朝阳", 
		                "audited": 0, 
		                "cateId": 0, 
		                "city": 1, 
		                "cityName": "北京", 
		                "collectCount": 0, 
		                "commentCount": 0, 
		                "content": "9成新|32GB|白色\n支持移动2G/联通3G/电信3G\n•在二手优品，每部手机都经过前苹果Geinus Bar专业质检工程师的19项功能检测和32项外观检测，确保手机无任何功能性障碍，无进水、无拆修、无翻新、无卡贴\n•二手优品平台为售出手机提供30质保，让您放心使用\n•顺丰保价包邮，安全快速送达\n•当前商品优品编码：YPM31419\n•机器版本：其他版本\n•保修情况：无苹果官方保修\n•购买方式：转转平台下单在线支付（担保交易），暂不支持货到付款及分期付款\n•所有在转转购机的用户，附送品胜充电器一套\n•二手优品所售手机均为个人用户寄卖，平台仅对手机质量及价格合理性进行评估，以确保买家买到质量优良、价格合理的正品手机，手机的售卖价格由寄卖方决定，暂不支持议价\n•成色说明：\n 99新——全新或仅拆封未使用\n 95新——使用过无使用痕迹\n 9新——有轻微使用痕迹\n 8新——有较明显使用痕迹\n•二手优品，让您放心选购二手iPhone！", 
		                "freigth": 0, 
		                "goodCommentCount": 0, 
		                "imageNum": 0, 
		                "infoId": "728047447481548803", 
		                "infoImage": [
		                    "http://pic.58.com/bidding/big/n_v1bkujjd2dymuvojhtpzaa.jpg"
		                ], 
		                "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=728047447481548803&fullCate=5,36,7957&fullLocal=1", 
		                "isCollected": false, 
		                "isHide": false, 
		                "nowPrice": "1230", 
		                "postageExplain": 0, 
		                "status": 1, 
		                "title": "#官方质检#iPhone5"
		            }
		        ], 
		        "userInfo": {
		            "badcount": 0, 
		            "credited": false, 
		            "friendTag": "", 
		            "friendsAmount": 0, 
		            "gender": "他", 
		            "goodcount": 0, 
		            "joinDays": 69, 
		            "judgmentContent": "", 
		            "judgmentImages": "", 
		            "labels": [ ], 
		            "largeScore": 4, 
		            "lat": 39.996132, 
		            "lon": 116.297203, 
		            "nickName": "林7猫", 
		            "residence": "北京", 
		            "score": 76, 
		            "sellingCount": 0, 
		            "shareUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/Mshare/personal.html?getUid=37504232718871&uidB=37504232718871", 
		            "smallScore": 0, 
		            "uid": "37653925376782", 
		            "userLabelArr": [ ], 
		            "userLocation": "北京", 
		            "verifyLabels": [ ],
		            "portrait":"http://pic4.58cdn.com.cn/zhuanzh/n_v1bl2lwwnnq4nvpnp6zzaa.jpg"
		        }, 
		        "zzInfo": {
		            "area": "1143", 
		            "areaName": "海淀", 
		            "audited": 1, 
		            "cateId": 2101018, 
		            "city": 1, 
		            "cityName": "北京", 
		            "collectCount": 4, 
		            "commentCount": 0, 
		            "freigth": 0, 
		            "goodCommentCount": 0, 
		            "imageNum": 4, 
		            "infoId": "723702926080262147", 
		            "infoImage": [
		                "http://pic1.58cdn.com.cn/zhuanzh/n_v1bkujjd5v34nfppqw54wq.jpg", 
		                "http://pic1.58cdn.com.cn/zhuanzh/n_v1bkuymc5z34nfp7rv7qbq.jpg", 
		                "http://pic6.58cdn.com.cn/zhuanzh/n_v1bkujjd5y34nfp7llqurq.jpg", 
		                "http://pic4.58cdn.com.cn/zhuanzh/n_v1bl2lwxvx34nfoolx4ioa.jpg"
		            ], 
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/Mshare/detail.html?infoId=723702926080262147", 
		            "isCollected": false, 
		            "isHide": false, 
		            "label": "验货面付|一口价", 
		            "nowPrice": "2500", 
		            "oriPrice": "4500", 
		            "postageExplain": 1, 
		            "status": 4, 
		            "title": "因换手机 5s出手", 
		            "viewCount": 524,
		            "content":"9成新|32GB|白色\n支持移动2G/联通3G/电信3G\n•在二手优品，每部手机都经过前苹果Geinus Bar专业质检工程师的19项功能检测和32项外观检测，确保手机无任何功能性障碍，无进水、无拆修、无翻新、无卡贴\n•二手优品平台为售出手机提供30质保，让您放心使用\n•顺丰保价包邮，安全快速送达\n•当前商品优品编码：YPM31419\n•机器版本：其他版本\n•保修情况：无苹果官方保修\n•购买方式：转转平台下单在线支付（担保交易），暂不支持货到付款及分期付款\n•所有在转转购机的用户，附送品胜充电器一套\n•二手优品所售手机均为个人用户寄卖，平台仅对手机质量及价格合理性进行评估，以确保买家买到质量优良、价格合理的正品手机，手机的售卖价格由寄卖方决定，暂不支持议价\n•成色说明：\n 99新——全新或仅拆封未使用\n 95新——使用过无使用痕迹\n 9新——有轻微使用痕迹\n 8新——有较明显使用痕迹\n•二手优品，让您放心选购二手iPhone！" 
		                

		        }
		    }
		},
		arr:{"yt1":"t2","yt2":"t3"}
	});
});
module.exports = router;//这一行前面加上代码，这样首页（“/”,”/index”）就同时指向了index


// module.exports = router;
