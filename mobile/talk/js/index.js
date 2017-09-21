$(function(){
	var n = 0, //当前页码
		m = 0, //之前页码
		b = false, //移动状态
		wid = $(window).width(), //宽
		heg = $(window).height(), //高
		leg = $(".items").length, //长度
		startPosition = {x: 0, y: 0}, //开始位置
		endPosition = {x: 0, y: 0}; //结束位置
	$(".items").css({"height": heg});
	var anima = function(n){
		if(n === 0) {
			$(".pic2").addClass("pic2-anima");
			$(".pic3").addClass("pic3-anima");
			$(".pic4").addClass("pic4-anima");
			setTimeout(function(){
				$(".pic2").removeClass("pic2-anima");
				$(".pic3").removeClass("pic3-anima");
				$(".pic4").removeClass("pic4-anima");
			}, 1000);
		} else if(n === 1) {
			$(".pic5").addClass("pic1-anima");
			$(".pic6").addClass("pic3-anima");
			$(".pic7").addClass("pic4-anima");
			setTimeout(function(){
				$(".pic5").removeClass("pic1-anima");
				$(".pic6").removeClass("pic3-anima");
				$(".pic7").removeClass("pic4-anima");
			}, 1000);
		} else{
			$(".pic8").addClass("pic5-anima");
			$(".pic9").addClass("pic6-anima");
			$(".pic10").addClass("pic7-anima");
			$(".pic11").addClass("pic6-anima");
			$(".pic12").addClass("pic4-anima");
			setTimeout(function(){
				$(".pic8").removeClass("pic5-anima");
				$(".pic9").removeClass("pic6-anima");
				$(".pic10").removeClass("pic7-anima");
				$(".pic11").removeClass("pic6-anima");
				$(".pic12").removeClass("pic4-anima");
			}, 1000);
		}
	};
	anima(0);
	/* 触控事件 */
	$(".body").on("touchstart", function(e){
		$.extend(startPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
	});
	$(".body").on("touchmove", function(e){
		e.preventDefault();
		b = true;
		$.extend(endPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
		$(".list").animate({"translateY": -n * heg + endPosition.y - startPosition.y + "px"}, 10);
	});
	$(".body").on("touchend", function(e){
		if(b){
			b = false;
			if(endPosition.y - startPosition.y > 30){
				if(n > 0){
					n--;
				}
			} else if(endPosition.y - startPosition.y < -30){
				if(n < leg - 1){
					n++;
				}
			};
			$(".list").animate({"translateY": -n * heg + "px"}, 300, "out-in");
			if(n !== m){
				m = n;
				anima(n);
			}
		}
	});
});