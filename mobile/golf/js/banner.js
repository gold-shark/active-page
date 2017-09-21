$(function(){
	var leg = $(".banner").find("li").length, 
		wid = $(window).width(),
	    first = $(".banner").find("li").first().clone(), 
	    last = $(".banner").find("li").last().clone(),
	    html = "<div class='items absolute'>";
	for(var i = 0; i < leg; i++){
		if(i == 0){
			html += "<span class='current'></span>";
		} else {
			html += "<span></span>";
		}
	}
	html += "</div>";
	$(".banner").append(html);
	$(".banner").find("ul").append(first).prepend(last);
	$(".banner").css({"width": wid});
	$(".banner").find("ul").css({"width": wid * (leg + 2)});
	translateX(-wid);
	$(".banner").find("li").css({"width": wid});
	var s = setInterval(autoPlay, 3000);
	var n = 0, b = false, startPot = {x: 0, y: 0}, endPot = {x: 0, y: 0};
	$(".banner")[0].addEventListener("touchstart", function(e){
		clearInterval(s);
		$.extend(startPot, {x: e.touches[0].pageX, y: e.touches[0].pageY});
	}, false);
	$(".banner")[0].addEventListener("touchmove", function(e){
		e.preventDefault();
		$.extend(endPot, {x: e.touches[0].pageX, y: e.touches[0].pageY});
		b = true;
		translateX((n + 1) * (-wid) + (endPot.x - startPot.x))
	}, false);
	$(".banner")[0].addEventListener("touchend", function(e){
		if(b){
			b = false;
			var oldVal = (n + 1) * (-wid) + (endPot.x - startPot.x);
			if(endPot.x - startPot.x < -30){
				n++;
			} else if(endPot.x - startPot.x > 30) {
				n--;
			}
			var newVal = (n + 1) * (-wid);
			animation(oldVal, newVal, function(){
				if(n < 0){
					n = leg - 1;
				} else if(n > leg -1){
					n = 0;
				}
				translateX((n + 1) * (-wid));
				$(".banner .items").find("span").removeClass("current");
				$(".banner .items").find("span").eq(n).addClass("current");
			});
		}
		s = setInterval(autoPlay, 3000);
	}, false);
	//自动播放
	function autoPlay(){
		var oldVal = (n + 1) * (-wid);
		n++;
		var newVal = (n + 1) * (-wid);
		animation(oldVal, newVal, function(){
			if(n < 0){
				n = leg - 1;
			} else if(n > leg -1){
				n = 0;
			}
			translateX((n + 1) * (-wid));
			$(".banner .items").find("span").removeClass("current");
			$(".banner .items").find("span").eq(n).addClass("current");
		});
	};
	//动画
	function animation(oldVal, newVal, callback){
		var time = 300, 
			speed = (newVal - oldVal) / time,
			val = oldVal;
		var a = setInterval(function(){
			val += speed * 30;
			translateX(val);
			if((speed > 0 && val >= newVal) || (speed < 0 && val <= newVal)){
				translateX(newVal);
				clearInterval(a);
			}
		}, 30);
		callback();
	};
	//水平方向位移
	function translateX(val){
		$(".banner").find("ul").css({
			"-webkit-transform": "translateX(" + val + "px)",
			"-moz-transform": "translateX(" + val + "px)",
			"transform": "translateX(" + val + "px)"
		});
	};
});