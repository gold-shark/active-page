$(function(){
	var index = {n:0, m:0}; 
	$(".dwonload .tabs").find("a").on("click", function(){
		$(".dwonload .tabs").find("a").removeClass("current");
		$(this).addClass("current");
		index.n = $(this).index();
		danim(index.n);
	});
	$(".items .tabs").find("a").on("click", function(){
		$(".items .tabs").find("a").removeClass("current");
		$(this).addClass("current");
		index.m = $(this).index();
		anim(index.m);
	});	
	$(".banner").find(".a").on("click", function(){
		danim(index.n);
	});
	$(".banner").find(".b").on("click", function(){
		anim(index.m);
	});	
	var danim = function(n){
		var o;
		switch(n){
			case 0: o = $(".dwonload .one"); break;
			case 1: o = $(".dwonload .two"); break;
			default: o = $(".dwonload .one"); break;
		}
		$(".dwonload .content").hide();
		o.show();
		o.find(".phone").addClass("anim-text");
		o.find(".text").addClass("anim-phone");
		setTimeout(function(){
			o.find(".phone").removeClass("anim-text");
			o.find(".text").removeClass("anim-phone");
		}, 1200);
	};	
	var anim = function(n){
		var o;
		switch(n){
			case 0: o = $(".items .one"); break;
			case 1: o = $(".items .two"); break;
			case 2: o = $(".items .three"); break;
			case 3: o = $(".items .four"); break;
			default: o = $(".items .one"); break;
		}
		$(".items .content").hide();
		o.show();
		o.find(".phone").addClass("anim-phone");
		o.find(".text").addClass("anim-text");
		setTimeout(function(){
			o.find(".phone").removeClass("anim-phone");
			o.find(".text").removeClass("anim-text");
		}, 1200);
	};
});
