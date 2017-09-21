$(function(){
	var popup = {
		//没有抽奖机会了
		winn1: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning1.png' /><a href='javascript:void(0);' class='kenken'>赶紧看看如何获得抽奖机会>></a></div>";
		},
		//没有抽中
		winn2: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning2.png' /><p class='kmove'>还能抽<em>2</em>次，获得更多<a href='javascript:void(0);'>邀请好友</a></p></div>";
		},
		//ipad
		winn3: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning3.png' /><a href='javascript:void(0);' class='know'><img src='img/know.jpg' /></a></div>";
		},
		//广告位
		winn4: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning4.png' /><a href='javascript:void(0);' class='know'><img src='img/know.jpg' /></a></div>";
		},
		//30元话费
		winn5: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning5.png' /><label class='money'>30</label><a href='javascript:void(0);' class='know'><img src='img/know.jpg' /></a></div>";
		},
		//50元话费
		winn6: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning5.png' /><label class='money'>50</label><a href='javascript:void(0);' class='know'><img src='img/know.jpg' /></a></div>";
		},
		//100元话费
		winn7: function(){			
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/winning5.png' /><label class='money'>100</label><a href='javascript:void(0);' class='know'><img src='img/know.jpg' /></a></div>";
		},
		//邀请好友
		invita: function(){
			return "<div class='qfang-translucent'></div><div class='qfang-winning'><img src='img/invita.png' /><p class='link'>http://shenzhen.qfang.com/</p><a href='javascript:void(0);' class='ok'>长按复制   </a><span class='close'></span></div>";
		},
		//注册登录
		login: function(){
			return "<div class='qfang-translucent'></div><div class='qfang-login'><div class='login-title'><p>注册登录</p></div><div class='login-text'><p>立即注册完成身份认证后，获得抽奖机会</p><p><a href='javascript:void(0);' class='register'>立即注册</a></p><p>已有账号？<a href='javascript:void(0);' class='login'>立即登录</a></p></div><div class='login-close'></div></div>";
		},
		//提示信息
		info: function(txt){
			return "<div class='qfang-translucent'></div><div class='qfang-info'><div class='info-title'><p>提示信息</p></div><div class='info-text'><p>" + txt + "</p></div><div class='info-close'></div></div>";
		}
	};
	
	var start = document.getElementById("start");		
	var turn = function(e){					
		e.preventDefault();
		e.stopPropagation();
		start.removeEventListener("touchstart", turn, false);
		var num = Math.ceil(Math.random() * 10);
		$(".qfang-pointer").animate({"rotateZ": 0 +"deg"}, 3000);
		$("#turntable").animate({"rotateZ": (360 + num * 40 + 20) + "deg"}, 3000, "ease-in-out", function(){
			var _html = "";
			switch(num){
				case 1: _html = popup.winn4(); break;
				case 2: _html = popup.winn3(); break;
				case 3: _html = popup.winn4(); break;
				case 4: _html = popup.winn5(); break;
				case 5: _html = popup.winn3(); break;
				case 6: _html = popup.winn4(); break;
				case 7: _html = popup.winn7(); break;
				case 8: _html = popup.winn3(); break;
				case 9: _html = popup.winn6(); break;
				default: _html = popup.winn1(); break;
			};
			$("body").append(_html);
			$(".know").tap(function(){
				$(".qfang-translucent").remove();
				$(".qfang-winning").remove();
				$("#turntable").attr("style", "");
				$(".qfang-pointer").attr("style", "");
				start.addEventListener("touchstart", turn, false);
			});			
		});
	}
	start.addEventListener("touchstart", turn, false);
	//邀请好友
	$(".invitation").tap(function(){
		var _html = popup.invita();
		$("body").append(_html);
		console.log($(".link").val());
		$(".link").select();
		$(".ok").on("tap",function(){
			$(".qfang-translucent").remove();
			$(".qfang-winning").remove();
		});
	});
	//注册登录
	$(".myprize").tap(function(){
		var _html = popup.login();
		$("body").append(_html);
		$(".login-close").on("tap",function(){
			$(".qfang-translucent").remove();
			$(".qfang-login").remove();
		});
	});
	
	var _html = popup.info("系统错误，请刷新页面！");
	$("body").append(_html);
	$(".info-close").on("tap",function(){
		$(".qfang-translucent").remove();
		$(".qfang-info").remove();
	});
});