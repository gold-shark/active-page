$(function(){
	/* 中奖名单 */
	var heg = $(".roster-text").find("li").height();
	var a = function(){
		$(".roster-text").find("ul").animate({"marginTop": -heg}, "fast", "linear", function(){
			$(this).find("li:first").insertAfter($(".roster-text").find("li:last"));
			$(this).css({"margin-top": 0});	
		});
	};
	var b = setInterval(a, 3000);
	/* 邀请好友 */
	$(".footerfloat-text").find(".friends").click(function(){
		$(".qfang-translucent").show();
		$(".winn5").show();
		$(".link").select();
	});
	/* 确定复制  */
	$(".ok").click(function(){
		$(".link").val();
		$(".winn5").hide();
		$(".qfang-translucent").hide();
	});
	/* 关闭中奖通知 */
	$(".know").click(function(){
		$(this).parents(".qfang-winning").hide();
		$(".qfang-translucent").hide();	
	});
	$(".qfang-translucent").click(function(){
		$(this).hide();	
	});
});