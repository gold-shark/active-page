(function($, undefined) {
	$.fn.prefix = function(jsonObject) {
		$.each(jsonObject, function(i, v) {
			var str = '{\"-webkit-' + i + '\":\"' + v + '\",\"-moz-' + i + '\":\"' + v + '\",\"-ms-' + i + '\":\"' + v + '\",\"-o-' + i + '\":\"' + v + '\"}';
			$.extend(jsonObject, $.parseJSON(str));
		});
		$(this).css(jsonObject);
	}
}(jQuery));

$(function() {
	var prog = 0,
		imgs = [
			'img/bg-one.png', 'img/bg-two.png', 'img/bg-three.png', 'img/bg-four.png', 'img/bg-five.png', 'img/bg-six.png',
			'img/logo.png', 'img/phone-two.png', 'img/phone-three.png', 'img/phone-four.png', 'img/phone-five.png', 'img/phone-six.png',
			'img/text-one.png', 'img/text-two.png', 'img/text-three.png', 'img/text-four.png', 'img/text-five.png', 'img/text-six.png',
			'img/btn-one.png', 'img/btn-six.png', 'img/dwon.png', 'img/dwonload.png',
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

	$('.link').on('touchstart', function() {
		if (isWeiXin()) {
			$('.share').show();
		}
	});

	$(".share").on('touchstart', function() {
		$(this).hide();
	});

	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		$('.link').attr('href', 'http://www.qfang.com/download/app/qfang/QfangApp_GooglePlayStore2-WangXunMarket-release.apk');
	} else if (isiOS) {
		$('.link').attr('href', 'https://itunes.apple.com/cn/app/q-fang-wang-mai-fang-mai-fang/id858955179?mt=8');
	} else {
		$('.link').attr('href', 'http://m.qfang.com/download/app/index.html');
	}

	var n = 0;
	var m = 0;
	var b = false;
	var wid = $(window).width();
	var heg = $(window).height();
	var leg = $('#items-list').find('.items').length;
	var startPot = {
		x: 0,
		y: 0
	};
	var endPot = {
		x: 0,
		y: 0
	};
	var scope = {
		x: {
			min: 0,
			max: wid
		},
		y: {
			min: 0,
			max: heg
		}
	}
	$('#items-list').find('.items').css('height', heg);

	//动画效果
	function anima(n) {
		$('.items-list .items').eq(n).find('.anima').each(function(i, v) {
			$(this).addClass($(this).data('class'));
		});
	};

	function removeAnima() {
		$('.items-list .items').find('.anima').each(function(i, v) {
			$(this).removeClass($(this).data('class'));
		});
	};
	anima(0);

	$('#article-body').on('touchstart', function(e) {
		$.extend(startPot, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
		$('#items-list').prefix({
			'transition-property': 'all',
			'transition-duration': '0s'
		});
	});

	$('#article-body').on('touchmove', function(e) {
		e.originalEvent.preventDefault();
		if (typeof e.originalEvent.touches[0] === 'object') {
			b = true;
		}
		$.extend(endPot, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
		$('#items-list').prefix({
			'transform': 'translate3d(0,' + (-n * heg + endPot.y - startPot.y) + 'px,0)'
		});
	});
	$('#article-body').on('touchend', function(e) {
		if (b) {
			b = false;
			if (endPot.y - startPot.y > 30) {
				if (n > 0) {
					n--;
				}
			} else if (endPot.y - startPot.y < -30) {
				if (n < leg - 1) {
					n++;
				}
			};
			$('#items-list').prefix({
				'transition-duration': '.5s'
			});
			$('#items-list').prefix({
				'transform': 'translate3d(0,' + (-n * heg) + 'px,0)'
			});
			if (n !== m) {
				removeAnima();
				m = n;
				anima(n);
			}
		}
	});
});