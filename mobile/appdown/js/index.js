$(function() {
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	
	$(".apple,.android").find("a").on("tap", function(){
		if(isWeiXin()){
			$(".share").css("display","block");
		}
	});
	
	$(".share").on("tap", function(){
		$(this).css("display","none");
	});
  
	var n = 0, //当前页码
		m = 0, //之前页码
		b = false, //移动状态
		wid = $(window).width(), //宽
		heg = $(window).height(), //高
		leg = $(".items").length, //长度
		startPosition = {
			x: 0,
			y: 0
		}, //开始位置
		endPosition = {
			x: 0,
			y: 0
		}, //结束位置
		startTime = 0, //开始时间
		endTime = 0; //结束时间
	$(".items").css({
		"height": heg
	});
	//动画效果
	//	var anima = function(n){
	//		$(".items").eq(n).find(".text").addClass("text-animation");
	//		$(".items").eq(n).find(".phone").addClass("phone-animation");
	//		setTimeout(function(){
	//			$(".text").removeClass("text-animation");
	//			$(".phone").removeClass("phone-animation");
	//		}, 500);
	//	};
	//	anima(0);
	/* 短屏样式  */
	//	var iphone4 = function(){
	//		if(wid/heg > 640/900){
	//			$(".items").find(".phone").css({"-webkit-transform": "scale(0.8) translateY(-30px)"});
	//			$(".items").find(".text").css({"-webkit-transform": "scale(0.8)"});
	//		}
	//	}
	//	iphone4();
	/* 触控事件 */
	$(".body").on("touchstart", function(e) {
		$.extend(startPosition, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
		startTime = new Date();
	});
	$(".body").on("touchmove", function(e) {
		if (typeof e.originalEvent.touches[0] === "object") {
			b = true;
		}
		e.originalEvent.preventDefault();
		$.extend(endPosition, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
		$(".list").css({
			"marginTop": -n * heg + endPosition.y - startPosition.y
		});
	});
	$(".body").on("touchend", function(e) {
		if (b) {
			b = false;
			endTime = new Date();
			if (endPosition.y - startPosition.y > 30) {
				if (n > 0) {
					n--;
				}
			} else if (endPosition.y - startPosition.y < -30) {
				if (n < leg - 1) {
					n++;
				}
			};
			$(".list").animate({
				"marginTop": -n * heg
			}, 500, "linear");
			//			if(n !== m){
			//				m = n;
			//				anima(n);
			//			}
		}
	});
});