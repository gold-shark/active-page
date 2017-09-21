$(function(){
	var x1 = 0, x2 = 0, wid = -$(window).width() * 0.7;
	//打开菜单
	$("header a.menu").click(function(){
		$("nav div.nav-body").css({"margin-left": wid});
		$("nav").show();
		$("nav div.nav-body").animate({"marginLeft": 0}, "fast", "linear");
		//3D BUG
		$(".banner").css({"-webkit-transform": "", "-moz-transform": "", "-ms-transform": "", "transform": ""});
	});
	//关闭菜单
	$("nav a.close").click(function(){
		$("nav div.nav-body").animate({"marginLeft": wid}, "fast", "linear", function(){
			$("nav").hide();
		});
	});
	//触摸事件 - 开始
	$("nav").touchstart(function(e){
		x1 = e.touches[0].pageX;
	});
	//触摸事件 - 移动
	$("nav").touchmove(function(e){
		e.preventDefault();//阻止默认事件
		x2 = e.touches[0].pageX;
		if(x2 - x1 < 0 && x2 != 0){						
			$("nav div.nav-body").css({"margin-left": x2 - x1});
		}
	});
	//触摸事件 - 结束
	$("nav").touchend(function(e){					
		if(x2 - x1 < -30 && x2 != 0){
			$("nav div.nav-body").animate({"marginLeft": wid}, "fast", "linear", function(){
				$("nav").hide();
			});
		} else {
			$("nav div.nav-body").animate({"marginLeft": 0}, "fast", "linear");
		}
	});
	//返回顶部
	$("header a.gotop").click(function(){
		$('body').animate({"scrollTop": 0}, 300);
	});
});