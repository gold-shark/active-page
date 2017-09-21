$(function() {
	$(".chouBtn,.seePrize").on("click", function() {
		/*var v = $("#phone").val(),
			reg = /^1\d{10}$/;
		if (v == "") {
			alert("请输入手机号！");
			return;
		} else if (!reg.test(v)) {
			alert("手机格式有误！");
			return;
		}*/
		$(".qz").remove();
		var m = 0;
		var num = 6;
		/*$.ajax({
			url:"http://zn.qfang.com/jfinal_weixin/joup/getticket",
			type:"get",
			dataType: "jsonp",
			data: "phone=" + $("#phone").val(),
			jsonp: 'callback',
			jsonpCallback: "callback",
			success: function(data){
				num = data[0].res;
			},
			error: function(){alert("error")},
			async:true
		});*/
		var a = setInterval(function() {
			if (m >= $(".swimmingPool").find("a").length) {				
				if(num < 6){
					animas(num);
					$(".translucent").eq(num).show();
				} else {
					$(".qz").remove();
					$(".swimmingPool").append('<div class="qz"><img src="images/qboy.png"/></div>');
					$(".swimmingPool").find("a>img").each(function(i){
						$(this).attr("src", "images/" + (i + 1) + ".png");
						$(".translucent").eq(0).show();
					});
				}
				clearInterval(a);
			} else {
				animas(m);
			}
			m++;
		}, 500);
	});
	$(".iamsure,.cancel").on("click", function() {
		$(".translucent").hide();
	});
	function animas(n) {
		$(".qz").remove();
		$(".swimmingPool").find("a").eq(n).append('<div class="qz"><img src="images/qboy.png"/></div>');
		$(".swimmingPool").find("a>img").each(function(i){
			$(this).attr("src", "images/" + (i + 1) + ".png");
		});
		var _src = $(".swimmingPool").find("a").eq(n).find("img").attr("src").toString().substr(0,8)+ "-.png";
		$(".swimmingPool").find("a").eq(n).children("img").attr("src", _src);
	}
});