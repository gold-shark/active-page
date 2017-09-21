var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x;
var y;
var z;
var last_x;
var last_y;
var last_z;
var count = 2;
function deviceMotionHandler(eventData) {
　　var acceleration = eventData.accelerationIncludingGravity; 
　　var curTime = new Date().getTime(); 
　　var diffTime = curTime -last_update;
　　if (diffTime > 100) {
　　　　last_update = curTime; 
　　　　x = acceleration.x; 
　　　　y = acceleration.y; 
　　　　z = acceleration.z;
　　　　var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 8000; 
　　　　if (speed > SHAKE_THRESHOLD) {								
			window.removeEventListener('devicemotion', deviceMotionHandler, false);
			if(count > 0){
				$(".shake .pic6").addClass("anima4");
				var audio = new Audio();
				audio.src = "img/2874.mp3";
				audio.loop = false;
				audio.play();
				setTimeout(function(){
					$(".shake .pic8").show();
					$(".shake .pic9").show();
					$(".shake .pic8-1").addClass("anima5-1");
					$(".shake .pic8-2").addClass("anima5-2");
					$(".shake .pic8-3").addClass("anima5-3");
					$(".shake .pic8-4").addClass("anima5-4");
					$(".shake .pic8-5").addClass("anima5-5");
					$(".shake .pic9-1").addClass("anima5-5");
					$(".shake .pic9-2").addClass("anima5-4");
					$(".shake .pic9-3").addClass("anima5-3");
					$(".shake .pic9-4").addClass("anima5-2");
					$(".shake .pic9-5").addClass("anima5-1");
				}, 1200);
				setTimeout(function(){
					$(".shake .pic6").removeClass("anima4");
					$(".shake .pic8").hide();
					$(".shake .pic9").hide();
					$(".shake .pic8-1").removeClass("anima5-1");
					$(".shake .pic8-2").removeClass("anima5-2");
					$(".shake .pic8-3").removeClass("anima5-3");
					$(".shake .pic8-4").removeClass("anima5-4");
					$(".shake .pic8-5").removeClass("anima5-5");
					$(".shake .pic9-1").removeClass("anima5-5");
					$(".shake .pic9-2").removeClass("anima5-4");
					$(".shake .pic9-3").removeClass("anima5-3");
					$(".shake .pic9-4").removeClass("anima5-2");
					$(".shake .pic9-5").removeClass("anima5-1");
					$(".alert-body").css({"display": "block"});
					var number = Math.round(Math.random() * 50);
					count--;
					var html = "你摇到<em>"+ number +"</em>个金币，还剩余机会<em>"+ count +"</em>次";
					$(".txt1").find("p").html(html);
					$(".alert").find(".info").html(html);
				}, 3500);
			} else {
				setTimeout(function(){
					$(".alert-body").css({"display": "block"});
					$(".alert .info").html("你没有剩余机会了！");
				}, 1000);		
			}
		}
　　　　last_x = x; 
　　　　last_y = y; 
　　　　last_z = z; 
　　} 
};
function init(){
　　if (window.DeviceMotionEvent) {
　　　　window.addEventListener('devicemotion', deviceMotionHandler, false);
　　} else{
　　　　alert("你的手机不支持摇一摇!");
　　} 
};

$(function(){
	init();
	//规则
	$(".rule").on("tap", function(){
		$(".translucent,.fixed-popup").css({"display": "block"});
	});
	$(".translucent,.popup-close").on("tap", function(){
		$(".translucent,.fixed-popup").css({"display": "none"});
	});
	//分享
	$(".share").on("tap", function(){
		$(".translucent,.instruc-popup").css({"display": "block"});
	});
	$(".translucent,.instruc-popup").on("tap", function(){
		$(".translucent,.instruc-popup").css({"display": "none"});
	});
	//table
	if($("#list-name").length > 0){
		setInterval(function(){
			var line = $("#list-name").find("tr").last().clone();
			$("#list-name").find("tr").last().remove();
			$("#list-name").find("tbody").prepend(line);
			$("#list-name").find("tr").first().hide().fadeIn(300);
		}, 1000);
	}
	$(".alert .ok").find("a").on("tap", function(){
		$(".alert-body").css({"display": "none"});
		init();
	});
	//down
	$(window).on("scroll", function(){
		if($(window).scrollTop() > 30){
			$(".down").hide();
		} else {
			$(".down").show();
		}
	});
});