(function($, undefined) {
  var data = {
    width: $(window).width(),
    height: $(window).height(),
  };
  $.extend($.fn, {
    cube: function(options) {
      $.extend(data, options);
      this.each(function(i, e) {
        var perspective = 1000;
        var _lenght = 8;
        var leg = $(e).find(".cube").children().length;
        var _p = perspective + data.width / (2 * Math.tan(Math.PI / _lenght));
        var _width = Math.round(perspective * data.width / _p);
        var _height = Math.round(perspective * data.height / _p);
        var _poor = {
          x: data.width - _width,
          y: data.height - _height,
          z: _width / (Math.tan(Math.PI / _lenght) * 2)
        };
        var _deg = 360 / _lenght;
        var _top = Math.floor(_poor.y / 2);
        var _right = Math.ceil(_poor.x / 2);
        var _bottom = Math.ceil(_poor.y / 2);
        var _left = Math.floor(_poor.x / 2);
        console.log(Math.tan(Math.PI / _lenght))
        $(e).css({
          "width": _width,
          "height": _height,
          "padding-top": _top,
          "padding-right": _right,
          "padding-bottom": _bottom,
          "padding-left": _left
        });
        if (leg > 0) {
          $(e).find(".cube").children().eq(0).css({
            "display": "block",
            "-webkit-transform": "rotateY(0) translateZ(" + _poor.z + "px)",
            "-moz-transform": "rotateY(0) translateZ(" + _poor.z + "px)",
            "transform": "rotateY(0) translateZ(" + _poor.z + "px)"
          });
        }
        if (leg > 1) {
          $(e).find(".cube").children().eq(1).css({
            "display": "block",
            "-webkit-transform": "rotateY(45deg) translateZ(" + _poor.z + "px)",
            "-moz-transform": "rotateY(45deg) translateZ(" + _poor.z + "px)",
            "transform": "rotateY(45deg) translateZ(" + _poor.z + "px)"
          });
        }
        if (leg > 2) {
          $(e).find(".cube").children().eq(2).css({
            "display": "block",
            "-webkit-transform": "rotateY(90deg) translateZ(" + _poor.z + "px)",
            "-moz-transform": "rotateY(90deg) translateZ(" + _poor.z + "px)",
            "transform": "rotateY(90deg) translateZ(" + _poor.z + "px)"
          });
        }
        var n = 0;
        var b = false;
        var x1, x2, y1, y2;
        $(e).on('touchstart', function(e) {
          $(this).find(".cube").css({
            '-webkit-transition': 'none',
            '-moz-transition': 'none',
            'transition': 'none'
          });
          restore($(this), n, leg, _poor.z);
          x1 = e.originalEvent.touches[0].pageX;
          y1 = e.originalEvent.touches[0].pageY;
        });
        $(e).on('touchmove', function(e) {
          e.originalEvent.preventDefault();
          x2 = e.originalEvent.touches[0].pageX;
          y2 = e.originalEvent.touches[0].pageY;
          b = true;
          $(this).find(".cube").css({
            "-webkit-transform": "rotateY(" + ((x2 - x1) * _deg / data.width) + "deg)",
            "-moz-transform": "rotateY(" + ((x2 - x1) * _deg / data.width) + "deg)",
            "transform": "rotateY(" + ((x2 - x1) * _deg / data.width) + "deg)"
          });
        });
        $(e).on('touchend', function(e) {
          if (b) {
            b = false;
            var _this = $(this);
            var _angle = -_deg;
            if (x2 - x1 > 30 && x2) { //右
              n--;
              _angle = _deg;
            } else if (x2 - x1 < -30 && x2) { //左
              n++;
              _angle = -_deg;
            }
            if (n < 0) {
              n = 0;
              _angle = 0;
            } else if (n > leg - 1) {
              n = leg - 1;
              _angle = 0;
            }
            _this.find(".cube").css({
              '-webkit-transition': 'all .3s',
              '-moz-transition': 'all .3s',
              'transition': 'all .3s'
            });
            _this.find(".cube").css({
              "-webkit-transform": "rotateY(" + _angle + "deg)",
              "-moz-transform": "rotateY(" + _angle + "deg)",
              "transform": "rotateY(" + _angle + "deg)"
            });
            setTimeout(function() {
              restore(_this, n, leg, _poor.z);
            }, 300);
          }
        });
      });
    }
  });

  function restore(_this, n, leg, z) {
    _this.find(".cube").children().removeAttr('style');
    _this.find(".cube").children().eq(n).css({
      "display": "block",
      "-webkit-transform": "rotateY(0) translateZ(" + z + "px)",
      "-moz-transform": "rotateY(0) translateZ(" + z + "px)",
      "transform": "rotateY(0) translateZ(" + z + "px)"
    });
    if (n - 2 >= 0) {
      _this.find(".cube").children().eq(n - 2).css({
        "display": "block",
        "-webkit-transform": "rotateY(270deg) translateZ(" + z + "px)",
        "-moz-transform": "rotateY(270deg) translateZ(" + z + "px)",
        "transform": "rotateY(270deg) translateZ(" + z + "px)"
      });
    }
    if (n - 1 >= 0) {
      _this.find(".cube").children().eq(n - 1).css({
        "display": "block",
        "-webkit-transform": "rotateY(315deg) translateZ(" + z + "px)",
        "-moz-transform": "rotateY(315deg) translateZ(" + z + "px)",
        "transform": "rotateY(315deg) translateZ(" + z + "px)"
      });
    }
    if (n + 1 <= leg - 1) {
      _this.find(".cube").children().eq(n + 1).css({
        "display": "block",
        "-webkit-transform": "rotateY(45deg) translateZ(" + z + "px)",
        "-moz-transform": "rotateY(45deg) translateZ(" + z + "px)",
        "transform": "rotateY(45deg) translateZ(" + z + "px)"
      });
    }
    if (n + 2 <= leg - 1) {
      _this.find(".cube").children().eq(n + 2).css({
        "display": "block",
        "-webkit-transform": "rotateY(90deg) translateZ(" + z + "px)",
        "-moz-transform": "rotateY(90deg) translateZ(" + z + "px)",
        "transform": "rotateY(90deg) translateZ(" + z + "px)"
      });
    }
    _this.find(".cube").css({
      '-webkit-transition': 'none',
      '-moz-transition': 'none',
      'transition': 'none'
    });
    _this.find(".cube").css({
      "-webkit-transform": "rotateY(0)",
      "-moz-transform": "rotateY(0)",
      "transform": "rotateY(0)"
    });
  }
}(jQuery));
//var zleg = (vtl ? wid : heg) / 2 / Math.tan(radian / 2); //视Z轴平移的距离
//var owid = Math.round(pst * wid / (pst + zleg)); //真实宽度