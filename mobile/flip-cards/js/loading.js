var resource = {
	"picture": [
		"img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png",
		"img/6.png", "img/7.png", "img/8.png", "img/9.png", "img/10.png", 
		"img/11.png", "img/12.png", "img/13.png", "img/14.png", "img/15.png", 
		"img/16.png", "img/17.png", "img/18.png", "img/19.png",
		"img/portrait/1.png", "img/portrait/1-1.png", "img/portrait/1-2.png",
		"img/portrait/2.png", "img/portrait/2-1.png", "img/portrait/2-2.png",
		"img/portrait/3.png", "img/portrait/3-1.png", "img/portrait/3-2.png",
		"img/portrait/4.png", "img/portrait/4-1.png", "img/portrait/4-2.png",
		"img/portrait/5.png", "img/portrait/5-1.png", "img/portrait/5-2.png",
		"img/portrait/6.png", "img/portrait/6-1.png", "img/portrait/6-2.png",
		"img/portrait/7.png", "img/portrait/7-1.png", "img/portrait/7-2.png",
		"img/portrait/8.png", "img/portrait/8-1.png", "img/portrait/8-2.png",
		"img/portrait/9.png", "img/portrait/9-1.png", "img/portrait/9-2.png",
		"img/portrait/10.png", "img/portrait/10-1.png", "img/portrait/10-2.png",
		"img/portrait/11.png", "img/portrait/11-1.png", "img/portrait/11-2.png",
		"img/portrait/12.png", "img/portrait/12-1.png", "img/portrait/12-2.png"
	]
};
$(function(){
	var imgs = new Array(resource.picture.length), progre = 0;	
	$.each(imgs, function(i, e) {    
		e = new Image();
		e.src = resource.picture[i];
		e.onload = function(){
			progre += 1 / imgs.length * 100;
			$(".loading").find("p").html(Math.round(progre)+ "%");
			$(".loading").find(".b").css({"width": Math.round(progre)+ "%"});
			if(Math.round(progre) === 100){
				$(".loading").remove();
				$(".game-begin").show();
			}
		};
	});
});
