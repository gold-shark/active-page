$(function(){
	var sta = false;
	var fnTimeCountDown = function(d, o){
		var f = {
			haomiao: function(n){
				if(n < 10)return "00" + n.toString();
				if(n < 100)return "0" + n.toString();
				return n.toString();
			},
			zero: function(n){
				var n = parseInt(n, 10);//解析字符串,返回整数
				if(n > 0){
					if(n <= 9){
						n = "0" + n;	
					}
					return String(n);
				}else{
					return "00";	
				}
			},
			dv: function(){				
				//d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
				var now = new Date();
				//现在将来秒差值
				//alert(future.getTimezoneOffset());
				var dur = (d - now.getTime()) / 1000 , mss = d - now.getTime() ,pms = {
					hm:"000",
					sec: "00",
					mini: "00",
					hour: "00",
					day: "00",
					month: "00",
					year: "0"
				};
				if(mss > 0){
					pms.hm = f.haomiao(mss % 1000);
					pms.sec = f.zero(dur % 60);
					pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
					pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
					pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
					//月份，以实际平均每月秒数计算
					pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
					//年份，按按回归年365天5时48分46秒算
					pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
					sta = true;
				}else{
					pms.year=pms.month=pms.day=pms.hour=pms.mini=pms.sec="00";
					pms.hm = "000";
					if(sta){
						sta = false;
						window.location.reload();
					}
				}
				return pms;
			},
			ui: function(){
				if(o.hm){
					o.hm.html(f.dv().hm);
				}
				if(o.sec){
					o.sec.html(f.dv().sec);
				}
				if(o.mini){
					o.mini.html(f.dv().mini);
				}
				if(o.hour){
					o.hour.html(f.dv().hour);
				}
				if(o.day){
					o.day.html(f.dv().day);
				}
				if(o.month){
					o.month.html(f.dv().month);
				}
				if(o.year){
					o.year.html(f.dv().year);
				}			
				setTimeout(f.ui, 1);			
			}
		};	
		f.ui();
	};	
	var zxx = {
		obj: function(){
			return {
				hm: $("#hm"),
				sec: $("#sec"),
				mini: $("#mini"),
				hour: $("#hour"),
				day: $("#day"),
				month: $("#month"),
				year: $("#year")
			}
		}
	};
	fnTimeCountDown('1228983800000', zxx.obj());

	var n = 0, //当前页码
		m = 0, //之前页码
		b = false, //移动状态
		wid = $(window).width(), //宽
		heg = $(window).height(), //高
		leg = $(".list0 .items").length, //长度
		startPosition = {x: 0, y: 0}, //开始位置
		endPosition = {x: 0, y: 0}, //结束位置
		startTime = 0, //开始时间
		endTime = 0; //结束时间
	$(".items").css({"height": heg});
	var currenttime = new Date();
	if(currenttime.getTime() > 1228983800000){
		$(".list").css({"display": "none"});
		$(".list1").css({"display": "block"});
		n = 0;
		m = 0;
		leg = $(".list1 .items").length;
		$(".list").css({"marginTop": -n * heg});
	}
	//提交
	$(".but a").on("tap", function(){
		var regPhone = /^1[3,4,5,7,8,9]\d{9}$/;
		if($("#uphone").val() == ""){
			alert("请输入手机号！");
		} else if(!regPhone.test($("#uphone").val())) {
			alert("手机格式有误！");
		} else {
			$.ajax({
				url:"http://www.fangrukou.com/qfang/index.asp",
				type:"get",
				dataType: "jsonp",
				data: "uname=wechat&ubody=" + $("#uphone").val(),
				jsonp: 'callback',
				jsonpCallback: "info",
				success: function(data){
					alert(data)
				},
				error: function(){alert("error")},
				async:true
			});
			$(".list").css({"display": "none"});
			$(".list2").css({"display": "block"});
			n = 0;
			m = 0;
			leg = $(".list2 .items").length;
			$(".list").css({"marginTop": -n * heg});
		}
	});	
	$(".n21 .p1").find("em").html(1429113575544 - new Date());
	//指纹
	var settime;
	$(".zw").on("touchstart", function(e){
		startTime = new Date();		
		settime = setTimeout(function(){
			$(".zw").css({"background-image": "url(../img/zw_hover.png)"});
			$(".list").css({"display": "none"});
			$(".list3").css({"display": "block"});
			n = 0;
			m = 0;
			leg = $(".list3 .items").length;
			$(".list").css({"marginTop": -n * heg});
			$(".n22").find(".tit").addClass("tit1"); 
			setTimeout(function(){$(".n22").find(".tit").removeClass("tit1")}, 1000);
		}, 1000);
	});
	$(".zw").on("touchmove", function(e){
		e.preventDefault();
		e.stopPropagation();
	});
	$(".zw").on("touchend", function(e){
		endTime = new Date();
		if(endTime - startTime < 1000){
			clearTimeout(settime);
		}
	});
	//分享
	$(".n22 .p3").on("tap", function(){
		$("body").append("<div class='popup'><img src='img/share.png' /></div>");
		$(".popup").on("tap",function(){
			$(this).remove();
		});
	});	
	/* 触控事件 */
	var anin = function(n){		
		switch(n){
			case 2: $(".n5").find(".tit").addClass("tit1"); setTimeout(function(){$(".n5").find(".tit").removeClass("tit1")}, 1000); break;
			case 3: $(".n6").find(".tit").addClass("tit1"); setTimeout(function(){$(".n6").find(".tit").removeClass("tit1")}, 1000); break;
			case 4: $(".n7").find(".tit").addClass("tit1"); setTimeout(function(){$(".n7").find(".tit").removeClass("tit1")}, 1000); break; 
			case 5: $(".n8").find(".tit").addClass("tit1"); setTimeout(function(){$(".n8").find(".tit").removeClass("tit1")}, 1000); break; 
			case 7: $(".n10").find(".tit").addClass("tit2"); setTimeout(function(){$(".n10").find(".tit").removeClass("tit2")}, 1000); break;
			case 8: $(".n11").find(".tit").addClass("tit2"); setTimeout(function(){$(".n11").find(".tit").removeClass("tit2")}, 1000); break; 
			case 9: $(".n12").find(".tit").addClass("tit2"); setTimeout(function(){$(".n12").find(".tit").removeClass("tit2")}, 1000); break; 
			case 10: $(".n13").find(".tit").addClass("tit2"); setTimeout(function(){$(".n13").find(".tit").removeClass("tit2")}, 1000); break; 
			case 11: $(".n14").find(".tit").addClass("tit2"); setTimeout(function(){$(".n14").find(".tit").removeClass("tit2")}, 1000); break; 
			case 12: $(".n15").find(".tit").addClass("tit2"); setTimeout(function(){$(".n15").find(".tit").removeClass("tit2")}, 1000); break; 
			case 13: $(".n16").find(".tit").addClass("tit2"); setTimeout(function(){$(".n16").find(".tit").removeClass("tit2")}, 1000); break; 
			case 14: $(".n17").find(".tit").addClass("tit2"); setTimeout(function(){$(".n17").find(".tit").removeClass("tit2")}, 1000); break;
			case 18: $(".n21").find(".zw").addClass("tit3"); setTimeout(function(){$(".n21").find(".zw").removeClass("tit3")}, 1000); break;
		};
	};
	if(leg > 1){
		$(".body").on("touchstart", function(e){
			$.extend(startPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
			
		});
		$(".body").on("touchmove", function(e){
			if(typeof e.touches[0] === "object"){
				b = true;
			}
			e.preventDefault();
			$.extend(endPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
			$(".list").css({"marginTop": -n * heg + endPosition.y - startPosition.y});
		});
		$(".body").on("touchend", function(e){
			if(b){
				b = false;
				
				if(endPosition.y - startPosition.y > 30){
					if(n > 0){
						n--;
					}
				} else if(endPosition.y - startPosition.y < -30){
					if(n < leg - 1){
						n++;
					}
				};
				$(".list").animate({"marginTop": -n * heg}, 500, "out-in");
				if(n !== m){
					anin(n);
					m = n;
				}				
			}
		});
	}
	(function(){	
		var _audio = document.getElementById("music-audio")
		$(".music-but").find("a").on("tap", function(){
			if(_audio.paused){
				$(".music-bg").attr("src", "img/music2.png").addClass("bg");
				_audio.play();
			} else{
				$(".music-bg").attr("src", "img/music3.png").removeClass("bg");
				_audio.pause();
			}
		});
	}());
});