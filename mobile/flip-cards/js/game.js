(function($, undefined){
	var time = 30, integral = 0;
	$.game = function(){
		var b = setInterval(function(){
			time--;
			var times = (Math.floor(time/60).toString().length === 1 ? "0" + Math.floor(time/60).toString() : Math.floor(time/60).toString()) 
					+ ":" + ((time%60).toString().length === 1 ? "0" + (time%60).toString() : (time%60).toString());
			$("#times").html(times);
			if(time <= 0){
				clearInterval(b);
				clearInterval(d);	
				$(".game-over").show();
				if(integral <= 30){
					$(".pic33").find("img").attr("src", "img/16.png");
					$(".minval").html("小菜鸟，还要继续努力哦！");
				} else if(integral <= 50){
					$(".pic33").find("img").attr("src", "img/12.png");
					$(".minval").html("小达人，再努力点就晋升为小精英了！");
				} else {
					$(".pic33").find("img").attr("src", "img/9.png");
					$(".minval").html("小精英，距离最高分只有一步之遥了精英！");
				}
				$(".pic33").find("p").html(integral);
			}
		}, 1000);
		var d = setInterval(function(){	
			animations();
			if(time <= 20){
				clearInterval(d);
				d = setInterval(function(){
					animations();
					if(time <= 10){
						clearInterval(d);
						d = setInterval(function(){
							animations();
						}, 600);
					}
				}, 700);
			}
		}, 800);		
		$(".cell").find(".two").on("touchstart", function(){
			$(this).hide();
			$(this).prev().show();
			integral++;
			$("#integral").html(integral);
		});
		
		function animations(){
			$(".cell").find(".one").show();
			$(".cell").find(".two").hide();
			var num = Math.ceil(Math.random() * 2), arr = new Array(num);
			$.each(arr, function(i) {
				arr[i] = Math.floor(Math.random() * 12);
				$(".cell").eq(arr[i]).find(".one").hide();
				$(".cell").eq(arr[i]).find(".two").show();
			});
		}
	};
}(jQuery));