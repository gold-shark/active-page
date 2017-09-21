$(function() {
	/* 日期选择  */
	if ($('#stratTime').length && $('#endTime').length) {
		var stratTime = {
			elem: '#stratTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(), //设定最小日期为当前日期
			max: '2099-06-16', //最大日期
			choose: function(datas) {
				endTime.min = datas; //开始日选好后，重置结束日的最小日期
				endTime.start = datas //将结束日的初始值设定为开始日
			}
		};
		var endTime = {
			elem: '#endTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(),
			max: '2099-06-16',
			choose: function(datas) {
				stratTime.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(stratTime);
		laydate(endTime);
	}
	if ($('#createStratTime').length && $('#createEndTime').length) {
		var createStratTime = {
			elem: '#createStratTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(), //设定最小日期为当前日期
			max: '2099-06-16', //最大日期
			choose: function(datas) {
				createEndTime.min = datas; //开始日选好后，重置结束日的最小日期
				createEndTime.start = datas //将结束日的初始值设定为开始日
			}
		};
		var createEndTime = {
			elem: '#createEndTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(),
			max: '2099-06-16',
			choose: function(datas) {
				createStratTime.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(createStratTime);
		laydate(createEndTime);
	}
	if ($('#beginStratTime').length && $('#beginEndTime').length) {
		var beginStratTime = {
			elem: '#beginStratTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(), //设定最小日期为当前日期
			max: '2099-06-16', //最大日期
			choose: function(datas) {
				beginEndTime.min = datas; //开始日选好后，重置结束日的最小日期
				beginEndTime.start = datas //将结束日的初始值设定为开始日
			}
		};
		var beginEndTime = {
			elem: '#beginEndTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(),
			max: '2099-06-16',
			choose: function(datas) {
				beginStratTime.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(beginStratTime);
		laydate(beginEndTime);
	}
	if ($('#cutoffStratTime').length && $('#cutoffEndTime').length) {
		var cutoffStratTime = {
			elem: '#cutoffStratTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(), //设定最小日期为当前日期
			max: '2099-06-16', //最大日期
			choose: function(datas) {
				cutoffEndTime.min = datas; //开始日选好后，重置结束日的最小日期
				cutoffEndTime.start = datas //将结束日的初始值设定为开始日
			}
		};
		var cutoffEndTime = {
			elem: '#cutoffEndTime',
			format: 'YYYY-MM-DD',
			min: laydate.now(),
			max: '2099-06-16',
			choose: function(datas) {
				cutoffStratTime.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(cutoffStratTime);
		laydate(cutoffEndTime);
	}

	/* 添加广告弹窗   */
	$('#add-advertising').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '添加广告',
			shadeClose: true,
			shade: 0.5,
			area: ['700px', '650px'],
			content: 'advertising-manage/insert-advertising.html',
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	/* 全选 -国家  */
	$('#all-countries').on('click', function() {
		if ($(this).prop('checked')) {
			$('#countries-items').find('.checkbox').prop('checked', true);
		} else {
			$('#countries-items').find('.checkbox').prop('checked', false);
		}
	});

	var index = window.top.layer.getFrameIndex(window.name); //获取窗口索引
	var regChar = /^[\u4e00-\u9fa5\sa-zA-Z0-9]+$/;	//中文、英文、数字、空格
	var regNumber = /^(\d{1,2}|100|0)$/;								//0-100
	/* 确定-添加广告 */
	$('#ok-ad').on('click', function() {
		var adTitle = $.trim($('#ad-title').val());
		var adLayout = $.trim($('#ad-layout').val());
		var adSite = $.trim($('#ad-site').val());
		var countries = '';
		var adLink = $.trim($('#ad-link').val());
		var picture = '';
		var adWeight = $.trim($('#ad-weight').val());
		var stratTime = $.trim($('#stratTime').val());
		var endTime = $.trim($('#endTime').val());
		$('#countries-items .checkbox').each(function() {
			if ($(this).prop('checked')) {
				countries += $(this).val() + ',';
			}
		});
		countries = countries.substr(0, countries.length - 1);
		if ($('#article-picture').attr('src') !== '../img/2.jpg') {
			picture = $('#article-picture').attr('src');
		}
		if (adTitle === '') {
			errorTips('标题不能为空！', '#ad-title');
		} else if (adTitle.length > 30) {
			errorTips('字数超出了30个字符！!', '#ad-title');
		} else if (adLayout === '') {
			errorTips('请选择版面!', '#ad-layout');
		} else if (adSite === '') {
			errorTips('请选择位置!', '#ad-site');
		} else if (countries === '') {
			errorTips('只少选择一个国家!', '#all-countries');
		} else if (adLink === '') {
			errorTips('链接不能为空!', '#ad-link');
		} else if (picture === '') {
			errorTips('请上传图片!', '#ad-picture');
		} else if (adWeight !== '' && !regNumber.test(adWeight)) {
			errorTips('请输入0-100内的正整数!', '#ad-weight');
		} else if (stratTime === '') {
			errorTips('请选择开始时间!', '#stratTime');
		} else if (endTime === '') {
			errorTips('请选择结束时间!', '#endTime');
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