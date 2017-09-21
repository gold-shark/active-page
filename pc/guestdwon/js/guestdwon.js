$(function(){
	(function(){
		var n = 0, leg = $(".down-item").length, heg = $(window).height();
		//重置页面样式
		var resetpage = function(){
			heg = $(window).height();			
			$(".down-view").css({"height": heg});
			$(".down-item").css({"height": heg});
			$(".down-items").css({"margin-top": -n * heg});
			if(n === 0){
				$(".down-item").eq(n).css({"height": heg < 710 ? heg : 710});
			}
			if(heg < 780){
				$(".down-items").find(".text").css({"margin-top": "10px"});
			}
		};
		resetpage();
		//每一页的动画
		var anin = function(){
			$(".down-item").eq(n).find(".phone").addClass("phones");
			$(".down-item").eq(n).find(".text").addClass("titles");
		};
		anin();
		//事件执行函数
		var animates = function(){
			$(document).off("keydown");
	        $(document).off("mousewheel");
	        $(".down-point").find("span").off("click");
	        $(".down-point").find("span").removeClass("current").eq(n).addClass("current");
			$(".down-items").animate({"marginTop": n == 0 ? 0 : -(n - 1) * heg - (heg < 710 ? heg : 710)}, 300, "linear", function(){
				$(document).on("mousewheel", wheel);
				$(document).on("keydown", down);
				$(".down-point").find("span").on("click", sclick);
			});
			anin();
		};
		//改变窗体事件
		$(window).on("resize", function(){
        	resetpage();
        });
        //鼠标轮事件
        $(document).on("mousewheel", wheel = function(e, d){
            if(d === 1){
                if(n > 0){
                    n--;
                }
            } else if(d === -1){
                if(n < leg - 1){
                    n++;
                }
            }
            animates();
        });
        //键盘事件
        $(document).on("keydown", down = function(e){
            if(e && (e.keyCode === 33 || e.keyCode === 38)){
                if(n > 0){
                    n--;
                }
            } else if(e && (e.keyCode === 34 || e.keyCode === 40)){
                if(n < leg - 1){
                    n++;
                }
            }
            animates();
        });
        //点击事件
        $(".down-point").find("span").on("click", sclick = function(){
            n = $(this).index();
            animates();
        });
	}());
});