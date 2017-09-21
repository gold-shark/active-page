$(function () {
  var _deferred = $.Deferred();
  var prog = 0;
  var imgs = [
    'img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png',
    'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png', 'img/10.png',
    'img/11.png', 'img/12.png', 'img/13.png', 'img/14.png', 'img/15.png',
    'img/16.png', 'img/17.png', 'img/18.png', 'img/19.png', 'img/20.png',
    'img/21.png', 'img/22.png', 'img/23.png', 'img/24.png'
  ];
  $.each(imgs, function (i, e) {
    e = new Image();
    e.src = imgs[i];
    e.onload = function () {
      prog += 1 / imgs.length * 100;
      $('.prog').css({
        'width': prog + '%'
      });
      if (Math.round(prog) === 100) {
        $('.loading').hide();
        _deferred.resolve();
      }
    };
  });
  var n = 0; // 当前页码
  var m = 0; // 之前页码
  var flag = false; // 移动状态
  var wid = $(window).width(); // 宽
  var heg = $(window).height(); // 高
  var $container = $('.entrust-body');
  var $slide = $('.slide');
  var $pages = $('.pages');
  var leg = $pages.length; // 长度
  var startPoint = { // 开始位置
    x: 0,
    y: 0
  };
  var endPoint = { // 结束位置
    x: 0,
    y: 0
  };
  $pages.css({
    'width': wid,
    'height': heg
  });

  //动画效果
  function anima(n) {
    $pages.eq(n).find('.anima').each(function (i, v) {
      $(this).addClass($(this).data('class'));
    });
  };

  function removeAnima() {
    $pages.find('.anima').each(function (i, v) {
      $(this).removeClass($(this).data('class'));
    });
  };
  $.when(_deferred).then(function () {
    anima(0);
  });

  /* 触控事件 */
  $container.on('touchstart', function (e) {
    startPoint.x = e.originalEvent.touches[0].pageX;
    startPoint.y = e.originalEvent.touches[0].pageY
  });
  $container.on('touchmove', function (e) {
    e.preventDefault();
    endPoint.x = e.originalEvent.touches[0].pageX;
    endPoint.y = e.originalEvent.touches[0].pageY;
    flag = true;
    var _newValue = -n * heg + endPoint.y - startPoint.y;
    if (_newValue > 0) {
      _newValue = _newValue / 3;
    } else if (_newValue < -(leg - 1) * heg) {
      _newValue = (_newValue + (leg - 1) * heg) / 3 - (leg - 1) * heg;
    }
    $slide.translate({
      direction: 'vertical',
      value: _newValue
    });
  });
  $container.on('touchend', function (e) {
    if (flag) {
      flag = false;
      if (endPoint.y - startPoint.y > 30) {
        if (n > 0) {
          n--;
        }
      } else if (endPoint.y - startPoint.y < -30) {
        if (n < leg - 1) {
          n++;
        }
      }
      $slide.translate({
        direction: 'vertical',
        duration: 0.3,
        value: -n * heg
      });
      if (n !== m) {
        removeAnima();
        m = n;
        anima(n);
      }
    }
  });

  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  };

  $('.submit').on('tap', function () {
    if (isWeiXin()) {
      $('.share').css('display', 'block');
    }
  });

  $('.share').on('tap', function () {
    $(this).css('display', 'none');
  });
});
