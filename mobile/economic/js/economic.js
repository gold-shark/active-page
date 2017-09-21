$(function() {
	var prog = 0,
		imgs = [
			'img/bg1.png', 'img/bg1.png', 'img/btn.png', 'img/code.png', 'img/font.png',
			'img/font1.png', 'img/font2.png', 'img/font3.png', 'img/font4.png', 'img/font5.png',
			'img/head1.png', 'img/head2.png', 'img/head3.png', 'img/head4.png', 'img/head5.png',
			'img/head6.png', 'img/head7.png', 'img/head8.png', 'img/head9.png', 'img/head10.png',
			'img/head11.png', 'img/head12.png', 'img/paging.png', 'img/people.png', 'img/title1.png',
			'img/title2.png', 'img/title3.png'
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
	var n = 0, //当前页码
		m = 0, //之前页码
		b = false, //移动状态
		wid = $(window).width(), //宽
		heg = $(window).height(), //高
		leg = $('.module-body').length, //长度
		startPosition = {
			x: 0,
			y: 0
		}, //开始位置
		endPosition = {
			x: 0,
			y: 0
		}; //结束位置
	$('.module-body').css({
		'height': heg
	});
	
	//alert(wid + "," + heg);

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
	$('.economic-body').on('touchstart', function(e) {
		$('.list').transition('none');
		$.extend(startPosition, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
	});
	$('.economic-body').on('touchmove', function(e) {
		e.originalEvent.preventDefault();
		if (typeof e.originalEvent.touches[0] === 'object') {
			b = true;
		}
		$.extend(endPosition, {
			x: e.originalEvent.touches[0].pageX,
			y: e.originalEvent.touches[0].pageY
		});
		$('.list').transform('translateY(' + (-n * heg + endPosition.y - startPosition.y) + 'px)');
	});
	$('.economic-body').on('touchend', function(e) {
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
			$('.list').transition('transform .5s');
			$('.list').transform('translateY(' + (-n * heg) + 'px)');
			if (n !== m) {
				removeAnima();
				m = n;
				anima(n);
			}
		}
	});
});