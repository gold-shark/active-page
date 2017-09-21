(function($, undefined) {
  $.extend($.fn, {
    /* 为CSS3添加私有属性  */
    prefix: function(options) {
      $.each(options, function(i, v) {
        var str = '{\"-webkit-' + i + '\":\"' + v + '\",\"-moz-' + i + '\":\"' + v + '\",\"-ms-' + i + '\":\"' + v + '\",\"-o-' + i + '\":\"' + v + '\"}';
        $.extend(options, $.parseJSON(str));
      });
      $(this).css(options);
    },
    /* 模拟tap事件 */
    tap: function(options) {
      if (typeof options === 'function') {
        var datetime = {
          start: 0,
          end: 0
        };
        var b = false;
        $(this).on('touchstart.tap', function() {
          datetime.start = new Date().getTime();
        });
        $(this).on('touchmove.tap', function() {
          b = true;
        });
        $(this).on('touchend.tap', function(e) {
          datetime.end = new Date().getTime();
          if (!b && datetime.end - datetime.start < 250) {
            options.apply(this, arguments);
          }
          b = false;
        });
      } else {
        throw new Error('arguments is not function');
      }
    },
    /* 模拟滑动事件 */
    swipe: function(options) {
      var b = false;
      var startPot = {
        x: 0,
        y: 0
      };
      var endPot = {
        x: 0,
        y: 0
      };
      var params = {
        start: function() {},
        move: function(distance) {},
        end: function(distance) {}
      };
      $.extend(params, options);
      if (typeof params.start === 'function' && typeof params.move === 'function' && typeof params.end === 'function') {
        $(this).on('touchstart.swipe', function(e) {
          $.extend(startPot, {
            x: e.originalEvent.touches[0].pageX,
            y: e.originalEvent.touches[0].pageY
          });
          params.start.apply(this, arguments);
        });
        $(this).on('touchmove.swipe', function(e) {
          e.originalEvent.preventDefault();
          b = (typeof e.originalEvent.touches[0] === 'object');
          $.extend(endPot, {
            x: e.originalEvent.touches[0].pageX,
            y: e.originalEvent.touches[0].pageY
          });
          params.move.call(this, e, {
            x: endPot.x - startPot.x,
            y: endPot.y - startPot.y
          });
        });
        $(this).on('touchend.swipe', function(e) {
          if (b) {
            b = false;
            params.end.call(this, e, {
              x: endPot.x - startPot.x,
              y: endPot.y - startPot.y
            });
          }
        });
      } else {
        throw new Error('arguments is not function');
      }
    }
  });
}(jQuery));