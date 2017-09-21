$(function(){
	$("input").on("focus", function(){
		$("header").css({"position": "relative"});
		$("article").css({"margin-top": "0"});
	});
	$("input").on("blur", function(){
		$("header").css({"position": "fixed"});
		$("article").css({"margin-top": "4.6rem"});
	});
});