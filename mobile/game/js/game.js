(function($, undefined){
	var time = 30, integral = 0;
	var fang = [
		{
			"html": "<div class='fang'><img src='img/19.png' width='200' height='150' class='fang-start'/></div>",
			"afte": "<div class='gold'><img src='img/26.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/29-1.png' width='65' height='35' class='numb-end'/></div>",
			"inte": 5, "time": 0
		},
		{
			"html": "<div class='fang'><img src='img/20.png' width='200' height='150' class='fang-start'/></div>", 
			"afte": "<div class='gold'><img src='img/26.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/29-2.png' width='65' height='35' class='numb-end'/></div>",
			"inte": 3, "time": 0
		},
		{
			"html": "<div class='fang'><img src='img/21.png' width='200' height='150' class='fang-start'/></div>", 
			"afte": "<div class='gold'><img src='img/27.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/30.png' width='65' height='35' class='numb-end'/></div>", 
			"inte": 0, "time": 3
		},
		{
			"html": "<div class='fang'><img src='img/22.png' width='200' height='150' class='fang-start'/></div>", 
			"afte": "<div class='gold'><img src='img/26.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/29-3.png' width='65' height='35' class='numb-end'/></div>",
			"inte": 2, "time": 0
		},
		{
			"html": "<div class='fang'><img src='img/23.png' width='200' height='150' class='fang-start'/></div>", 
			"afte": "<div class='gold'><img src='img/26.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/29-4.png' width='65' height='35' class='numb-end'/></div>",
			"inte": 1, "time": 0
		},
		{
			"html": "<div class='fang'><img src='img/24.png' width='200' height='150' class='fang-start'/></div>", 
			"afte": "<div class='gold'><img src='img/28.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/29-5.png' width='65' height='35' class='numb-end'/></div>",
			"inte": -5, "time": 0
		},
		{
			"html": "<div class='fang'><img src='img/25.png' width='200' height='150' class='fang-start'/></div>", 
			"afte": "<div class='gold'><img src='img/28.png' width='72' height='72' class='gold-end'/></div>",
			"numb": "<div class='numb'><img src='img/29-6.png' width='65' height='35' class='numb-end'/></div>",
			"inte": -3, "time": 0
		},
	];
	//倒计时
	$.countdown = function(callback){
		var html= "<div class='countdown'><div class='number'><img src='img/15.png' width='386' height='256' class='seconds'/></div>";
		$("body").append(html);
		var i = 0;
		var b = setInterval(function(){
			var img ="<img src='img/" + (16 + i) + ".png' width='386' height='256' class='seconds'/>";
			$(".countdown").find(".number").empty().append(img);
			i++;
			if(i === 3){
				clearInterval(b);
				setTimeout(function(){
					$(".countdown").remove();
					callback();
				},1000);						
			}
		}, 1000);
	};
	//开始游戏
	$.game = function(){					
		var b = setInterval(function(){
			time--;
			var times = (Math.floor(time/60).toString().length === 1 ? "0" + Math.floor(time/60).toString() : Math.floor(time/60).toString()) 
					+ " : " + ((time%60).toString().length === 1 ? "0" + (time%60).toString() : (time%60).toString());
			$("#times").html(times);
		}, 1000);
		var d = setInterval(function(){
			var fang_array = new Array(6);
			$.each(fang_array, function(i, e) {    
				fang_array[i] = Math.floor(Math.random() * 2);                                                          
			});
			$(".game-area").find(".cell").empty();
			$(".game-area").find(".cell").each(function(i){
				if(fang_array[i] === 1){
					$.cell($(this));
				}
			});
			if(time <= 0){
				clearInterval(b);
				clearInterval(d);
				$(".game-area").find(".cell").empty();
				$(".game-over").show();
				$(".game-interface .sun-light").removeClass("light");
			}
		}, 1000);
	};
	//随机显示房子
	$.cell = function(obj){
		var m = Math.floor(Math.random() * 7);
		var p = {x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)};
		obj.append(fang[m].html);
		obj.find(".fang").css({
			"-webkit-transform": "translate(" + p.x + "%," + p.y +"%)",
			"-moz-transform": "translate(" + p.x + "%," + p.y +"%)",
			"transform": "translate(" + p.x + "%," + p.y +"%)",
			});
		obj.find(".fang").on("tap", function(){
			var _audio = new Audio();
			_audio.src = "audio/a.mp3";
			_audio.play();		
			$(this).off("tap");
			$(this).find("img").css({"visibility": "hidden"});
			$(this).append(fang[m].afte + fang[m].numb);
			integral += fang[m].inte;
			$("#integral").html(integral);
			time += fang[m].time;						
		});
	};
}(Zepto));