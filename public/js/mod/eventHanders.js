/**
 * 专区事件处理模块
 */

define(['./getData', '../common/bangbangMobilCore', '../common/isScrollToBottom','../common/setPicSize', '../common/config'], function(getData, bb, isScrollToBottom, setPicSize, config) {
	// 事件处理函数对象
	console.info('iSlider:'+iSlider);
	var _iSlider = window.iSlider;
	var eventHander = {
		// 小图列表点击查看大图 
		small_img_click_handler: function(e) {
			console.info("------small_img_click_handler--------");
			__global4fe.SCROLLTOP = $('body').scrollTop();

			console.log('__global4fe.SCROLLTOP:' + __global4fe.SCROLLTOP);
			console.log('++++++ data-imgIndex：' + $(e.target).attr('data-imgIndex'));

			// 记录当前点击的是第几张图片
			var currentIndex = parseInt($(e.target).attr('data-imgIndex'));

			console.log('currentIndex:' + currentIndex);

			// 获取所有当前列表的所有列表图片
			var slide = $(e.target).parents('.slide');
			var imgs = slide[0].getElementsByTagName('img');
			var imgsSrcs = [];

			for (var i = 0; i < imgs.length; i++) {
				imgsSrcs.push(imgs[i].src);
			}
			console.log('imgsSrcs:', imgsSrcs.toString());

			var imgs500 = setPicSize(imgsSrcs, 500, 500);
			console.log('imgs500:', imgs500.toString());

			// iSlider
			var data = [];
			imgs500.map(function(item, index){
				data.push({
					width: '384',
					height: '600',
					content: item
				});
			})

			$('#bigImg').css('display', 'block');
			$('#list').css('display', 'none');

			var currentNum = $('#currentNum');
			currentNum.text(currentIndex+1);

			var totalNum = $('#totalNum');
			totalNum.text(imgs500.length);

			// var imgItem = $('.imgItem');

			var bigImgBox = document.getElementById('bigImgBox');
			bigImgBox.innerHTML = '';
			console.info('bigImgBox clientHeight:'+bigImgBox.clientHeight);
			var options = {
				dom: bigImgBox,
				data: data,
				onslideend: function(slideIndex) {
					console.log(slideIndex);
					currentNum.text(slideIndex+1);
				},
				// useZoom: true,
				// Template: false
			}
			console.info(options);
			// console.info('iSlider:'+iSlider);
			var slider = new _iSlider(options);
			slider.slideTo(currentIndex);

			// end iSlider
		},

		// 大图滑动点击返回
		big_img_cbk_handler: function(e) {
			$('#bigImg').css('display', 'none');
			$('#list').css('display', 'block');
			$('body').scrollTop(__global4fe.SCROLLTOP);

			console.log("call back:", __global4fe.SCROLLTOP)
		},

		// 商品列表项点击除底部商品图片列表外的跳转到商品详情
		skip_to_detail: function(e) {
			console.log('专区列表点击非商品图片type：'+e.target.tagName.toLowerCase());

			if (e.target.tagName.toLowerCase() == 'img' && $(e.target).attr('class') !== 'user-icon') {
				return false;
			}

			// var infoId = $(this).attr('data-query');
			var infoId = $(this).attr('id');
			console.info('skip_to_detail  infoId:' + infoId);
			console.log('----------enterInfoDetail---------');
			var methodName = 'enterInfoDetail';
			var args = [infoId];
			bb.invokeMethod(methodName, args, null); // 调取Native
		},

		// 滑到底部加载更多
		load_more: function(e) {
			if (isScrollToBottom()) {
				console.info('----------------load_more---------------')
				// ++__global4fe.pageNum;
				getData.shangpin_info(__global4fe.search, __global4fe.pageNum, __global4fe.pageSize);
			}
		},

		// 跳到优品页面
		gotoYoupin: function(e) {
			var topRightUrl = config.youpinPage;
			var methodName = 'goToTargetURL';
			var args = [topRightUrl];
			bb.invokeMethod(methodName, args, null);
		}

	}; //end eventHander

	return eventHander;
})
