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
			$(".main-body").css({"display":"none"});
			$(".package-body").css({"display":"block"});
			$(".record-body").css({"display":"none"});
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
	//alert($(window).width() + "," + $(window).height());
	//活动规则
	$(".rule").on("tap", function(){
		$("#rules").css({"display": "block"});
	});
	
	//关闭事件
	$(".close").on("tap", function(){
		$(".translucent").css({"display": "none"});
	});
	
	//点击小金包
	$(".mingold").on("tap", function(){		
		$("#pack").find("img").attr("src", "img/12-"+ $(this).data("id") +".png");
		$("#gold").css({"display": "block"});
	});
	
	//拆金包
	$("#pack").on("tap", function(){
		var num = Math.ceil(Math.random() * 5);
		$("#result").find("img").attr("src", "img/19-"+ num +".png");
		$("#results").css({"display": "block"});
	});
	
	//查看金包
	$(".look,.but2").find("a").on("tap", function(){
		$(".main-body").css({"display":"none"});
		$(".package-body").css({"display":"none"});
		$(".record-body").css({"display":"block"});
		$(".translucent").css({"display": "none"});		
	});
	
	//返回首页
	$(".back").on("tap", function(){
		$(".main-body").css({"display":"block"});
		$(".package-body").css({"display":"none"});
		$(".record-body").css({"display":"none"});
		init();
	});
	
	//输入手机号码
	$(".closes").on("tap", function(){
		$(".translucent").css({"display": "none"});
		$("#text").css({"display":"block"});
	});
	
	//分享
	$(".but1").find("a").on("tap", function(){
		$("#share").css({"display":"block"});
	});
	$("#share").on("tap", function(){
		$(this).css({"display":"none"});
	});
});