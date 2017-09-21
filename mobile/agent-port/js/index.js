$(function() {
	var prog = 0,
		imgs = Array(39),
		urls = [
			'img/arrow1.png', 'img/arrow2.png', 'img/arrow3.png', 'img/arrow4.png', 'img/arrow5.png',
			'img/arrow6.png', 'img/arrow7.png', 'img/content1.png', 'img/content2.png', 'img/content3.png',
			'img/content4.png', 'img/content5.png', 'img/content6.png', 'img/content7.png', 'img/title1.png',
			'img/title2.png', 'img/title3.png', 'img/title4.png', 'img/title5.png', 'img/title6.png',
			'img/title7.png', 'img/download.png', 'img/fireworks.png', 'img/icon-mo.png', 'img/icon-py.png', 'img/icon-qq.png',
			'img/icon-wx.png', 'img/light.png', 'img/logo.png', 'img/people.png', 'img/pf.gif',
			'img/sj.png', 'img/uppage.png', 'img/y18.png', 'img/y30.png', 'img/y50.png',
			'img/music1.png', 'img/music2.png', 'img/music3.png'
		];
	$.each(imgs, function(i, e) {
		e = new Image();
		e.src = urls[i];
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

	var n = 0, //当前页码
		m = 0, //之前页码
		b = false, //移动状态
		wid = $(window).width(), //宽
		heg = $(window).height(), //高
		leg = $('.page').length, //长度
		startPosition = {
			x: 0,
			y: 0
		}, //开始位置
		endPosition = {
			x: 0,
			y: 0
		}; //结束位置
	$('.page').css({
		'height': heg
	});
	$('.main').css({
		'height': heg * leg
	});
	/* 触控事件 */
	$('.body').on('touchstart', function(e) {
		$.extend(startPosition, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
	});
	$('.body').on('touchmove', function(e) {
		if (typeof e.originalEvent.touches[0] === 'object') {
			b = true;
		}
		e.originalEvent.preventDefault();
		$.extend(endPosition, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
		$('.main').css($.tool.transform('translateY(' + (-n * heg + endPosition.y - startPosition.y) + 'px)'));
	});
	$('.body').on('touchend', function(e) {
		if (b) {
			b = false;
			var oldVal = {
				'translateY': (-n * heg + endPosition.y - startPosition.y)
			};
			if (endPosition.y - startPosition.y > 50) {
				if (n > 0) {
					n--;
				}
			} else if (endPosition.y - startPosition.y < -50) {
				if (n < leg - 1) {
					n++;
				}
			};
			var newVal = {
				'translateY': -n * heg
			};
			$('.main').animation(oldVal, newVal, 300, function() {
				if (n !== m) {
					m = n;
					anima(m);
				}
			});
			itemInx(n);
		}
	});
	anima(0);

	/* 动画 */
	function anima(n) {
		$('.page').eq(n).find('.title').addClass('tit');
		$('.page').eq(n).find('.content').addClass('con');
		$('.page').eq(n).find('.arrow').addClass('arr');
		$('.page').eq(n).siblings().find('.title').removeClass('tit');
		$('.page').eq(n).siblings().find('.content').removeClass('con');
		$('.page').eq(n).siblings().find('.arrow').removeClass('arr');
		if (n === 2) {
			$('.y18').addClass('fly18');
			$('.y30').addClass('fly30');
			$('.y50').addClass('fly50');
		} else {
			$('.y18').removeClass('fly18');
			$('.y30').removeClass('fly30');
			$('.y50').removeClass('fly50');
		}
	};
	/* 右边小点   */
	function itemInx(n) {
			$('.items').find('span').eq(n).addClass('current');
			$('.items').find('span').eq(n).siblings().removeClass('current');
		}
		/* 背景音乐 */
	var _audio = document.getElementById('music-audio');
	$('.music-but').find('a').on('click', function() {
		if (_audio.paused) {
			$('.music-bg').attr('src', 'img/music2.png').addClass('bg');
			_audio.play();
		} else {
			$('.music-bg').attr('src', 'img/music3.png').removeClass('bg');
			_audio.pause();
		}
	});
});