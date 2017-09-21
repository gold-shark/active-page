(function($, undefined) {
	$.each(("touchstart touchmove touchend touchcancel touchenter touchleave").split(" "), function(i, name) {
		// Handle event binding
		$.fn[name] = function(data, fn) {
			return arguments.length > 0 ?
				this.on(name, null, data, fn) :
				this.trigger(name);
		};
	});
	//transfrom animation
	$.tool = {
		transform: function(val) {
			return {
				"-webkit-transform": val,
				"-moz-transform": val,
				"transform": val,
			}
		}
	};
	$.extend($.fn, {
		animation: function(oldObj, newObj, time, callback) {
			var obj = this;
			var allArray = [{
				oldVal: oldObj.translateX,
				newVal: newObj.translateX,
				styleName: "translateX",
				unit: typeof oldObj.translateX === "number" ? "px" : "%"
			}, {
				oldVal: oldObj.translateY,
				newVal: newObj.translateY,
				styleName: "translateY",
				unit: typeof oldObj.translateX === "number" ? "px" : "%"
			}, {
				oldVal: oldObj.translateZ,
				newVal: newObj.translateZ,
				styleName: "translateZ",
				unit: typeof oldObj.translateX === "number" ? "px" : "%"
			}, {
				oldVal: oldObj.scaleX,
				newVal: newObj.scaleX,
				styleName: "scaleX",
				unit: ""
			}, {
				oldVal: oldObj.scaleY,
				newVal: newObj.scaleY,
				styleName: "scaleY",
				unit: ""
			}, {
				oldVal: oldObj.scaleZ,
				newVal: newObj.scaleZ,
				styleName: "scaleZ",
				unit: ""
			}, {
				oldVal: oldObj.rotateX,
				newVal: newObj.rotateX,
				styleName: "rotateX",
				unit: "deg"
			}, {
				oldVal: oldObj.rotateY,
				newVal: newObj.rotateY,
				styleName: "rotateY",
				unit: "deg"
			}, {
				oldVal: oldObj.rotateZ,
				newVal: newObj.rotateZ,
				styleName: "rotateZ",
				unit: "deg"
			}, {
				oldVal: oldObj.skewX,
				newVal: newObj.skewX,
				styleName: "skewX",
				unit: "deg"
			}, {
				oldVal: oldObj.skewY,
				newVal: newObj.skewY,
				styleName: "skewY",
				unit: "deg"
			}];
			var newArray = new Array();
			$.each(allArray, function(i, e) {
				if (typeof e.oldVal !== "undefined" && typeof e.newVal !== "undefined") {
					if (typeof e.oldVal !== "number" && typeof e.newVal !== "number") {
						e.oldVal = parseFloat(e.oldVal.substr(0, e.oldVal.length - 1));
						e.newVal = parseFloat(e.newVal.substr(0, e.newVal.length - 1));
					}
					var newJson = {
						oldVal: e.oldVal,
						newVal: e.newVal,
						speed: (e.newVal - e.oldVal) / time,
						val: e.oldVal,
						styleName: e.styleName,
						unit: e.unit
					};
					newArray.push(newJson);
				}
			});
			var a = setInterval(function() {
				var cssText = "";
				$.each(newArray, function(i, e) {
					e.val += e.speed * 10;
					cssText += e.styleName + "(" + e.val + e.unit + ") ";
				});
				obj.css($.tool.transform(cssText));
				if ((newArray[0].speed > 0 && newArray[0].val >= newArray[0].newVal) || (newArray[0].speed < 0 && newArray[0].val <= newArray[0].newVal)) {
					cssText = "";
					$.each(newArray, function(i, e) {
						cssText += e.styleName + "(" + e.newVal + e.unit + ") ";
					});
					clearInterval(a);
					obj.css($.tool.transform(cssText));
					if (typeof callback === "function") {
						callback();
					}
				}
			}, 10);
		}
	});
}(jQuery));