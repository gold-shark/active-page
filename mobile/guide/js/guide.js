$(function(){
	(function(){
		var prog = 0, imgs = Array(76), audios = Array(3),
		urls = [
			"img/one.png", "img/one1.png", "img/one2.png", "img/one3.png", "img/one4.png",
			"img/two1.png", "img/two2.png", "img/two3.png", "img/two4.png", "img/two5.png",
			"img/three1.png", "img/three2.png", "img/three3.png", "img/three4.png", "img/three5.png",
			"img/four1.png", "img/four2.png", "img/four3.png", "img/four4.png", "img/four5.png", 
			"img/four6.png", "img/four7.png", "img/four8.png", "img/four9.png", "img/four10.png", "img/four11.png",
			"img/five1.png", "img/five2.png", "img/five3.png", "img/five4.png", "img/five5.png", 
			"img/five6.png", "img/five7.png", "img/five8.png", "img/five9.png", "img/five10.png",
			"img/five11.png", "img/five12.png", "img/five13.png", "img/five14.png", "img/five15.png", "img/five16.png",
			"img/six1.png", "img/six2.png", "img/six3.png", "img/six4.png", "img/six5.png", 
			"img/six6.png", "img/six7.png", "img/six8.png", "img/six9.png", "img/six10.png",
			"img/seven1.png", "img/seven2.png", "img/seven3.png", "img/seven4.png", "img/seven5.png",
			"img/eight1.png", "img/eight2.png", "img/eight3.png", "img/eight4.png", "img/eight5.png", "img/eight6.png", 
			"img/eight7.png", "img/eight8.png", "img/eight9.png", "img/eight10.png", "img/eight11.png", "img/eight12.png",
			"img/nine3.png", "img/ten1.png", "img/logo.png", "img/todown.png", "img/music1.png", "img/music2.png", "img/music3.png"
		],
		srcs = ["img/music.mp3", "img/music.wav", "img/music.ogg"];
		$.each(imgs, function(i, e) {    
			e = new Image();
			e.src = urls[i];
			e.onload = function(){
				prog += 1 / imgs.length * 100;
				$(".prog").css({"width": prog + "%"});
				if(Math.round(prog) === 100){
					$(".loading").hide();
				}
			};
		});
//		$.each(audios, function(i, e) {    
//			e = new Audio();
//			e.src = srcs[i];
//			e.onload = function(){
//				prog += 1 / audios.length * 100;
//				$(".prog").css({"width": prog + "%"});
//				if(Math.round(prog) === 100){
//					$(".loading").hide();
//				}
//			};
//		});
	}());	
	(function(){
		var _html = {
			one: "<div class='logo'><img src='img/logo.png'/></div><div class='element'><img src='img/one.png'/></div><div class='element1'><img src='img/one1.png'/></div><div class='element4'><img src='img/one4.png'/><div class='element2'><img src='img/one2.png'/></div><div class='element3'><img src='img/one3.png'/></div></div><div class='todown'><img src='img/todown.png'/></div>",
			two: "<div class='element1'><img src='img/two1.png'/><div class='element2'><img src='img/two2.png'/></div><div class='element3'><img src='img/two3.png'/></div><div class='element4'><img src='img/two4.png'/></div><div class='element5'><img src='img/two5.png'/></div></div><div class='text'><p class='tit'>全国房价仍在上行</p><p class='txt'>在限购期间，增速上涨（房价上涨）的城市占<em>88%</em>，增速负增长（房价下跌）的占<em>12%</em>。限购城市在限购期间房价指数平均增速为<em>0.17%</em>，在平均线以上的城市占七成。</p></div>",
			three: "<div class='element1'><img src='img/three1.png'/><div class='element2'><img src='img/three2.png'/></div><div class='element3'><img src='img/three3.png'/></div><div class='element4'><img src='img/three4.png'/></div><div class='element5'><img src='img/three5.png'/></div></div><div class='text'><p class='tit'>限购抑制了增速</p><p class='txt'>在限购期间，房价指数增速相比限购前上涨（房价增速加快）的城市占<em>21%</em>，指数增速相比限购前下跌（房价增速放缓或下跌）的城市占<em>79%</em>。限购貌似对房价产生了作用，抑制了增速。</p></div>",
			four: "<div class='element1'><img src='img/four1.png'/><div class='element2'><img src='img/four2.png'/></div><div class='element3'><img src='img/four3.png'/></div><div class='element4'><img src='img/four4.png'/></div><div class='element5'><img src='img/four5.png'/></div><div class='element6'><img src='img/four6.png'/></div><div class='element7'><img src='img/four7.png'/></div><div class='element8'><img src='img/four8.png'/></div><div class='element9'><img src='img/four9.png'/></div><div class='element10'><img src='img/four10.png'/></div><div class='element11'><img src='img/four11.png'/></div></div><div class='text'><p class='tit'>限购还不及不限购的效果好</p><p class='txt'>非限购城市在全国城市限购期间，增速下降的城市占<em>92%</em>，大于全国平均水平，更大于限购城市平均水平。貌似限购还不及不限购的效果好。剩下的限购城市退不退出限购？哪个城市先退出限购？<span>Who cares？</span></p></div>",
			five: "<div class='element1'><img src='img/five1.png'/><div class='element2'><img src='img/five2.png'/></div><div class='element3'><img src='img/five3.png'/></div><div class='element4'><img src='img/five4.png'/></div><div class='element5'><img src='img/five5.png'/></div><div class='element6'><img src='img/five6.png'/></div><div class='element7'><img src='img/five7.png'/></div><div class='element8'><img src='img/five8.png'/></div><div class='element9'><img src='img/five9.png'/></div><div class='element10'><img src='img/five10.png'/></div><div class='element11'><img src='img/five11.png'/></div><div class='element12'><img src='img/five12.png'/></div><div class='element13'><img src='img/five13.png'/></div><div class='element14'><img src='img/five14.png'/></div><div class='element15'><img src='img/five15.png'/></div><div class='element16'><img src='img/five16.png'/></div></div><div class='text'><p class='tit'>房价波动幅度缓和</p><p class='txt'>从上图来看，限购城市在限购期间比限购前降低了<em>2.4</em>个百分点，而非限购城市则降低了<em>0.7</em>个百分点。对于限购城市来说，限购政策对于稳定房价的效果是要比非限购城市要明显的。房价稳定有利于抑制投资需求，同时投资客的减少也进一步缓和了房价的波动幅度。</p></div>",
			six: "<div class='element1'><img src='img/six1.png'/><div class='element2'><img src='img/six2.png'/></div><div class='element3'><img src='img/six3.png'/></div><div class='element4'><img src='img/six4.png'/></div><div class='element5'><img src='img/six5.png'/></div><div class='element6'><img src='img/six6.png'/></div><div class='element7'><img src='img/six7.png'/></div><div class='element8'><img src='img/six8.png'/></div><div class='element9'><img src='img/six9.png'/></div><div class='element10'><img src='img/six10.png'/></div></div><div class='text'><p class='tit'>商品住宅销售面积依旧上行</p><p class='txt'>从上图趋势线可以看出，从2008年起，全国商品住宅销售面积依旧是<span>上行</span>的。</p></div>",
			seven: "<div class='element1'><img src='img/seven1.png'/><div class='element2'><img src='img/seven2.png'/></div><div class='element3'><img src='img/seven3.png'/></div><div class='element4'><img src='img/seven4.png'/></div><div class='element5'><img src='img/seven5.png'/></div></div><div class='text'><p class='tit'>新建商品住宅销售趋于稳定</p><p class='txt'>首先看趋势线，增速相对限购前，也就是大致2010年前，有了明显的<span>放缓</span>。另外看增速振幅，已明显<span>收窄</span>，意味着新建商品住宅销售越来越趋于<span>稳定</span>。</p></div>",
			eight: "<div class='element1'><img src='img/eight1.png'/><div class='element2'><img src='img/eight2.png'/></div><div class='element3'><img src='img/eight3.png'/></div><div class='element4'><img src='img/eight4.png'/></div><div class='element5'><img src='img/eight5.png'/></div><div class='element6'><img src='img/eight6.png'/></div><div class='element7'><img src='img/eight7.png'/></div><div class='element8'><img src='img/eight8.png'/></div><div class='element9'><img src='img/eight9.png'/></div><div class='element10'><img src='img/eight10.png'/></div><div class='element11'><img src='img/eight11.png'/></div><div class='element12'><img src='img/eight12.png'/></div></div><div class='text'><p class='tit'>购房者资金层面明显利好</p><p class='txt'>限购控房价的目标似乎一定程度上已经达成，其他影响房价的因素，诸如经济、社会、市场、政策等，也不得不上心，尤其是央行的货币政策走向。央行表态2015年要实施稳健货币政策，注重松紧适度，且从长周期来看，目前的货币政策尚处于第三轮放松期，在整体偏松的货币环境下，购房者资金层面明显利好，<span>切勿错过良机！</span></p></div>",
			nine: "<div class='element1'><p class='tit'>结语</p><p class='txt'>限购政策的初衷是遏制房价过快上涨，但横行楼市四余载的限购政策在经济下行压力和地方财政压力等现实中基本终结。对于广大购房族来说，房价可能是最关键的考核指标。限购至今，控制房价的效果还是值得肯定的。2014年以来的连番放松形成了新的置业窗口期，下一波楼市上行来临之前，<span>做好抄底的准备了么？</span></p></div><div class='element3'><img src='img/nine3.png'/></div><div class='element4'><p>Q房网数据研究中心出品</p></div><div class='logo'><img src='img/logo.png'/></div>",
			ten: "<div class='element1'><img src='img/ten1.png'/></div><div class='element3'><p>扫描二维码关注</p><p>更多精彩内容，尽在Q房数据控</p><p>（微信号：qfangshujukong）</p></div>"
		}
		var n = 0, //当前页码
			m = 0, //之前页码
			b = false, //移动状态
			wid = $(window).width(), //宽
			heg = $(window).height(), //高
			leg = $(".guide").length, //长度
			startPosition = {x: 0, y: 0}, //开始位置
			endPosition = {x: 0, y: 0}, //结束位置
			startTime = 0, //开始时间
			endTime = 0; //结束时间
		/* 设置DIV的高度 */
		$(".guide").css({"height": heg});
		/* 短屏样式  */
		var iphone4 = function(){
			if(wid/heg > 640/900){
				$(".one").find(".element1 img").css({"width": "80%"});
				$(".one").find(".element4").css({"width": "80%", "left": "15%"});
				$(".two").find(".element1").css({"width": "50%", "left": "25%"});
				$(".three").find(".element1").css({"width": "50%", "left": "25%"});
				$(".four").find(".element1").css({"width": "70%", "left": "15%"});
				$(".five").find(".element1").css({"width": "65%", "left": "15%"});
				$(".six").find(".element1").css({"width": "70%", "left": "15%"});
				$(".seven").find(".element1").css({"width": "70%", "left": "15%"});
				$(".eight").find(".element1").css({"width": "65%", "left": "17%"});
				$(".nine").find(".element3").css({"width": "60%", "left": "20%"});
				$(".ten").find(".element1,.element2").css({"width": "25%", "left": "37%"});
			}
		}
		/* 加载内容  */
		var loadHtml = function(n){
			switch(n){
				case 0: $(".guide").empty(); $(".one").append(_html.one); iphone4(); break;
				case 1: $(".guide").empty(); $(".two").append(_html.two); iphone4(); break;
				case 2: $(".guide").empty(); $(".three").append(_html.three); iphone4(); break;
				case 3: $(".guide").empty(); $(".four").append(_html.four); iphone4(); break;
				case 4: $(".guide").empty(); $(".five").append(_html.five); iphone4(); break;
				case 5: $(".guide").empty(); $(".six").append(_html.six); iphone4(); break;
				case 6: $(".guide").empty(); $(".seven").append(_html.seven); iphone4(); break;
				case 7: $(".guide").empty(); $(".eight").append(_html.eight); iphone4(); break;
				case 8: $(".guide").empty(); $(".nine").append(_html.nine); iphone4(); break;
				case 9: $(".guide").empty(); $(".ten").append(_html.ten); iphone4(); break;
				default: $(".guide").empty(); $(".one").append(_html.one); iphone4(); break;
			}
		};
		loadHtml(n);		
		/* 触控事件 */
		$(".body").on("touchstart", function(e){
			$.extend(startPosition, {x: e.touches[0].pageX, y: e.touches[0].pageY});
			startTime = new Date();
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
				endTime = new Date();
				if(endPosition.y - startPosition.y > 30){
					if(n > 0){
						n--;
					}
				} else if(endPosition.y - startPosition.y < -30){
					if(n < leg - 1){
						n++;
					}
				};
				$(".list").animate({"marginTop": -n * heg}, 500, "linear", function(){
					if(n !== m){
						loadHtml(n);
						m = n;
					}
				});
			}
		});
	}());
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
