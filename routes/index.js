var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  		title: 'Express01',
  		content:'这是一些扯淡的话'
  	});
});
router.get('/zhuanzhuan/per_detail', function(req, res) {
  res.render('zhuanzhuan/per_detail', { 
		title: '转转详情页' ,
		pageModel:{
		    "commInformationMap": {},
		    "commentInfos": [
		        {
		            "area": "1143",
		            "areaName": "朝阳",
		            "city": "1",
		            "cityName": "北京",
		            "commentsId": "724554232698535939",
		            "content": "不买",
		            "fromNickName": "A 雷疯哥哥",
		            "fromUid": "38944027802126",
		            "infoId": "722063975298138114",
		            "infoImage": [
		                "http://wx.qlogo.cn/mmopen/lCwVB66etfCHHX4WUJZDGqzpMqdmE7qaiaAibnmYbE4aWVCCqCZejYeR8LrFC71S2ibWSIciamlvWTVUPWjs4acia5Y2Z3icjpk1Sd/0",
		                "http://wx.qlogo.cn/mmopen/LHdtlaBo22eEIddRqY0jPXTSweB6WeCUopNdH9ia9wZCpWPslR3ldTYCQCymiagOA6zDJMTGtib8Sb8giaPe3pB0LZIVicry6LYicQ/0",
		                "http://wx.qlogo.cn/mmopen/uZGbtWQKIKerLic5JO9lsItZUuBSOeWJuQ3mVVJWkEmibicoibUeB68TZzNBIibfjKDmWPbuxZp3tvmuNa2zkNETABmkD9d4tjohU/0"
		            ],
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "isCredited": true,
		            "nowPrice": "3000",
		            "oriPrice": "400",
		            "portrait": "",
		            "relationship": "",
		            "time": "2016-04-27",
		            "title": "iphone6",
		            "toUid": "38944027802126",
		            "uid": "37504232718871",
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "nowPrice": "4098",
		            "oriPrice": "5000",
		            "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		        },
		        {
		            "area": "1143",
		            "areaName": "朝阳",
		            "city": "1",
		            "cityName": "北京",
		            "commentsId": "724554232698535939",
		            "content": "不买",
		            "fromNickName": "A 雷疯哥哥",
		            "fromUid": "38944027802126",
		            "infoId": "722063975298138114",
		            "infoImage": [
		                "http://wx.qlogo.cn/mmopen/lCwVB66etfCHHX4WUJZDGqzpMqdmE7qaiaAibnmYbE4aWVCCqCZejYeR8LrFC71S2ibWSIciamlvWTVUPWjs4acia5Y2Z3icjpk1Sd/0",
		                "http://wx.qlogo.cn/mmopen/LHdtlaBo22eEIddRqY0jPXTSweB6WeCUopNdH9ia9wZCpWPslR3ldTYCQCymiagOA6zDJMTGtib8Sb8giaPe3pB0LZIVicry6LYicQ/0",
		                "http://wx.qlogo.cn/mmopen/uZGbtWQKIKerLic5JO9lsItZUuBSOeWJuQ3mVVJWkEmibicoibUeB68TZzNBIibfjKDmWPbuxZp3tvmuNa2zkNETABmkD9d4tjohU/0"
		            ],
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "isCredited": true,
		            "nowPrice": "3000",
		            "oriPrice": "400",
		            "portrait": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLB0xEV9HtVwQu1XpHw1wIw4R10HQibWfjyxCemH6UEicHiaNXJHKnLy4E3MfgpKIeZLh9yuibgueMc2jw/0",
		            "relationship": "",
		            "time": "2016-04-27",
		            "title": "iphone6",
		            "toNickName": "哦耶哦喽哦买噶",
		            "toUid": "38944027802126",
		            "uid": "37504232718871",
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "nowPrice": "4098",
		            "oriPrice": "5000",
		            "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		        },
		        {
		            "area": "1143",
		            "areaName": "朝阳",
		            "city": "1",
		            "cityName": "北京",
		            "commentsId": "724554232698535939",
		            "content": "不买",
		            "fromNickName": "A 雷疯哥哥",
		            "fromUid": "38944027802126",
		            "infoId": "722063975298138114",
		            "infoImage": [
		                "http://wx.qlogo.cn/mmopen/lCwVB66etfCHHX4WUJZDGqzpMqdmE7qaiaAibnmYbE4aWVCCqCZejYeR8LrFC71S2ibWSIciamlvWTVUPWjs4acia5Y2Z3icjpk1Sd/0",
		                "http://wx.qlogo.cn/mmopen/LHdtlaBo22eEIddRqY0jPXTSweB6WeCUopNdH9ia9wZCpWPslR3ldTYCQCymiagOA6zDJMTGtib8Sb8giaPe3pB0LZIVicry6LYicQ/0",
		                "http://wx.qlogo.cn/mmopen/uZGbtWQKIKerLic5JO9lsItZUuBSOeWJuQ3mVVJWkEmibicoibUeB68TZzNBIibfjKDmWPbuxZp3tvmuNa2zkNETABmkD9d4tjohU/0"
		            ],
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "isCredited": true,
		            "nowPrice": "3000",
		            "oriPrice": "400",
		            "portrait": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLB0xEV9HtVwQu1XpHw1wIw4R10HQibWfjyxCemH6UEicHiaNXJHKnLy4E3MfgpKIeZLh9yuibgueMc2jw/0",
		            "relationship": "",
		            "time": "2016-04-27",
		            "title": "iphone6",
		            "toNickName": "哦耶哦喽哦买噶",
		            "toUid": "38944027802126",
		            "uid": "37504232718871",
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "nowPrice": "4098",
		            "oriPrice": "5000",
		            "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		        },
		        {
		            "area": "1143",
		            "areaName": "朝阳",
		            "city": "1",
		            "cityName": "北京",
		            "commentsId": "724554232698535939",
		            "content": "不买",
		            "fromNickName": "A 雷疯哥哥",
		            "fromUid": "38944027802126",
		            "infoId": "722063975298138114",
		            "infoImage": [
		                "http://wx.qlogo.cn/mmopen/lCwVB66etfCHHX4WUJZDGqzpMqdmE7qaiaAibnmYbE4aWVCCqCZejYeR8LrFC71S2ibWSIciamlvWTVUPWjs4acia5Y2Z3icjpk1Sd/0",
		                "http://wx.qlogo.cn/mmopen/LHdtlaBo22eEIddRqY0jPXTSweB6WeCUopNdH9ia9wZCpWPslR3ldTYCQCymiagOA6zDJMTGtib8Sb8giaPe3pB0LZIVicry6LYicQ/0",
		                "http://wx.qlogo.cn/mmopen/uZGbtWQKIKerLic5JO9lsItZUuBSOeWJuQ3mVVJWkEmibicoibUeB68TZzNBIibfjKDmWPbuxZp3tvmuNa2zkNETABmkD9d4tjohU/0"
		            ],
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "isCredited": true,
		            "nowPrice": "3000",
		            "oriPrice": "400",
		            "portrait": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLB0xEV9HtVwQu1XpHw1wIw4R10HQibWfjyxCemH6UEicHiaNXJHKnLy4E3MfgpKIeZLh9yuibgueMc2jw/0",
		            "relationship": "",
		            "time": "2016-04-27",
		            "title": "iphone6",
		            "toNickName": "哦耶哦喽哦买噶",
		            "toUid": "38944027802126",
		            "uid": "37504232718871",
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "nowPrice": "4098",
		            "oriPrice": "5000",
		            "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		        }
		    ],
		    "moreInfos": [
		        {
		            "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		            "nowPrice": "4098",
		            "oriPrice": "5000",
		            "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		        }
		    ],
		    "userInfo": {
		        "credited": false,
		        "joinDays": 50,
		        "lat": "39.996132",
		        "lon": "116.297203",
		        "nickName": "林7猫",
		        "sellingCount": 1,
		        "uid": "37653925376782",
		        "userLocation": "北京",
		        "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
	            "nowPrice": "4098",
	            "oriPrice": "5000",
	            "verifyLabels": [
					{
					"userId": "34857644331526",
					"labelId": "7358267754984902686",
					"labelName": "58官方认证",
					"labelColor": "0",
					"labelImage": "",
					"labelOrder": "0",
					"labelType": "3",
					"isAuthentication": true,
					"show": true,
					"obtainTime": "1446543465000"
					},
					{
					"userId": "34857644331526",
					"labelId": "4694663205469993075",
					"labelName": "51项质检",
					"labelColor": "0",
					"labelImage": "",
					"labelOrder": "1",
					"labelType": "3",
					"isAuthentication": true,
					"show": true,
					"obtainTime": "1446543465000"
					},
					{
					"userId": "34857644331526",
					"labelId": "8175991156120628614",
					"labelName": "30天质保",
					"labelColor": "0",
					"labelImage": "",
					"labelOrder": "2",
					"labelType": "3",
					"isAuthentication": true,
					"show": true,
					"obtainTime": "1446543465000"
					},
					{
					"userId": "34857644331526",
					"labelId": "5539725714716424241",
					"labelName": "个人寄卖",
					"labelColor": "0",
					"labelImage": "",
					"labelOrder": "3",
					"labelType": "3",
					"isAuthentication": true,
					"show": true,
					"obtainTime": "1446543465000"
					},
					{
					"userId": "34857644331526",
					"labelId": "7442943520162941502",
					"labelName": "拒绝翻新",
					"labelColor": "0",
					"labelImage": "",
					"labelOrder": "3",
					"labelType": "3",
					"isAuthentication": true,
					"show": true,
					"obtainTime": "1446543465000"
					},
					{
					"userId": "34857644331526",
					"labelId": "7841867510959393620",
					"labelName": "整机消毒",
					"labelColor": "0",
					"labelImage": "",
					"labelOrder": "3",
					"labelType": "3",
					"isAuthentication": true,
					"show": true,
					"obtainTime": "1446543465000"
					}
					],
	            "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		    },
		    "zzInfo": {
		    	"cityName":"美国",
		    	"areaName":"2333",
		        "audited": 1,
		        "cateId": 2101018,
		        "collectCount": 0,
		        "commentCount": 6,
		        "content": "9成新|16GB|银色\n支持移动2G/联通4G/电信3G\n\n•在二手优品，每部手机都经过前苹果Geinus Bar专业质检工程师的19项功能检测和32项外观检测，确保手机无任何功能性障碍，无进水、无拆修、无翻新、无卡贴\n•二手优品平台为售出手机提供30质保，让您放心使用\n•顺丰保价包邮，安全快速送达\n•当前商品优品编码：YPM26592\n•机器版本：其他版本\n•保修情况：无苹果官方保修\n•购买方式：转转平台下单在线支付（担保交易），暂不支持货到付款及分期付款\n•所有在转转购机的用户，附送品胜充电器一套\n•二手优品所售手机均为个人用户寄卖，平台仅对手机质量及价格合理性进行评估，以确保买家买到质量优良、价格合理的正品手机，手机的售卖价格由寄卖方决定，暂不支持议价\n\n•成色说明：\n 99新——全新或仅拆封未使用\n 95新——使用过无使用痕迹\n 9新——有轻微使用痕迹\n 8新——有较明显使用痕迹\n\n\n•二手优品，让您放心选购二手iPhone！",
		        "freigth": 0,
		        "goodCommentCount": 2,
		        "isCollected": true,
		        "isHide": false,
		        "label": "当面交易|当面交易|当面交易|当面交易|当面交易|当面交易|当面交易|当面交易|当面交易|一口价|一口价",
		        "loveUserHeadImg": [
		            "http://wx.qlogo.cn/mmopen/lCwVB66etfCHHX4WUJZDGqzpMqdmE7qaiaAibnmYbE4aWVCCqCZejYeR8LrFC71S2ibWSIciamlvWTVUPWjs4acia5Y2Z3icjpk1Sd/0",
		            "http://wx.qlogo.cn/mmopen/LHdtlaBo22eEIddRqY0jPXTSweB6WeCUopNdH9ia9wZCpWPslR3ldTYCQCymiagOA6zDJMTGtib8Sb8giaPe3pB0LZIVicry6LYicQ/0",
		            "http://wx.qlogo.cn/mmopen/uZGbtWQKIKerLic5JO9lsItZUuBSOeWJuQ3mVVJWkEmibicoibUeB68TZzNBIibfjKDmWPbuxZp3tvmuNa2zkNETABmkD9d4tjohU/0"
		        ],
		        "pics": "http://pic.58.com/bidding/big/n_v1bkuymc3wat2vmlwnv5ua.jpg|http://pic.58.com/bidding/big/n_v1bkuymc3yat2vnb2eqfkq.jpg|http://pic.58.com/bidding/big/n_v1bkuyfvjnax2vnlgiruea.jpg|http://pic.58.com/bidding/big/n_v1bl2lwklmat2vn6wzam3a.jpg|http://pic.58.com/bidding/big/n_v1bl2lwkdnat2vndpioecq.jpg|http://pic.58.com/bidding/big/n_v1bl2lwi3pat2vmeoaoyla.jpg|http://pic.58.com/bidding/big/n_v1bkujjd3qat2vnqnydfea.jpg|http://pic.58.com/bidding/big/n_v1bl2lwjdrat2vmyovkasa.jpg|http://pic.58.com/bidding/big/n_v1bl2lwwluat2vm7ynxara.jpg|http://pic.58.com/bidding/big/n_v1bl2lwtlvat2vnt3eorgq.jpg|http://pic.58.com/bidding/big/n_v1bl2lwxtwat2vmd6q2zja.jpg",
		        "postageExplain": 1,
		        "status": true,
		        "viewCount": 12,
		        "infoUrl": "http://m.zhuanzhuan.58.com/Mzhuanzhuan/listing/detail.html?infoId=724492308752023556&cateId=2101018&fullCate=5,36,7957&fullLocal=1",
		        "nowPrice": "4098",
		        "oriPrice": "9000",
		        "title": "手机是苹果6plus64G，刚刚买过来用一个星期，本来买来家人用，老人家不会用，忍疼割爱转让，有需要可以联系我，"
		    }
		},
		arr:{"yt1":"t2","yt2":"t3"}
	});
});
module.exports = router;//这一行前面加上代码，这样首页（“/”,”/index”）就同时指向了index


// module.exports = router;
