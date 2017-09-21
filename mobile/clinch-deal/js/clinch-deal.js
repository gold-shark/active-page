$(function() {
  var prog = 0,
    imgs = [
      'img/1-1.jpg', 'img/1-2.png', 'img/1-3.png', 'img/1-4.png', 'img/2-1.jpg',
      'img/2-2.png', 'img/2-3.png', 'img/2-4.png', 'img/3-1.jpg', 'img/3-2.png',
      'img/3-3.png', 'img/3-4.png', 'img/3-5.png', 'img/3-6.png', 'img/4-1.jpg',
      'img/4-2.png', 'img/4-3.png', 'img/4-4.png', 'img/4-5.png', 'img/4-6.png',
      'img/4-7.png', 'img/4-8.png', 'img/4-9.png', 'img/5-1.jpg', 'img/5-2.png',
      'img/5-3.png', 'img/5-4.png', 'img/5-5.png', 'img/5-6.png', 'img/6-1.jpg',
      'img/6-2.png', 'img/6-3.png', 'img/6-4.png', 'img/music1.png', 'img/music2.png', 'img/music3.png', 'img/share.jpg'
    ];
  $.each(imgs, function(i, e) {
    e = new Image();
    e.src = imgs[i];
    e.onload = function() {
      prog += 1 / imgs.length * 100;
      $('.prog').css({
        'width': prog + '%'
      });
      if (Math.round(prog) === 100) {
        $('.loading').hide();
      }
    };
  });
  var n = 0; //当前页码
  var m = 0; //之前页码
  var b = false; //移动状态
  var wid = $(window).width(); //宽
  var heg = $(window).height(); //高
  var leg = $('.module-body').length; //长度
  var startPosition = {
    x: 0,
    y: 0
  }; //开始位置
  var endPosition = {
    x: 0,
    y: 0
  }; //结束位置
  $('.module-body').css({
    'height': heg
  });

  //动画效果
  function anima(n) {
    $('.module-body').eq(n).find('.anima').each(function(i, v) {
      $(this).addClass($(this).data('class'));
    });
  };

  function removeAnima() {
    $('.module-body').find('.anima').each(function(i, v) {
      $(this).removeClass($(this).data('class'));
    });
  };
  anima(0);

  /* 触控事件 */
  $('.article-body').on('touchstart', function(e) {
    $('.list').prefix({
      'transition-property': 'all',
      'transition-duration': '0s'
    });
    $.extend(startPosition, {
      x: e.originalEvent.touches[0].pageX,
      y: e.originalEvent.touches[0].pageY
    });
  });
  $('.article-body').on('touchmove', function(e) {
    e.originalEvent.preventDefault();
    if (typeof e.originalEvent.touches[0] === 'object') {
      b = true;
    }
    $.extend(endPosition, {
      x: e.originalEvent.touches[0].pageX,
      y: e.originalEvent.touches[0].pageY
    });
    $('.list').prefix({
      'transform': 'translate3d(0,' + (-n * heg + endPosition.y - startPosition.y) + 'px,0)'
    });
  });
  $('.article-body').on('touchend', function(e) {
    if (b) {
      b = false;
      if (endPosition.y - startPosition.y > 30) {
        if (n > 0) {
          n--;
        }
      } else if (endPosition.y - startPosition.y < -30) {
        if (n < leg - 1) {
          n++;
        }
      };
      $('.list').prefix({
        'transition-duration': '.3s'
      });
      $('.list').prefix({
        'transform': 'translate3d(0,' + (-n * heg) + 'px,0)'
      });
      if (n !== m) {
        removeAnima();
        m = n;
        anima(n);
      }
    }
  });
  $(window).on('load', function() {
    $('.music').append('<audio id="music-audio" class="music-audio" autoplay="autoplay" preload="auto" loop="loop"><source src="img/music.mp3" type="audio/mp3" /></audio>');
    /* music */
    var _audio = document.getElementById("music-audio")
    $(".music-but").find("a").on("tap", function() {
      if (_audio.paused) {
        $(".music-bg").attr("src", "img/music2.png").addClass("bg");
        _audio.play();
      } else {
        $(".music-bg").attr("src", "img/music3.png").removeClass("bg");
        _audio.pause();
      }
    });
  });
});