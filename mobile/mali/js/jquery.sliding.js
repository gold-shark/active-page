/*
 * 
 * 
 */
(function($, undefined){
	var data = {
		start: function(options){},
		move: function(options){},
		end: function(options){}
	};
	var startpos = {
		x : 0,
		y : 0,
		time : undefined
	};
	var endpos = {
		x : 0,
		y : 0,
		time : undefined
	}
	$.extend($.fn, {
		touch : function(options){
			$.extend(data, options);
			this.each(function(i,e){
				//判断设备是否支持touch事件
				if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){
					e.addEventListener("touchstart", ontouchstart, false);
					e.addEventListener("touchmove", ontouchmove, false);
					e.addEventListener("touchend", ontouchend, false);
					function ontouchstart(event){
						var _touch = event.touches[0];
						$.extend(startpos, {x : _touch.pageX, y : _touch.pageY, time : +new Date});
						data.start({obj : $(e), spc : startpos});
					};
					function ontouchmove(event){
						//当屏幕有多个touch或者页面被缩放过，就不执行move操作
						if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) 
							return;
						var _touch = event.touches[0];
						$.extend(endpos, {x : _touch.pageX, y : _touch.pageY, time : +new Date});
						//阻止触摸事件的默认行为，即阻止滚屏
						event.preventDefault();      
				        data.move({obj : $(e), spc : startpos, epc : endpos});
					};
					function ontouchend(event){
						data.end({obj : $(e), spc : startpos, epc : endpos});
						//e.removeEventListener("touchstart", ontouchstart, false)
						//e.removeEventListener('touchmove', ontouchmove, false);
				        //e.removeEventListener('touchend', ontouchend, false);
					};
				}
			});
		}
	});
}(jQuery));