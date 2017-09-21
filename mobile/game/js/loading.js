var resource = {
	"picture": [
		"img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5-1.png",
		"img/5-2.png", "img/5-3.png", "img/6-1.png", "img/6-2.png", "img/6-3.png", 
		"img/6-4.png", "img/6-5.png", "img/6-6.png", "img/6-7.png", "img/6-8.png", 
		"img/6-9.png", "img/6-10.png", "img/6-11.png", "img/7.png", "img/8.png", 
		"img/8-1.png", "img/8-2.png", "img/8-3.png", "img/8-4.png", "img/8-5.png",
		"img/8-6.png", "img/8-7.png", "img/8-8.png", "img/8-9.png", "img/8-10.png", 
		"img/8-11.png", "img/8-12.png", "img/8-13.png", "img/8-14.png", "img/9.png", 
		"img/10.png", "img/11.png", "img/12.png", "img/13.png", "img/14.png",
		"img/15.png", "img/16.png", "img/17.png", "img/18.png", "img/19.png",
		"img/20.png", "img/21.png", "img/22.png", "img/23.png", "img/24.png",
		"img/25.png", "img/26.png", "img/27.png", "img/28.png", "img/29-1.png",
		"img/29-2.png", "img/29-3.png", "img/29-4.png", "img/29-5.png", "img/29-6.png",
		"img/30.png", "img/31.png", "img/32.png", "img/33.png", "img/34.png", 
		"img/35.png"
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
				$("img").css({"width": "100%", "height": "auto"});
			}
		};
	});
});
