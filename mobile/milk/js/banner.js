$(function(){
    $(window).resize(function(){
		if(ctime){
			clearTimeout(ctime);
		}
	    var ctime = setTimeout(function(){
			$(".banner").css({"width": $(window).width()});
			$(".banner").find("li").css({"width": $(window).width()});
			$(".banner").find("ul").css({"width": $(".banner").width() * ($(".banner").find("li").length + 2), "margin-left": -$(".banner").find("li").width()*(n + 1)});
		},10);					
	});
	$(".banner").css({"width": $(window).width()});
	$(".banner").find("li").css({"width": $(window).width()});
	$(".banner").append("<p></p>");
	$(".banner").find("li").each(function(i){
		if(i == 0){
			$(".banner").find("p").append("<span class='current'></span>");
		} else {
			$(".banner").find("p").append("<span></span>");
		}
	});
	$(".banner").find("ul").prepend($(".banner").find("li:last").clone()).append($(".banner").find("li").eq(1).clone());
	$(".banner").find("ul").css({"width": $(".banner").width() * ($(".banner").find("li").length + 2), "margin-left": -$(".banner").find("li").width()});
	var n = 0;
	var _length = $(".banner").find("span").length;
	var a = function(){
		if(n >= _length - 1){
			$(".banner").find("ul").stop().animate({"marginLeft": -$(".banner").find("li").width() * (n + 2)}, "normal", "linear", function(){
				$(".banner").find("ul").css({"margin-left": -$(".banner").find("li").width()});
				$(".banner").find("span").removeClass("current").eq(0).addClass("current");
				n = 0;
			});
		} else {
			n++;
			$(".banner").find("ul").stop().animate({"marginLeft": -$(".banner").find("li").width() * (n + 1)}, "normal", "linear");
			$(".banner").find("span").removeClass("current").eq(n).addClass("current");
		}
	}
	if(_length > 1){
		var b = setInterval(a, 5000);		
		//触控事件
		$(".banner").touch({
			start: function(data){
				clearInterval(b);
			},
			move: function(data){
				data.obj.find("ul").css("margin-left", -$(".banner").find("li").width() * (n + 1) - (data.spc.x - data.epc.x));
			},
			end: function(data){
				if((data.spc.x - data.epc.x) > 30){//向右滑动
					if(n >= _length - 1){
						data.obj.find("ul").stop().animate({"marginLeft": -$(".banner").find("li").width() * (_length + 1)}, "normal", "linear", function(){
							data.obj.find("ul").css({"margin-left": -$(".banner").find("li").width()});
							data.obj.find("span").removeClass("current").eq(0).addClass("current");
							n = 0;
						});
					} else {
						n++;
						data.obj.find("ul").stop().animate({"margin-left": -$(".banner").find("li").width() * (n + 1)}, "normal", "linear");
						data.obj.find("span").removeClass("current").eq(n).addClass("current");
					}
					b = setInterval(a, 5000);
				} else if((data.spc.x - data.epc.x) < -30){//向左滑动
					if(n <= 0){
						data.obj.find("ul").stop().animate({"margin-left": 0}, "normal", "linear", function(){
							data.obj.find("ul").css({"margin-left": - $(".banner").find("li").width() * (_length)});
							data.obj.find("span").removeClass("current").eq(_length - 1).addClass("current");
							n = _length - 1;
						});
					} else{
						n--;
						data.obj.find("ul").stop().animate({"margin-left": -$(".banner").find("li").width() * (n + 1)}, "normal", "linear");
						data.obj.find("span").removeClass("current").eq(n).addClass("current");
					}
					b = setInterval(a, 5000);
				} else{
					data.obj.find("ul").stop().animate({"margin-left": -$(".banner").find("li").width() * (n + 1)}, "normal", "linear");
					data.obj.find("span").removeClass("current").eq(n).addClass("current");
					b = setInterval(a, 5000);
				}
			}
		});
	}
});