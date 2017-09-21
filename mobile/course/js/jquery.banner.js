$(function($, undefined){
	var data = {
		perspective: 1000,
		perspective_origin: {x: "center", y: "center"},
		width: $(window).width(),
		height: $(window).height(),
		direction: 0
	};
	$.extend($.fn, {
		cube3d: function(options){
			$.extend(data, options);
			this.each(function(i, e){
				//3d转换设置
				var _lenght = $(e).find(".cube").children().length,
					_p = data.direction == 0 ? (data.perspective + data.width / (2 * Math.tan(Math.PI / _lenght))) : (data.perspective + data.height / (2 * Math.tan(Math.PI / _lenght))),
				    _width = Math.round(data.perspective * data.width / _p),
					_height = Math.round(data.perspective * data.height / _p),
				    _poor = {x: data.width - _width, y: data.height - _height, z: (data.direction == 0 ? _width : _height) / (Math.tan(Math.PI / _lenght) * 2)},	    		
	    			_deg = 360 / _lenght, 
	    			_top, 
	    			_right, 
	    			_bottom, 
	    			_left;
    			if(data.perspective_origin.y == "top"){
    				_top = 0;
    				_bottom = _poor.y;
    			} else if(data.perspective_origin.y == "bottom"){
    				_top = _poor.y;
    				_bottom = 0;
    			} else {
    				_top = Math.floor(_poor.y / 2);
    				_bottom = Math.ceil(_poor.y / 2);
    			}
    			if(data.perspective_origin.x == "left"){
    				_left = 0;
    				_right = _poor.x;
    			} else if(data.perspective_origin.x == "right"){
    				_left = _poor.x;
    				_right = 0;
    			} else {
    				_left = Math.floor(_poor.x / 2);
    				_right = Math.ceil(_poor.x / 2);
    			}
	    		$(e).css({
	    			"width": _width, 
	    			"height": _height, 
	    			"padding-top": _top, 
	    			"padding-right": _right, 
	    			"padding-bottom": _bottom, 
	    			"padding-left": _left,
	    			"overflow": "hidden",
	    			"-webkit-perspective": data.perspective,
	    			"-moz-perspective": data.perspective,
	    			"-ms-perspective": data.perspective,
	    			"perspective": data.perspective,
	    			"-webkit-perspective-origin": data.perspective_origin.x + " " + data.perspective_origin.y,
	    			"-moz-perspective-origin": data.perspective_origin.x + " " + data.perspective_origin.y,
	    			"-ms-perspective-origin": data.perspective_origin.x + " " + data.perspective_origin.y,
	    			"perspective-origin": data.perspective_origin.x + " " + data.perspective_origin.y,
	    			"-webkit-backface-visibility": "hidden",
	    			"-moz-backface-visibility": "hidden",
	    			"-ms-backface-visibility": "hidden",
	    			"backface-visibility": "hidden"
	    		});
	    		$(e).find(".cube").css({
	    			"position": "relative", 
	    			"width": "100%", 
	    			"height": "100%",
	    			"-webkit-transform-style": "preserve-3d",
	    			"-moz-transform-style": "preserve-3d",
	    			"-ms-transform-style": "preserve-3d",
	    			"transform-style": "preserve-3d"
	    		});
	    		$(e).find(".cube").children().each(function(i){
	    			$(this).css({
	    				"position": "absolute",
	    				"top": 0,
	    				"right": 0,
	    				"bottom": 0,
	    				"left": 0,
	    				"z-index": -1000,
	    				"-webkit-transform-origin": "center center",
	    				"-moz-transform-origin": "center center",
	    				"-ms-transform-origin": "center center",
	    				"transform-origin": "center center"
	    			});
	    			if(data.direction == 0){
	    				$(this).css({
	    					"-webkit-transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
	    					"-moz-transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
	    					"-ms-transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
	    					"transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)"
	    				});
	    			} else{
	    				$(this).css({
	    					"-webkit-transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-moz-transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-ms-transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)"
	    				});
	    			}
	    		});
	    		var n = 0, x1, x2, y1, y2;
	    		$(e).touchstart(function(e){
	    			x1 = e.touches[0].pageX;
	    			y1 = e.touches[0].pageY;
	    		});
	    		$(e).touchmove(function(e){
	    			e.preventDefault();
	    			x2 = e.touches[0].pageX;
	    			y2 = e.touches[0].pageY;
	    			if(data.direction == 0){
		    			$(this).find(".cube").css({
							"-webkit-transform": "rotateY(" + (-n * _deg + (x2 - x1) * _deg / data.width) + "deg)",
							"-moz-transform": "rotateY(" + (-n * _deg + (x2 - x1) * _deg / data.width) + "deg)",
							"-ms-transform": "rotateY(" + (-n * _deg + (x2 - x1) * _deg / data.width) + "deg)",
							"transform": "rotateY(" + (-n * _deg + (x2 - x1) * _deg / data.width) + "deg)"
						});
					} else {
						$(this).find(".cube").css({
							"-webkit-transform": "rotateX(" + (-n * _deg - (y2 - y1) * _deg / data.height) + "deg)",
							"-moz-transform": "rotateX(" + (-n * _deg - (y2 - y1) * _deg / data.height) + "deg)",
							"-ms-transform": "rotateX(" + (-n * _deg - (y2 - y1) * _deg / data.height) + "deg)",
							"transform": "rotateX(" + (-n * _deg - (y2 - y1) * _deg / data.height) + "deg)"
						});
					}
	    		});
	    		$(e).touchend(function(e){
	    			if(data.direction == 0){
		    			if(x2 - x1 > 30 && x2){//右
							n--;
						} else if(x2 - x1 < -30 && x2) {//左
							n++;
						}
						$(this).find(".cube").stop().transition({rotateY: -n * _deg}, "fast", "linear");
					} else {
						if(y2 - y1 > 30 && y2){//下
							n++;
						} else if(y2 - y1 < -30 && y2) {//上
							n--;
						}
						$(this).find(".cube").stop().transition({rotateX: -n * _deg}, "fast", "linear");
					}
	    		});
			});
		}
	});
}(jQuery));