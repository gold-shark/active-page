$(function(){
	(function(){
		var date1 = {start: 0, end: 0};
		$(".pupop-close,.pupop-body").on("touchstart", function(e){
			e.originalEvent.preventDefault();
			date1.start = new Date().getTime();
		});
		$(".pupop-close,.pupop-body").on("touchend", function(e){
			e.originalEvent.preventDefault();
			date1.end = new Date().getTime();
			if (date1.end - date1.start < 300) {
				$(".pupop-body").hide();
			}
		});
		$(".pupop-body").find(".content").on("touchstart", function(e){
			e.originalEvent.stopPropagation();
		});
		$(".pupop-body").find(".content").on("touchend", function(e){
			e.originalEvent.stopPropagation();
		});
	}());
	(function(){
		var date1 = {start: 0, end: 0};
		$(".start").on("touchstart", starta = function(e){
			e.originalEvent.preventDefault();
			e.originalEvent.stopPropagation();
			date1.start = new Date().getTime();
		});
		$(".start").on("touchend", startb = function(e){
			e.originalEvent.preventDefault();
			e.originalEvent.stopPropagation();
			date1.end = new Date().getTime();
			if (date1.end - date1.start < 300) {
				$(".start").off("touchstart", starta);
				$(".start").off("touchend", startb);
				var num = Math.ceil(Math.random() * 7);
				$(".turntable").animation({"rotateZ": 0 +"deg"}, {"rotateZ": (720 + num * 51.4 + 26) + "deg"}, 3000, function(){
					alert(num);
					$(".turntable").removeAttr("style");
					$(".start").on("touchstart", starta);
					$(".start").on("touchend", startb);
				});
			}
		});
	}());
});
