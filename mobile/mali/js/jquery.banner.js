$(function($, undefined){
	var data = {
		perspective: 500,
		perspective_origin: {x: "center", y: "center"},
		width: $(window).width(),
		height: $(window).height(),
		direction: 1
	};
	$.extend($.fn, {
		cube3d: function(options){
			$.extend(data, options);
			this.each(function(i, e){
				if(data.direction == 0){
					//3d转换设置
					var _lenght = $(e).find(".cube").children().length,
					    _width = Math.round(data.perspective * data.width / (data.perspective + data.width / (2 * Math.tan(Math.PI / _lenght)))),
    					_height = Math.round(data.perspective * data.height / (data.perspective + data.width /(2 * Math.tan(Math.PI / _lenght)))),
    				    _poor = {x: data.width - _width, y: data.height - _height, z: _width / (Math.tan(Math.PI / _lenght) * 2)},	    		
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
	    				_top = _poor.y / 2;
	    				_bottom = _poor.y / 2;
	    			}
	    			if(data.perspective_origin.x == "left"){
	    				_left = 0;
	    				_right = _poor.x;
	    			} else if(data.perspective_origin.x == "right"){
	    				_left = _poor.x;
	    				_right = 0;
	    			} else {
	    				_left = _poor.x / 2;
	    				_right = _poor.x / 2;
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
		    				"-webkit-transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-moz-transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-ms-transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"transform": "rotateY("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-webkit-transform-origin": "center center",
		    				"-moz-transform-origin": "center center",
		    				"-ms-transform-origin": "center center",
		    				"transform-origin": "center center"
		    			});
		    		});
		    		var n = 0;
					$(e).touch({
						start:function(data1){},
						move:function(data1){
							data1.obj.find(".cube").css({
								"-webkit-transform": "rotateY(" + (-n * _deg + (data1.epc.x - data1.spc.x) * _deg / data1.obj.outerWidth()) + "deg)",
								"-moz-transform": "rotateY(" + (-n * _deg + (data1.epc.x - data1.spc.x) * _deg / data1.obj.outerWidth()) + "deg)",
								"-ms-transform": "rotateY(" + (-n * _deg + (data1.epc.x - data1.spc.x) * _deg / data1.obj.outerWidth()) + "deg)",
								"transform": "rotateY(" + (-n * _deg + (data1.epc.x - data1.spc.x) * _deg / data1.obj.outerWidth()) + "deg)"
							});
						},
						end:function(data1){
							if(data1.epc.x - data1.spc.x > 30){//右
								n--;
							} else if(data1.epc.x - data1.spc.x < -30) {//左
								n++;
							}
							data1.obj.find(".cube").stop().transition({rotateY: -n * _deg}, 500, "linear");
						}
					});
				} else{
					//3d转换设置
					var _lenght = $(e).find(".cube").children().length,
					    _width = Math.round(data.perspective * data.width / (data.perspective + data.height / (2 * Math.tan(Math.PI / _lenght)))),
    					_height = Math.round(data.perspective * data.height / (data.perspective + data.height /(2 * Math.tan(Math.PI / _lenght)))),
    				    _poor = {x: data.width - _width, y: data.height - _height, z: _height / (Math.tan(Math.PI / _lenght) * 2)},	    		
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
	    				_top = _poor.y / 2;
	    				_bottom = _poor.y / 2;
	    			}
	    			if(data.perspective_origin.x == "left"){
	    				_left = 0;
	    				_right = _poor.x;
	    			} else if(data.perspective_origin.x == "right"){
	    				_left = _poor.x;
	    				_right = 0;
	    			} else {
	    				_left = _poor.x / 2;
	    				_right = _poor.x / 2;
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
		    				"-webkit-transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-moz-transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-ms-transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"transform": "rotateX("+ i * _deg +"deg) translateZ(" + _poor.z + "px)",
		    				"-webkit-transform-origin": "center center",
		    				"-moz-transform-origin": "center center",
		    				"-ms-transform-origin": "center center",
		    				"transform-origin": "center center"
		    			});
		    		});
		    		var n = 0;
		    		$(e).touch({
						start:function(data1){},
						move:function(data1){
							data1.obj.find(".cube").css({
								"-webkit-transform": "rotateX(" + (-n * _deg + (data1.epc.y - data1.spc.y) * _deg / data1.obj.outerHeight()) + "deg)",
								"-moz-transform": "rotateX(" + (-n * _deg + (data1.epc.y - data1.spc.y) * _deg / data1.obj.outerHeight()) + "deg)",
								"-ms-transform": "rotateX(" + (-n * _deg + (data1.epc.y - data1.spc.y) * _deg / data1.obj.outerHeight()) + "deg)",
								"transform": "rotateX(" + (-n * _deg + (data1.epc.y - data1.spc.y) * _deg / data1.obj.outerHeight()) + "deg)"
							});
						},
						end:function(data1){
							if(data1.epc.y - data1.spc.y > 30){//右
								n--;
							} else if(data1.epc.y - data1.spc.y < -30) {//左
								n++;
							}
							data1.obj.find(".cube").stop().transition({rotateX: -n * _deg}, 500, "linear");
						}
					});
				}
			});
		}
	});
}(jQuery));