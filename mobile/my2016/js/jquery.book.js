(function($, undefined) {
  var data = {
    time: 500,
    callblck: null
  };
  var n = 0;
  var leg = 10;
  var b = false;
  var startPot = {
    x: 0,
    y: 0,
    t: 0
  };
  var endPot = {
    x: 0,
    y: 0,
    t: 0
  };
  $.extend($.fn, {
    sliding: function(options) {
      var opts = $.extend({}, data, options);
      this.each(function(i) {
        var $this = $(this);
        $this.on('touchstart', stratFun = function(e) {
          $.extend(startPot, {
            x: e.originalEvent.touches[0].pageX,
            y: e.originalEvent.touches[0].pageY,
            t: new Date().getTime()
          });
        });
        $this.on('touchmove', moveFun = function(e) {
          e.originalEvent.preventDefault();
          $.extend(endPot, {
            x: e.originalEvent.touches[0].pageX,
            y: e.originalEvent.touches[0].pageY,
            t: new Date().getTime()
          });
          b = true;
        });
        $this.on('touchend', endFun = function(e) {
          if(b && endPot.t - startPot.t < 500) {
            b = false;
            if(endPot.x - startPot.x > 30) {
              if(n === leg) {
                n--;
                $this.find('.book-body').fadeIn(300);
                $this.find('.back-book').fadeOut(300);
              } else if(n > 0) {
                n--;
                $this.find('.pages-body:eq(' + n + ')').prefix({
                  'transform': 'rotateY(0)'
                });
                $this.find('.pages-body:eq(' + n + ')').css('z-index', 50 - n);
              }
            } else if(endPot.x - startPot.x < -30) {
              if(n === leg - 1) {
                $this.find('.book-body').fadeOut(300);
                $this.find('.back-book').fadeIn(300);
                n++;
              } else if(n < leg - 1) {
                $this.off('touchmove');
                $this.find('.pages-body:eq(' + n + ')').prefix({
                  'transform': 'rotateY(-180deg)'
                });
                setTimeout(function() {
                  $this.find('.pages-body:eq(' + (n - 1) + ')').css('z-index', 40);
                  $this.on('touchmove', moveFun);
                }, opts.time / 2);
                n++;
              }
            }
            opts.callback && $.isFunction(opts.callback) && opts.callback(n);
          }
        });
        $this.find('.open-page').on('tap', function() {
          $this.off('touchmove');
          $this.find('.pages-body:eq(' + n + ')').prefix({
            'transform': 'rotateY(-180deg)'
          });
          setTimeout(function() {
            $this.find('.pages-body:eq(' + (n - 1) + ')').css('z-index', 40);
            $this.on('touchmove', moveFun);
          }, opts.time / 2);
          n++;
          opts.callback && $.isFunction(opts.callback) && opts.callback(n);
        });
      });
    }
  });
}(jQuery));