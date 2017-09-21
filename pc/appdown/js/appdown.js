$(function(){
	(function(){
		var n = 0, leg = $(".down-item").length, heg = $(window).height();
		//重置页面样式
		var resetpage = function(){
			heg = $(window).height();
			$(".down-view").css({"height": heg});
			$(".down-item").css({"height": heg});
			$(".down-items").css({"margin-top": -n * heg});
		};
		resetpage();
		//每一页的动画
		var anin = function(){
				$(".item1 .down-phone").addClass("phones");
				$(".item1 .down-title").addClass("titles");
				$(".item1 .down-info").addClass("infos");
			},
			anin1 = function(){
				$(".item2 .down-phone").addClass("phones");
				$(".item2 .down-title").addClass("titles");
				$(".item2 .down-info").addClass("infos");
				$(".line1").addClass("aline1");
				$(".line2").addClass("aline2");
				$(".line3").addClass("aline3");
				$(".line4").addClass("aline4");
				$(".line5").addClass("aline5");
				$(".line6").addClass("aline6");
				$(".line7").addClass("aline7");
				$(".line8").addClass("aline8");
				$(".line9").addClass("aline9");
			},
			anin2 = function(){
				$(".item3 .down-phone").addClass("phones");
				$(".item3 .down-title").addClass("titles");
				$(".item3 .down-info").addClass("infos");
			},
			anin3 = function(){
				$(".item4 .down-phone").addClass("phones");
				$(".item4 .down-title").addClass("titles");
				$(".item4 .down-info").addClass("infos");
				$(".heart1").addClass("anin1");
				$(".heart2").addClass("anin2");
				$(".heart3").addClass("anin3");
				$(".praise1").addClass("anin4");
				$(".praise2").addClass("anin5"); 
				$(".praise3").addClass("anin6");
				setTimeout(function(){
					$(".heart1").removeClass("anin1");
					$(".heart2").removeClass("anin2");
					$(".heart3").removeClass("anin3");
					$(".praise1").removeClass("anin4");
					$(".praise2").removeClass("anin5"); 
					$(".praise3").removeClass("anin6");
				}, 6000)
			},
			anin4 = function(){
				$(".item5 .down-phone").addClass("phones");
				$(".item5 .down-title").addClass("titles");
				$(".item5 .down-info").addClass("infos");
			},
			anin5 = function(){
				$(".item6 .down-phone").addClass("phones");
				$(".item6 .down-title").addClass("titles");
				$(".item6 .down-info").addClass("infos");
			};
		anin();
		//事件执行函数
		var animates = function(){
			$(document).off("keydown");
	        $(document).off("mousewheel");
	        $(".down-point").find("span").off("click");
	        $(".down-point").find("span").removeClass("current").eq(n).addClass("current");
			$(".down-items").animate({"marginTop": -n * heg}, 300, "linear", function(){
				$(document).on("mousewheel", wheel);
				$(document).on("keydown", down);
				$(".down-point").find("span").on("click", sclick);
			});
			switch(n){
					case 0: anin(); break;
					case 1: anin1(); break;
					case 2: anin2(); break;
					case 3: anin3(); break;
					case 4: anin4(); break;
					case 5: anin5(); break;
					default: anin(); break;
				}
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
