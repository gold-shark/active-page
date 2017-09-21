var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x;
var y;
var z;
var last_x;
var last_y;
var last_z;
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
			$(".divination-start .pic3").addClass("shake");
			$(".divination-start .pic13").addClass("single");
			$(".divination-start .pic14").addClass("sign");
			setTimeout(function(){
				$(".divination-start").css({"display": "none"});
				$(".divination-end").css({"display": "block"});
				//$(".divination-end .pic2").addClass("picture");
			}, 2500);
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
	$(".pic6").on("tap", function(){
		$(".divination-start .pic3").removeClass("shake");
		$(".divination-start .pic13").removeClass("single");
		$(".divination-start .pic14").removeClass("sign");
		$(".divination-start").css({"display": "block"});
		$(".divination-end").css({"display": "none"});
		init();
	});
});