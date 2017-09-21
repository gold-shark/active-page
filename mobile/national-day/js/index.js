$(function(){
	(function(){
		var date1 = {start: 0, end: 0};
		$(".pupop-body,.pupop-body .close").on("touchstart", function(e){
			e.originalEvent.preventDefault();
			date1.start = new Date().getTime();
		});
		$(".pupop-body,.pupop-body .close").on("touchend", function(e){
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
		var date1 = {start: 0, end: 0}, date2 = {start: 0, end: 0};
		$(".rule").find("a").on("touchstart", function(e){
			e.originalEvent.preventDefault();
			date1.start = new Date().getTime();
		});
		$(".rule").find("a").on("touchend", function(e){
			e.originalEvent.preventDefault();
			date1.end = new Date().getTime();
			if (date1.end - date1.start < 300) {
				$("#activity-rule").show()
			}
		});
		$(".activity").find("a").on("touchstart", function(e){
			e.originalEvent.preventDefault();
			date2.start = new Date().getTime();
		});
		$(".activity").find("a").on("touchend", function(e){
			e.originalEvent.preventDefault();
			date2.end = new Date().getTime();
			if (date2.end - date2.start < 300) {
				$("#record-info").show()
			}
		});
	}());
	(function(){
		var date1 = {start: 0, end: 0}, date2 = {start: 0, end: 0};
		$(".prize-info .tab").find("a").on("touchstart", function(e){
			e.originalEvent.preventDefault();
			date1.start = new Date().getTime();
		});
		$(".prize-info .tab").find("a").on("touchend", function(e){
			e.originalEvent.preventDefault();
			date1.end = new Date().getTime();
			if (date1.end - date1.start < 300) {
				$(this).siblings().removeClass("current");
				$(this).addClass("current");
				$(".prize").hide();
				$(".prize").eq($(this).index()).show();
			}
		});
		$(".ranking-info .tab").find("a").on("touchstart", function(e){
			e.originalEvent.preventDefault();
			date2.start = new Date().getTime();
		});
		$(".ranking-info .tab").find("a").on("touchend", function(e){
			e.originalEvent.preventDefault();
			date2.end = new Date().getTime();
			if (date2.end - date2.start < 300) {
				$(this).siblings().removeClass("current");
				$(this).addClass("current");
			}
		});
		var _date = {start: 0, end: 0};
		$(".activity-info .tab").find("a").on("touchstart", function(){
			_date.start = new Date().getTime();
		});
		$(".activity-info .tab").find("a").on("touchend", function(){
			_date.end = new Date().getTime();
			if (_date.end - _date.start < 300) {
				$(this).siblings().removeClass("current");
				$(this).addClass("current");
			}
		});
		var oldVal = 0,
			b = false,
			startPot = {x: 0, y: 0},
			endPot = {x: 0, y: 0};
		$(".activity-info .tab").on("touchstart", function(e){
			$.extend(startPot, {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY});				
		});
		$(".activity-info .tab").on("touchmove", function(e){
			e.originalEvent.preventDefault();
			$.extend(endPot, {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY});
			b = true;
			$(this).find("p").css($.tool.transform("translateX(" + (oldVal + endPot.x - startPot.x) + "px)"));
		});
		$(".activity-info .tab").on("touchend", function(e){
			if(b){
				b = false;
				var obj = $(this),
				    sapnWidth = obj.find("a").outerWidth(true),
				    margWidth = obj.find("a").outerWidth(true) - obj.find("a").outerWidth();
				    spanLength = obj.find("a").length;
				oldVal += endPot.x - startPot.x;
				var newVal = oldVal;
				if(oldVal > 0){
					newVal = 0;
				} else if(oldVal < obj.outerWidth() - sapnWidth * spanLength + margWidth){
					newVal = obj.outerWidth() - sapnWidth * spanLength + margWidth;
				}
				if(newVal !== oldVal){
					obj.find("p").animation({"translateX": oldVal}, {"translateX": newVal}, 300, function(){
						oldVal = newVal;
					});
				}
			}
		});
	}());
});
