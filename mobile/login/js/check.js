$(function(){
	$(".sel").parent("p").on("tap", function(){
		location.href = "select.html";
	});
	
	$(".nan").on("tap", function(){
		$(".nan").css({"background-image": "url(img/nan.png)"});
		$(".nv").css({"background-image": "url(img/nv-g.png)"});
		$("#nan").attr("checked", "checked");
		$("#nv").removeAttr("checked");
	});
	
	$(".nv").on("tap", function(){
		$(".nan").css({"background-image": "url(img/nan-g.png)"});
		$(".nv").css({"background-image": "url(img/nv.png)"});
		$("#nan").removeAttr("checked");
		$("#nv").attr("checked", "checked");
	});
	
	$(".upload").find("img").on("tap", function(){
		$(this).siblings(".hide").click();
	});
});
