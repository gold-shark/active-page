//打开弹出层
function popshow(){
	$(".back-cover").show();
	$(".pop-up").slideDown("slow");
}
//关闭弹出层
function pophide(){
	$(".pop-up").slideUp("slow", function(){
		$(".back-cover").hide();
	});
}
$(function(){
	$(".pop-close,.back-cover").click(pophide);
	$(document).scroll(function(e){
		if(gotime){
			clearTimeout(gotime)
		};
		var gotime = setTimeout(function(){
			if($(document).scrollTop() >= 500){
				$(".go-top").fadeIn("fast");
			} else {
				$(".go-top").fadeOut("fast");
			}
		},10);
	});
	$(".go-top").find("a").click(function(){
		var b = setInterval(a, 10);
		function a(){
			$(document).scrollTop(function(i,v){
				if(v == 0){
					clearInterval(b);
				} else {
					v -= 300;
				}
				return v;
			});
		}
	});
	
	$(document).scroll(function(){
		if(a){
			clearTimeout(a);
		}
		var a = setTimeout(picture_loading, 10);
	});
	$(window).load(function(){
		picture_loading();
	});
	var picture_loading = function() {
		$(".pic").each(function(i, e){
			if($(e).offset().top < $(document).scrollTop() + $(window).height()){								
				var pic = new Image();
				pic.src = $(e).data("src");
				pic.onload = function(){
					$(e).attr("src", pic.src).removeClass("pic");
				}
			}
		});
	}	
});