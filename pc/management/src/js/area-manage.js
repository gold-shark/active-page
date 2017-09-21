$(function() {
	/* 添加国家-弹窗   */
	$('#add-countries').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '添加国家',
			shadeClose: true,
			shade: 0.5,
			area: ['430px', '250px'],
			content: 'area-manage/insert-countries.html',
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	/* 添加城市-弹窗   */
	$('.add-city').on('click', function() {
		var cid = $(this).data('id');
		window.top.layer.open({
			type: 2,
			title: '添加城市',
			shadeClose: true,
			shade: 0.5,
			area: ['430px', '250px'],
			content: 'area-manage/insert-city.html?cid=' + cid,
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	/* 添加区域-弹窗   */
	$('.add-area').on('click', function() {
		var cid = $(this).data('id');
		window.top.layer.open({
			type: 2,
			title: '添加区域',
			shadeClose: true,
			shade: 0.5,
			area: ['430px', '300px'],
			content: 'area-manage/insert-area.html?cid=' + cid,
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	var index = window.top.layer.getFrameIndex(window.name); //获取窗口索引
	var regChar = /^[\u4e00-\u9fa5\sa-zA-Z0-9]+$/; //中文、英文、数字、空格
	var regRate = /^[1-9]\d*(\.\d{1,5})?$/; //汇率
	/* 添加-城市项、区域项  */
	$('.add-items').on('click', function() {
		$(this).parent().after('<p class="mt10"><label class="mr10 label small-five">&nbsp;</label><input class="text default" type="text" style="margin-left:4px;" /><a class="sub-items" href="javascrip:void(0);"></a></p>');
		window.top.layer.iframeAuto(index);
	});

	/* 删除-城市、区域新增项 */
	$('#items-body').on('click', '.sub-items', function() {
		$(this).parent().remove();
		window.top.layer.iframeAuto(index);
	});

	/* 确定-添加国家 */
	$('#ok-countries').on('click', function() {
		var countries = $.trim($('#countries').val());
		var yuan = $.trim($('#yuan').val());
		var currency = $.trim($('#currency').val());
		if (countries == '') {
			errorTips('请输入国家名称！', '#countries');
		} else if (!regChar.test(countries)) {
			errorTips('只允许输入中英文、数字及空格！', '#countries');
		} else if (countries.length > 20) {
			errorTips('字数超出了20个字符！', '#countries');
		} else if (yuan !== '' && !regRate.test(yuan)) {
			errorTips('格式错误！如：1.521或5', '#yuan');
		} else if (currency !== '' && !regRate.test(currency)) {
			errorTips('格式错误！如：1.521或5', '#currency');
		} else {
			// 数据处理代码
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 确定-添加城市 */
	$('#ok-city').on('click', function() {
		var countries = $.trim($('#countries').val());
		var city = $.trim($('#city').val());
		if (city == '') {
			errorTips('城市名称不能为空！', '#city');
		} else if (!regChar.test(city)) {
			errorTips('只允许输入中英文、数字及空格！', '#city');
		} else if (city.length > 20) {
			errorTips('字数超出了20个字符！', '#city');
		} else {
			// 数据处理代码{}
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 确定-添加区域 */
	$('#ok-area').on('click', function() {
		var countries = $.trim($('#countries').val());
		var city = $.trim($('#city').val());
		var area = $.trim($('#area').val());
		if (area == '') {
			errorTips('区域名称不能为空！', '#area');
		} else if (!regChar.test(area)) {
			errorTips('只允许输入中英文、数字及空格！', '#area');
		} else if (area.length > 20) {
			errorTips('字数超出了20个字符！', '#area');
		} else {
			// 数据处理代码{}
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 取消-事件  */
	$('#cancel').on('click', function() {
		window.top.layer.close(index);
	});

	/* 刷新-当前iframe页面  */
	function refreshIframe() {
		var currentIframe = window.top.$('.iframe-items.show > iframe');
		currentIframe[0].contentWindow.location.reload(true);
	}

	/* tips提示 - 错误  */
	function errorTips(content, strId) {
		layer.tips(content, strId, {
			tips: [1, '#e00']
		});
		$(strId).focus();
	}
});