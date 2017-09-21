$(function(){
	var popup = {
		help: "<div class='translucent'></div><div class='popup'><div class='help'><h3>360自检帮助</h3><p class='q'>什么是360度自检？</p><p class='a'>经纪人360度自检是针对经纪人的日常业务操作制定行程目标和通过目标完成进行分析，并给出合理性评估，为经纪人的推广提供数据支持，提高经纪人房源成交量。</p><p class='q'>360度自检的得分规则是什么？</p><p class='a'>360度自检是通过综合评估经纪人行程的各项指标完成率，按照一定的计算方式，得出各项得分，最后得到经纪人的评估分。</p><p class='q'>什么是优质房源？</p><p class='a'>优质房源是室内图片大于或等于5张、有小区环境图、有户型图。</p><p class='q'>什么是违规房源？</p><p class='a'>Q房网定义，当经纪人发布的房源信息中包含敏感词（如反共产党、恐怖袭击等）；房源图片有重复水印，房源图片太小，户型图存在拖影、曝光、倾斜等即为违规房源。</p></div><div class='close'><a href='javascript:void(0);'></a></div></div>",
		top20: "<div class='translucent'></div><div class='popup'><div class='top20'><h3>前20名排行榜</h3><div class='table'><table><thead><tr><th>排名</th><th>经纪人</th><th>总得分</th><th>盘源跟进</th><th>网站房源</th><th>刷新使用</th><th>客户新增</th><th>客户跟进</th><th>带看次数</th></tr></thead><tbody id='tbody'></tbody></table></div></div><div class='close'><a href='javascript:void(0);'></a></div></div>",
		charts: "<div class='translucent'></div><div class='popup'><div class='charts'><h3>盘源新增分析：<span>综合过去一个月，目标完成率都在<em>70%</em>以上，不错</span></h3><div class='ctext'><img src='img/pictable.jpg'width='650'height='340'/></div></div><div class='close'><a href='javascript:void(0);'></a></div></div>",
		charts2: "<div class='translucent'></div><div class='popup' style='top:10%;'><div class='charts'><div><h3>网站房源分析：<span>综合过去7天，建议房源质量需加大提升，<a href='javascript:void(0);'>去提升>></a></span></h3><div class='ctext'><img src='img/pictable.jpg'width='650'height='340'/></div></div><div><h3>网站房源点击：<span>综合过去7天，约<em>30%</em>的房源被点击过，建议每天完成刷新和新增房源目标可以获取更多点击</span></h3><div class='ctext'><img src='img/pictable.jpg'width='650'height='340'/></div></div></div><div class='close'><a href='javascript:void(0);'></a></div></div>",
		details1: "<div class='translucent'></div><div class='popup'><div class='details'><h3>您的优质房源有50套，非优质房源70套，详情如下：</h3><h4>共70套非优质房源，点击编辑上传至少5张室内图，一张户型图、一张小区图即可为优质房源</h4><div class='table'><table><thead><tr><th style='width:50px;'>操作</th><th style='width:auto;'>房源基础信息</th><th style='width:100px;'>价格</th><th style='width:120px;'>刷新时间</th><th style='width:120px;'>距离房源过期天数</th><th style='width:80px;'>类型</th></tr></thead><tbody id='tbody'></tbody></table></div></div><div class='close'><a href='javascript:void(0);'></a></div></div>",
		details2: "<div class='translucent'></div><div class='popup'><div class='details'><h3>覆盖小区，详情如下：</h3><h4>您发布的房源共覆盖3个小区，今日推荐热门小区参考发布，去看看！</h4><div class='table'><table><thead><tr><th>覆盖小区</th><th>我上架房源数</th></tr></thead><tbody id='tbody'></tbody></table></div></div><div class='close'><a href='javascript:void(0);'></a></div></div>",
		details3: "<div class='translucent'></div><div class='popup'><div class='details'><h3>违规房源详细记录：</h3><p><label>日期：</label><input type='text'/>至<input type='text'/></p><div class='table'><table><thead><tr><th style='width:auto;'>基础信息</th><th style='width:100px;'>房源类型</th><th style='width:100px;'>房源状态</th><th style='width:120px;'>违规日期</th><th style='width:150px;'>违规原因</th></tr></thead><tbody id='tbody'></tbody></table></div></div><div class='close'><a href='javascript:void(0);'></a></div></div>"
	}
	/* 帮助弹窗 */
	$("#help").on("click", function(){
		$("body").append(popup.help);
	});
	/* top20弹窗 */
	$("#top20").on("click", function(){
		$("body").append(popup.top20);
		for(var i = 0; i < 20; i++){
			$("#tbody").append("<tr><td>1</td><td>张三</td><td>45</td><td>45</td><td>45</td><td>47</td><td>85</td><td>63</td><td>95</td></tr>");
		}
	});
	/* 查看弹窗 */
	$(".view:eq(0)").on("click", function(){
		$("body").append(popup.charts);		
	});
	$(".view:gt(0)").on("click", function(){
		$("body").append(popup.charts2);		
	});
	/* 详情1弹窗 */
	$("#details1").on("click", function(){
		$("body").append(popup.details1);
		for(var i = 0; i < 20; i++){
			$("#tbody").append("<tr><td><a href='javascript:void(0);'>编辑</a></td><td><p class='a'><a href='javascript:void(0);'>创维大厦</a></p><p class='b'>创维大厦创维大厦创维大厦创维大厦创维大厦创维大厦创维大厦创维大厦</p><p class='c'>6/18层，3室2厅，639，精装修</p></td><td>870000元/月</td><td>2015-02-02 08:30</td><td>12</td><td>写字楼</td></tr>");
		}
	});
	/* 详情2弹窗 */
	$("#details2").on("click", function(){
		$("body").append(popup.details2);
		for(var i = 0; i < 20; i++){
			$("#tbody").append("<tr><td>东海小区</td><td>10</td></tr>");
		}
	});
	/* 详情3弹窗 */
	$("#details3").on("click", function(){
		$("body").append(popup.details3);
		for(var i = 0; i < 20; i++){
			$("#tbody").append("<tr><td><p class='b'>创维大厦创维大厦创维</p><p class='c'>6/18层，3室2厅，639，精装修</p></td><td>二手房</td><td>已下架</td><td>2015-02-02</td><td>图片违规</td></tr>");
		}
	});
	/* 关闭弹窗 */
	$("body").on("click", ".close a", function(){
		$(".popup").remove();
		$(".translucent").remove();
	});
	/* 切换tab */
	$(".b-title").on("click", "a", function(e){
		$(".b-title").find("a").removeClass("current");
		$(this).addClass("current");
		if(e.target.innerHTML == "今日行程"){
			$(".b-day").show();
			$(".b-month").hide();
		} else {
			$(".b-day").hide();
			$(".b-month").show();
		}
	});	
	/* 点击发射火箭  */
	$("#ascension").on("click", rockets = function(){
		$(this).off("click");
		$(this).css({"color": "#2e2e2e", "background": "#ccc", "cursor": "default"});
		$(this).after("<div class='rockets'></div>");
		$(".rockets").animate({"top": -400}, 500, "linear", function(){
			$(this).remove();
			//$("#ascension").on("click", rockets);
		});
	});
	
	/*if($(".b-rows").css("display") == "none"){
		$(".b-rows").css("display", "table-row");
	} else{
		$(".b-rows").css("display", "none");
	}*/
});
