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
		}
	});	
}(jQuery));