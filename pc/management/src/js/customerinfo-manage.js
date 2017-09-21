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
});