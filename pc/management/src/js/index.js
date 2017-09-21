$(function() {

	/* 初始化 */
	$('.article-body').css({
		'height': $(window).height() - $('.header-body').outerHeight()
	});
	$(".iframe").css({
		'height': $('.iframe').parents('.iframe-body').height()
	});

	/* 菜单事件 */
	$('.menu-catalog').on('click', function() {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next().removeClass('show');
		} else {
			$(this).addClass('open');
			$(this).next().addClass('show');
		}
	});

	/* 关闭左边菜单 */
	$('.close-menu').on('click', function() {
		if ($(this).hasClass('close-open')) {
			$(this).removeClass('close-open');
			$('.menu-body').show();
		} else {
			$(this).addClass('close-open');
			$('.menu-body').hide();
		}
	});

	/* 打开工作选项页面 */
	$(".menu-option").on('click', function() {
		var obj = this;
		var flg = $(this).data('open');
		var idx = 0;
		$('.menu-option').each(function(i) {
			if (obj === this) {
				idx = i;
				return false;
			}
		});
		if (flg) {
			selectPages(idx);
		} else {
			var str1 = $(obj).html();
			var str2 = $(obj).data('href');
			openPages(str1, str2, idx, function() {
				/* 同步菜单上的状态 */
				$(obj).data('open', true);
			});
		}
	});

	/* 选择当前页面  */
	$('.option-card').on('click', '.option-items', function() {
		selectPages($(this).data('number'));
	});

	/* 关闭页面事件  */
	$('.option-card').on('click', '.close-option', function() {
		closePages($(this).parent().data('number'));
	});

	/* 打开新的页面 */
	function openPages(str1, str2, idx, callback) {
		var html1 = '<a class="option-items current" id="option-items' + idx + '" data-number="' + idx + '" href="javascript:void(0);">' + str1 + '<i class="close-option"></i></a>';
		var html2 = '<div class="iframe-items show" id="iframe-items' + idx + '" data-number="' + idx + '"><iframe class="iframe flex" name="iframe" frameborder="no" src="' + str2 + '"></iframe></div>';
		$('.option-items').removeClass('current');
		$('.option-card').append(html1);
		$('.iframe-items').removeClass('show');
		$('.iframe-body').append(html2);
		if (typeof callback === 'function') {
			callback();
		}
		/* 重置 iframe 高度 */
		$(".iframe").css({
			'height': $('.iframe').parents('.iframe-body').height()
		});
	};

	/* 关闭页面  */
	function closePages(idx) {
		$('#option-items' + idx).remove();
		$('#iframe-items' + idx).remove();
		$('.menu-option').each(function(i) {
			if (idx === i) {
				$(this).data('open', false);
				return false;
			}
		});
	};

	/* 选择当前页面  */
	function selectPages(idx) {
		$('#option-items' + idx).addClass('current').siblings('.option-items').removeClass('current');
		$('#iframe-items' + idx).addClass('show').siblings('.iframe-items').removeClass('show');
	};

});
