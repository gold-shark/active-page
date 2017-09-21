/*大致的用到的*/
$(function(e) {
	$("#control").click(function(e) {
        $("#control, #poster").fadeOut(50, function(){$("#show-player").fadeIn();});
		$("#menu-wrap").find(".cho").eq(0).hide();
		$("#player").find("li").eq(0).show();
    });
	$("#menu-wrap").find(".cho").each(function(i, element) {
        $("#menu-wrap").find(".cho").eq(i).click(function(e) {
			var index = i;
			$(this).hide().parent().parent().siblings().find(".cho").show();
			$(".caption dt").eq(index).show().siblings().hide();
			$("#player").find("li").eq(index).show().siblings("li").hide();
			$("#control, #poster").fadeOut(50, function(){$("#show-player").fadeIn();});
		});
    });
    $(".read").on("click", function(){
    	$(document).scrollTop(0);
        $(".translucent,.popup-body").show();
    });
    $(".popup-body").find(".close a").on("click", function(){
        $(".translucent,.popup-body").hide();
    });
});