/* body-scroll */
$(function(){
	(function(){
	        var n = 0, heg = $(window).height();
	        var resetpage = function(){
	        	heg = $(window).height();
		        $(".qfang-scroll").css({"height": heg});
		        $(".qfang-scroll-one").css({"height": heg - $(".qfang-headernav").outerHeight(true)});
		        $(".qfang-scroll-two").css({"height": heg});
		        $(".qfang-scroll-three").css({"height": heg});
		        $(".qfang-scroll-four").css({"height": heg});
		        $(".qfang-scroll-body").css({"marginTop": -n * heg});
	        };
	        resetpage();
	        var animates = function(){
	            $(document).off("keydown");
	            $(".qfang-scroll-body").off("mousewheel");
	            $(".qfang-items-right").find("span").off("click");
	            $(".qfang-items-right").find("span").removeClass("current");
	            $(".qfang-items-right").find("span").eq(n).addClass("current");
	            $(".qfang-scroll-body").animate({"marginTop": -n * heg}, 500, "linear", function(){
	                $(document).on("keydown", down);
	                $(".qfang-scroll-body").on("mousewheel", wheel);
	                $(".qfang-items-right").find("span").on("click", sclick);
	            });
	        };
	        $(window).on("resize", function(){
	        	resetpage();
	        });
	        $(".qfang-scroll-body").on("mousewheel", wheel = function(e, d){
	            if(d === 1){
	                if(n > 0){
	                    n--;
	                }
	            } else if(d === -1){
	                if(n < 3){
	                    n++;
	                }
	            }
	            animates();
	        });
	        $(document).on("keydown", down = function(e){
	            if(e && (e.keyCode === 33 || e.keyCode === 38)){
	                if(n > 0){
	                    n--;
	                }
	            } else if(e && (e.keyCode === 34 || e.keyCode === 40)){
	                if(n < 3){
	                    n++;
	                }
	            }
	            animates();
	        });
	        $(".qfang-items-right").find("span").on("click", sclick = function(){
	            n = $(this).index();
	            animates();
	        });
	        
	        $(".two-but1,.two-text").on("click", function(){
	            $(".two-text").hide();
	            $(".two-but1").focus();
	        });
	        $(".two-but1").on("blur", function(){
	            if($(this).val() == ""){
	                $(".two-text").show();
	            }
	        });
	 }());
 });