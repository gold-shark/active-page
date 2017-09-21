$(function() {
  var obj = $('.switch'),
    wid = $(window).width(),
    heg = $(window).height(),
    leg = obj.find('li').length,
    first = obj.find('li').first().clone(),
    last = obj.find('li').last().clone();
  obj.find('ul').first().prepend(last);
  obj.find('ul').last().append(first);
  obj.css({
    'width': wid * (leg + 2)
  });
  obj.prefix({
    'transform': 'translate3d(' + (-wid) + 'px,0,0)'
  });
  obj.find('li').css({
    'width': wid
  });
  obj.find('img').each(function(i, v) {
    var sh = 0;
    if ($(this).next('span').length > 0) {
      sh = $(this).next('span').outerHeight(true);
    }
    v.onload = function() {
      console.log(v.naturalHeight > (heg - sh) && v.naturalWidth / v.naturalHeight < wid / (heg - sh))
      if (v.naturalHeight > (heg - sh) && v.naturalWidth / v.naturalHeight < wid / (heg - sh)) {
        var w = v.naturalWidth * (heg - sh) / v.naturalHeight,
          h = (heg - sh);
        $(v).css({
          'width': w,
          'height': h
        });
      }
    }
  });
  var n = 0;
  var m = 0;
  obj.swipe({
    start: function() {
      $(this).prefix({
        'transition-property': 'all',
        'transition-duration': '0s'
      });
    },
    move: function(e, d) {
      $(this).prefix({
        'transform': 'translate3d(' + ((n + 1) * (-wid) + d.x) + 'px,0,0)'
      });
    },
    end: function(e, d) {
      if (d.x < -30) {
        n++;
      } else if (d.x > 30) {
        n--;
      }
      $(this).prefix({
        'transition-duration': '.3s'
      });
      $(this).prefix({
        'transform': 'translate3d(' + ((n + 1) * (-wid)) + 'px,0,0)'
      });
      if (n < 0) {
        n = leg - 1;
      } else if (n > leg - 1) {
        n = 0;
      }
      m = obj.find('li').eq(n + 1).parent().index()
      $('.pic-tab').find('a').removeClass('current').eq(m).addClass('current');
      clearPlay();
    }
  });
  obj.tap(function(e) {
    if ($('.header-body').css('display') === 'block') {
      $('.header-body,.footer-body').slideUp(300);
    } else {
      $('.header-body,.footer-body').slideDown(300);
    }
  });
  $('.pic-tab').find('a').tap(function(e) {
    e.originalEvent.stopPropagation();
    $(this).addClass('current').siblings().removeClass('current');
    m = $(this).index();
    var num = 0;
    for (var i = 0; i < m; i++) {
      if (i === 0) {
        num += obj.find('ul').eq(i).find('li').length - 1;
      } else {
        num += obj.find('ul').eq(i).find('li').length;
      }
    }
    n = num;
    obj.prefix({
      'transform': 'translate3d(' + ((n + 1) * (-wid)) + 'px,0,0)'
    });
  });
  /* callback */
  function clearPlay() {
    setTimeout(function() {
      obj.prefix({
        'transition-duration': '0s'
      });
      obj.prefix({
        'transform': 'translate3d(' + ((n + 1) * (-wid)) + 'px,0,0)'
      });
    }, 300);
  };
});