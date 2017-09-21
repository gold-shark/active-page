$(function() {
  /*第一屏*/
  var viewEl = $('.view');
  var theOne = viewEl.eq(0);
  animateFun({
    el: theOne.children('.con-t'),
    fun: {
      'top': 55,
      'opacity': 1
    },
    time: 500
  });
  animateFun({
    el: theOne.children('.con-c'),
    delayt: 500,
    fun: {
      'opacity': 1
    },
    time: 500
  });
  animateFun({
    el: theOne.children('.con-b'),
    delayt: 1000,
    fun: {
      'top': 330,
      'opacity': 1
    },
    time: 500
  });
  $(window).on('scroll', function() {
    var top_h = $(window).scrollTop();
    var win_h = $(window).height();
    var cur = 0;
    $('.view').each(function(index, item) {
      var _this = $(item);
      var this_offt = $(item).offset().top;
      var sc_h = 500;
      if (index > 0 && top_h > this_offt - win_h + 100) {
        cur = index;
      }
    });

    var viewCur = viewEl.eq(cur);
    /*第二屏*/
    if (cur == 1) {
      animateFun({
        el: viewCur.children('.con-t'),
        fun: {
          'top': 1,
          'opacity': 1
        },
        time: 500
      });
      animateFun({
        el: viewCur.children('.con-c'),
        delayt: 500,
        fun: {
          'opacity': 1
        },
        time: 500
      });
      animateFun({
        el: viewCur.children('.con-b'),
        delayt: 1000,
        fun: {
          'opacity': 1,
          'top': 200
        },
        time: 500
      });
      return;
    }
    animateFun({
      el: viewCur.children('.con-t'),
      fun: {
        'opacity': 1,
        'top': 60
      },
      time: 500
    });
    /*第三屏*/
    if (cur == 2) {
      animateFun({
        el: viewCur.children('.con-lr'),
        delayt: 500,
        fun: {
          'opacity': 1,
          'marginLeft': -289
        },
        time: 500
      });
      return;
    }
    if (cur == 3) {
      animateFun({
        el: viewCur.children('.con-b'),
        delayt: 500,
        fun: {
          'opacity': 1,
          'top': 240
        },
        time: 500
      });
    }
    if (cur == 4) {
      animateFun({
        el: viewCur.children('.con-b'),
        delayt: 500,
        fun: {
          'opacity': 1,
          'top': 280
        },
        time: 500
      });
    }
  });

})

function animateFun(options) {
  if (options.delayt) {
    options.el.delay(options.delayt).animate(options.fun, options.time);
  } else {
    options.el.animate(options.fun, options.time);
  }
}