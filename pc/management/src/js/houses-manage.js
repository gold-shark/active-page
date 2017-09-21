$(function() {
	/* 富文本编辑器  */
	if ($('#edit-content').length) {
		KindEditor.ready(function(K) {
			editor = K.create('#edit-content');
		});
	}

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
	if ($('#listed-time').length) {
		laydate({
			elem: '#listed-time',
		});
	}

	/* 添加楼盘弹窗   */
	$('#add-houses').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '添加楼盘',
			shadeClose: true,
			shade: 0.5,
			area: ['730px', '90%'],
			content: 'housing-manage/insert-houses.html'
		});
	});

	/* 发布新房弹窗   */
	$('#add-newhouses').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '发布新房',
			shadeClose: true,
			shade: 0.5,
			area: ['900px', '90%'],
			content: 'housing-manage/insert-newhouses.html'
		});
	});

	/* 发布二手房弹窗   */
	$('#add-salehouses').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '发布二手房',
			shadeClose: true,
			shade: 0.5,
			area: ['900px', '90%'],
			content: 'housing-manage/insert-salehouses.html'
		});
	});

	var index = window.top.layer.getFrameIndex(window.name); //获取窗口索引
	var regChar = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]|[\,\.\?\:\;\"\'\!\+\-\*\/\=\%\~\`\@\#\$\^\&\_\|\\\<\>\(\)\[\]\{\}\，\、\。\？\：\；\“\‘\’\”\！\￥\…\《\》\（\）\【\】\｛\｝\s])+$/;	//中文、英文、数字、标点符号、空格
	var regYear = /^\d{4}$/;												//年份
	var regArea = /^\d+(\-\d+)?$/;									//区间
	var regRate = /^(100|\d{1,2}(\.\d{1,2})?)$/;		//百分比
	var regPrice = /^\d+(\.\d{1,2})?$/;							//价格
	var regNumber = /^\d+$/;												//正整数
	/* 确定-添加房源 */
	$('#ok-houses').on('click', function() {
		var housesName = $.trim($('#houses-name').val());
		var address = $.trim($('#countries').val()) + $.trim($('#city').val()) + $.trim($('#area').val());
		var isarea = $.trim($('#area').val());
		var houseType = $.trim($('#house-type').val());
		var listedTime = $.trim($('#listed-time').val());
		var builtYear = $.trim($('#built-year').val());
		var usingArea = $.trim($('#using-area').val());
		var floorNumber = $.trim($('#floor-number').val());
		var permisInstruc = $.trim($('#permis-instruc').val());
		var decorateCondition = $.trim($('#decorate-condition').val());
		var parkingInfo = $.trim($('#parking-info').val());
		var developers = $.trim($('#developers').val());
		var returnRate = $.trim($('#return-rate').val());
		if (housesName === '') {
			errorTips('请输入楼盘名称！', '#houses-name');
		} else if (!regChar.test(housesName)) {
			errorTips('只允许输入中英文、数字及标点符号和空格！', '#houses-name');
		} else if (housesName.length > 40) {
			errorTips('字数超出了40个字符！', '#houses-name');
		} else if (isarea === '') {
			errorTips('请选择完整地址!', '#countries');
		} else if (houseType === '') {
			errorTips('请选择类型!', '#house-type');
		} else if (builtYear !== '' && !regYear.test(builtYear)) {
			errorTips('格式错误!如：1998', '#built-year');
		} else if (usingArea !== '' && !regArea.test(usingArea)) {
			errorTips('格式错误!如：195或100-200', '#using-area');
		} else if (floorNumber !== '' && !regArea.test(floorNumber)) {
			errorTips('格式错误!如：19或11-32', '#floor-number');
		} else if (permisInstruc !== '' && !regChar.test(permisInstruc)) {
			errorTips('只允许输入中英文、数字及空格！', '#permis-instruc');
		} else if (parkingInfo !== '' && !regArea.test(parkingInfo)) {
			errorTips('格式错误!如：3或4-9', '#parking-info');
		} else if (developers !== '' && !regChar.test(developers)) {
			errorTips('只允许输入中英文、数字及空格！', '#developers');
		} else if (returnRate !== '' && !regRate.test(returnRate)) {
			errorTips('格式错误!如：3或2.1或1.56！', '#return-rate');
		} else {
			// 数据处理代码{}
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 确定-发布新房 */
	$('#ok-newhouses').on('click', function() {
		var housesName = $.trim($('#houses-name').val());
		var address = $.trim($('#countries').val()) + $.trim($('#city').val()) + $.trim($('#area').val());
		var isarea = $.trim($('#area').val());
		var newhousesTitle = $.trim($('#newhouses-title').val());
		var housesGenre = $.trim($('#house-number').val()) + $.trim($('#house-desc').val());
		var houseDesc = $.trim($('#house-desc').val());
		var houseNumber = $.trim($('#house-number').val());
		var housePrice = $.trim($('#house-price').val());
		var houseType = $.trim($('#house-type').val());
		var listedTime = $.trim($('#listed-time').val());
		var builtYear = $.trim($('#built-year').val());
		var usingArea = $.trim($('#using-area').val());
		var floorNumber = $.trim($('#floor-number').val());
		var permisInstruc = $.trim($('#permis-instruc').val());
		var decorateCondition = $.trim($('#decorate-condition').val());
		var parkingInfo = $.trim($('#parking-info').val());
		var developers = $.trim($('#developers').val());
		var returnRate = $.trim($('#return-rate').val());
		var propertyType = $.trim($('#property-type').val());
		var unitsNumber = $.trim($('#units-number').val());
		var housesTag = '';
		var housesReasons = $.trim($('#houses-reasons').val());
		var editContent = $.trim(editor.html());
		$('#houses-tag .checkbox').each(function() {
			if ($(this).prop('checked')) {
				housesTag += $(this).val() + ',';
			}
		});
		housesTag = housesTag.substr(0, housesTag.length - 1);
		if (housesName === '') {
			errorTips('房源名称不能为空！', '#houses-name');
		} else if (isarea === '') {
			errorTips('请选择完整地址!', '#countries');
		} else if (newhousesTitle === '') {
			errorTips('新房标题不能为空!', '#newhouses-title');
		} else if (newhousesTitle.length > 60) {
			errorTips('字数超出了60个字符!', '#newhouses-title');
		} else if (houseNumber === '') {
			errorTips('请输入房型!', '#house-number');
		} else if (!regNumber.test(houseNumber)) {
			errorTips('只允许是正整数！', '#house-number');
		} else if (houseDesc.length > 30) {
			errorTips('字数超出了30个字符！', '#house-desc');
		} else if (housePrice === '') {
			errorTips('价格不能为空!', '#house-price');
		} else if (!regPrice.test(housePrice)) {
			errorTips('格式错误!如：213或28.1或14.56！', '#house-price');
		} else if (houseType === '') {
			errorTips('请选择类型!', '#house-type');
		} else if (builtYear !== '' && !regYear.test(builtYear)) {
			errorTips('格式错误!如：1998', '#built-year');
		} else if (usingArea !== '' && !regArea.test(usingArea)) {
			errorTips('格式错误!如：195或100-200', '#using-area');
		} else if (floorNumber !== '' && !regArea.test(floorNumber)) {
			errorTips('格式错误!如：19或11-32', '#floor-number');
		} else if (permisInstruc !== '' && !regChar.test(permisInstruc)) {
			errorTips('只允许输入中英文、数字及空格！', '#permis-instruc');
		} else if (parkingInfo !== '' && !regArea.test(parkingInfo)) {
			errorTips('格式错误!如：3或4-9', '#parking-info');
		} else if (developers !== '' && !regChar.test(developers)) {
			errorTips('只允许输入中英文、数字及空格！', '#developers');
		} else if (returnRate !== '' && !regRate.test(returnRate)) {
			errorTips('格式错误!如：3或2.1或1.56！', '#return-rate');
		} else if (unitsNumber !== '' && !regNumber.test(unitsNumber)) {
			errorTips('只允许是正整数！', '#units-number');
		} else if (housesReasons !== '' && !regChar.test(housesReasons)) {
			errorTips('只允许输入中英文、数字及空格！', '#houses-reasons');
		} else if (housesReasons.length > 40) {
			errorTips('字数超出了40个字符！', '#houses-reasons');
		} else {
			// 数据处理代码{}
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 确定-发布二手房 */
	$('#ok-salehouses').on('click', function() {
		var housesName = $.trim($('#houses-name').val());
		var address = $.trim($('#countries').val()) + $.trim($('#city').val()) + $.trim($('#area').val());
		var isarea = $.trim($('#area').val());
		var salehousesTitle = $.trim($('#salehouses-title').val());
		var housesType = $.trim($('#house-number').val()) + $.trim($('#house-desc').val());
		var houseDesc = $.trim($('#house-desc').val());
		var houseNumber = $.trim($('#house-number').val());
		var housePrice = $.trim($('#house-price').val());
		var houseType = $.trim($('#house-type').val());
		var listedTime = $.trim($('#listed-time').val());
		var builtYear = $.trim($('#built-year').val());
		var usingArea = $.trim($('#using-area').val());
		var floorNumber = $.trim($('#floor-number').val());
		var permisInstruc = $.trim($('#permis-instruc').val());
		var decorateCondition = $.trim($('#decorate-condition').val());
		var parkingInfo = $.trim($('#parking-info').val());
		var developers = $.trim($('#developers').val());
		var returnRate = $.trim($('#return-rate').val());
		var propertyType = $.trim($('#property-type').val());
		var housesTag = '';
		var editContent = $.trim(editor.html());
		$('#houses-tag .checkbox').each(function() {
			if ($(this).prop('checked')) {
				housesTag += $(this).val() + ',';
			}
		});
		housesTag = housesTag.substr(0, housesTag.length - 1);
		if (housesName == '') {
			errorTips('房源名称不能为空！', '#houses-name');
		} else if (isarea == '') {
			errorTips('请选择完整地址!', '#countries');
		} else if (salehousesTitle == '') {
			errorTips('二手房标题不能为空!', '#salehouses-title');
		} else if (salehousesTitle.length > 60) {
			errorTips('字数超出了60个字符!', '#newhouses-title');
		} else if (houseNumber === '') {
			errorTips('请输入房型!', '#house-number');
		} else if (!regNumber.test(houseNumber)) {
			errorTips('只允许是正整数！', '#house-number');
		} else if (houseDesc.length > 30) {
			errorTips('字数超出了30个字符！', '#house-desc');
		} else if (housePrice === '') {
			errorTips('价格不能为空!', '#house-price');
		} else if (!regPrice.test(housePrice)) {
			errorTips('格式错误!如：213或28.1或14.56！', '#house-price');
		} else if (houseType === '') {
			errorTips('请选择类型!', '#house-type');
		} else if (builtYear !== '' && !regYear.test(builtYear)) {
			errorTips('格式错误!如：1998', '#built-year');
		} else if (usingArea !== '' && !regArea.test(usingArea)) {
			errorTips('格式错误!如：195或100-200', '#using-area');
		} else if (floorNumber !== '' && !regArea.test(floorNumber)) {
			errorTips('格式错误!如：19或11-32', '#floor-number');
		} else if (permisInstruc !== '' && !regChar.test(permisInstruc)) {
			errorTips('只允许输入中英文、数字及空格！', '#permis-instruc');
		} else if (parkingInfo !== '' && !regArea.test(parkingInfo)) {
			errorTips('格式错误!如：3或4-9', '#parking-info');
		} else if (developers !== '' && !regChar.test(developers)) {
			errorTips('只允许输入中英文、数字及空格！', '#developers');
		} else if (returnRate !== '' && !regRate.test(returnRate)) {
			errorTips('格式错误!如：3或2.1或1.56！', '#return-rate');
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