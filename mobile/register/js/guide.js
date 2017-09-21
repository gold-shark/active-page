$(function(){
	var n = 0, //当前页码
	m = 0, //之前页码
	b = false, //移动状态
	wid = $(window).width(), //宽
	heg = $(window).height(), //高
	leg = $(".guide").length, //长度
	startPosition = {x: 0, y: 0}, //开始位置
	endPosition = {x: 0, y: 0}, //结束位置
	startTime = 0, //开始时间
	endTime = 0; //结束时间	
	$(".guide-page").css({"width": 2 * wid, "height": heg});
	$(".guide").css({"width": wid, "height": heg});
	$(window).on("load", function(){
		$(".guide-page").css({"width": 2 * wid, "height": heg});
		$(".guide").css({"width": wid, "height": heg});
		$(".guide").find("img").css({"width": "100%", "height": "auto"});
	});
	/* 触控事件 */
	$(".guide-body").on("touchstart", function(e){
		$.extend(startPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
		startTime = new Date();
	});
	$(".guide-body").on("touchmove", function(e){
		if(typeof e.touches[0] === "object"){
			b = true;
		}
		e.preventDefault();
		$.extend(endPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
		$(".guide-body").css({"margin-left": -n * wid + endPosition.x - startPosition.x});
	});
	$(".guide-body").on("touchend", function(e){
		if(b){
			b = false;
			endTime = new Date();
			if(endPosition.x - startPosition.x > 30){
				if(n > 0){
					n--;
				}
			} else if(endPosition.x - startPosition.x < -30){
				if(n < leg - 1){
					n++;
				}
			};
			$(".guide-body").animate({"marginLeft": -n * wid}, 500, "linear");
			$(".guide-items").find("span").removeClass("current").eq(n).addClass("current");
		}
	});
});
