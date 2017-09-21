(function($, undefined) {
	$.each(('touchstart touchmove touchend touchcancel touchenter touchleave').split(' '), function(i, name) {
		// Handle event binding
		$.fn[name] = function(data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});
	$.extend($.fn, {
		transform: function(val) {
			this.css({
				'-webkit-transform': val,
				'-moz-transform': val,
				'-ms-transform': val,
				'-o-transform': val,
				'transform': val
			});
		},
		transition: function(val) {
			this.css({
				'-webkit-transition': val,
				'-moz-transition': val,
				'-ms-transition': val,
				'-o-transition': val,
				'transition': val
			});
		}
	});
}(jQuery));