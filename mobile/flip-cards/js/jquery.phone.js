(function($, undefined){
	var isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	$.extend($.fn,  {
		touchstart: function(options){
			this.each(function(i, e){
				if(isTouch && typeof options === "function"){
					e.addEventListener("touchstart", options, false);
				}
			});
		},
		touchmove: function(options){
			this.each(function(i, e){
				if(isTouch && typeof options === "function"){
					e.addEventListener("touchmove", options, false);
				}
			});
		},
		touchend: function(options){
			this.each(function(i, e){
				if(isTouch && typeof options === "function"){
					e.addEventListener("touchend", options, false);
				}
			});
		},
		touchcancel: function(options){
			this.each(function(i, e){
				if(isTouch && typeof options === "function"){
					e.addEventListener("touchcancel", options, false);
				}
			});
		},
		touchenter: function(options){
			this.each(function(i, e){
				if(isTouch && typeof options === "function"){
					e.addEventListener("touchenter", options, false);
				}
			});
		},
		touchleave: function(options){
			this.each(function(i, e){
				if(isTouch && typeof options === "function"){
					e.addEventListener("touchleave", options, false);
				}
			});
		}
	});	
}(jQuery));