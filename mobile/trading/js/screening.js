/* screening */
$(function() {
  /* screening-hide */
  $('.screening').find('a').tap(function(e) {
    e.originalEvent.stopPropagation();
    var index = $(this).index();
    screeningShow(index);
  });
  $('#translucence').tap(function(e) {
    e.originalEvent.stopPropagation();
    screeningHide();
  });
  $('.screening-list .cell').find('p,a,span').tap(function(e) {
    $(this).addClass('current').siblings().removeClass('current');
    if (e.originalEvent.target.tagName.toLocaleLowerCase() === 'a') {
      screeningHide();
    }
  });
  /* .screening-hide .cell */
  $('.screening-list .cell').swipe({
    start: function(e) {
      $(this).find('.cel').prefix({
        'transition': 'none'
      });
    },
    move: function(e, d) {
      var heg = $(this).height() - $(this).find('.cel').height();
      var oldNum = parseFloat($(this).find('.cel').data('number'));
      if (heg < 0) {
        $(this).find('.cel').prefix({
          'transform': 'translate3d(0,' + (oldNum + d.y) + 'px,0)'
        });
      }
    },
    end: function(e, d) {
      var heg = $(this).height() - $(this).find('.cel').height();
      var oldNum = parseFloat($(this).find('.cel').data('number'));
      var newNum;
      if (heg < 0) {
        oldNum += d.y;
        newNum = oldNum;
        if (oldNum > 0) {
          newNum = 0;
        } else if (oldNum < heg) {
          newNum = heg;
        }
        $(this).find('.cel').prefix({
          'transition': 'all .3s'
        });
        if (newNum !== oldNum) {
          $(this).find('.cel').prefix({
            'transform': 'translate3d(0,' + newNum + 'px,0)'
          });
          oldNum = newNum;
        }
        $(this).find('.cel').data('number', oldNum);
      }
    }
  });
  /* show screening */
  function screeningShow(index) {
    $(document).on('touchstart.screen', function(e) {
      e.originalEvent.preventDefault();
    });
    $('#screening-popup .screening').find('a').removeClass('current').eq(index).addClass('current');
    $('#translucence').show();
    $('#screening-popup').slideDown(200);
    $('#screening-popup').find('.screening-list').hide().eq(index).show();
  }
  /* hide screening */
  function screeningHide() {
    $(document).off('touchstart.screen');
    $('#translucence').hide();
    $('#screening-popup').hide();
    $('#screening-popup').find('.screening-list').hide();
  }
});

/* scroll.screening */
$(function() {
  var a;
  $(document).on('scroll.screening', function() {
    if (a) {
      clearTimeout(a);
    }
    a = setTimeout(function() {
      screening();
    }, 30);
  });

  function screening() {
    var heg = $('.header-body').outerHeight(true);
    var mag = $('.screening-body').outerHeight(true);
    if ($(document).scrollTop() >= heg) {
      $('.screening-body').css({
        'position': 'fixed'
      });
      $('.article-body').css({
        'margin-top': mag
      });
    } else {
      $('.screening-body').css({
        'position': 'relative'
      });
      $('.article-body').css({
        'margin-top': 0
      });
    }
  }
});