var img1 = new Image(), 
	img2 = new Image(), 
	img3 = new Image(), 
	img4 = new Image();
img1.src= "img/canvas.png";
img2.src= "img/can.png";
img3.src= "img/logo-black.png";
img4.src= "img/dog2/2.png";
var data = {
	pic1: img1,
	pic2: img2,
	pic3: img3,
	pic4: img4,
	txt1: "加班",
	txt2: "那又怎么样...",
	txt3: "我醉了",
	txt4: "BY:海边一只羊",
	tcolor: "rgb(0, 0, 0)",
	rcolor: "rgba(255, 255, 255, 0.5)",
	tion: {x: 0, y: 0, w: 657, h: 881}
};

var drawImg = function(options){
	var img1 = new Image(), 
		img2 = new Image(), 
		img3 = new Image(), 
		img4 = new Image();
	img1.src= "img/canvas.png";
	img2.src= "img/can.png";
	img3.src= "img/logo-black.png";
	img4.src= "img/dog2/2.png";
	var data = {
		pic1: img1,
		pic2: img2,
		pic3: img3,
		pic4: img4,
		txt1: "加班",
		txt2: "那又怎么样...",
		txt3: "我醉了",
		txt4: "BY:海边一只羊",
		tcolor: "rgb(0, 0, 0)",
		rcolor: "rgba(255, 255, 255, 0.5)",
		tion: {x: 0, y: 0, w: 657, h: 881}
	};
	$.extend(data, options);
	//在画布中画画
	var b = setInterval(a, 100);
	function a(){
		if(data.pic1.complete && data.pic2.complete && data.pic3.complete && data.pic4.complete){
			var c = $("#canvas1")[0];
			var cxt=c.getContext("2d");
			cxt.clearRect(0,0,657,881);
			cxt.drawImage(data.pic1, data.tion.x, data.tion.y, data.tion.w, data.tion.h);
			//cxt.fillStyle = data.rcolor;
			//cxt.fillRect(0, 0, 657,881);			
			cxt.drawImage(data.pic3, 20, 33);
			cxt.drawImage(data.pic4, 369, 585);
			cxt.drawImage(data.pic2, 0, 0, 657,881);
			cxt.fillStyle = data.tcolor;
			cxt.font = "81px Arial";
			cxt.fillText(data.txt1, 25, 285);
			cxt.font = "48px Arial";
			cxt.fillText(data.txt2, 30, 366);
			cxt.font = "48px Arial";
			cxt.fillText(data.txt3, 30, 435);
			cxt.font = "33px Arial";
			cxt.fillText(data.txt4, 30, 507);
			clearInterval(b);
		}
	};
};

var loadImageFile = (function () { 
	if (window.FileReader) { 
		var oPreviewImg = null, oFReader = new window.FileReader(), 
		rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
		oFReader.onload = function (oFREvent) {
			
			if(oPreviewImg == null){
				oPreviewImg = new Image();
				oPreviewImg.width = 657;
				oPreviewImg.height = 881;
			}
			oPreviewImg.src= oFREvent.target.result;
			data.pic1 = oPreviewImg;
			drawImg(data);
			//$("body").html(oFREvent.target.result);
//			$.ajax({
//				url: "upload.aspx",
//				type: "post",
//				data: "word=" + encodeURIComponent(oFREvent.target.result),
//				dataType: "json",
//				beforeSend: function(){
//					$("body").append("<div class='loading'><img src='img/loading.gif' /></div>");
//				},
//				complete: function(){
//					$(".loading").remove();
//				},
//				success: function(info){
//					var pic = new Image();
//					pic.src = info.src;
//					pic.onload = function(){
//						data.pic1 = oPreviewImg;
//						drawImg(data);
//					}
//				},
//				error: function(){
//					alert("error");
//				}
//			});
		}; 
		
		return function () { 
			
			var aFiles = document.getElementById("file1").files; 
			if (aFiles.length === 0) { return; } 
			if (!rFilter.test(aFiles[0].type)) { alert("You must select a valid image file!"); return; } 
			oFReader.readAsDataURL(aFiles[0]); 
		}
	} 
	if (navigator.appName === "Microsoft Internet Explorer") { 
		return function () { 
			alert(document.getElementById("file1").value); 
			document.getElementById("fileimg").filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = document.getElementById("file1").value; 
			
		} 
	} 
})();

$(function(){
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
		$("body").append("<div class='prompt-block'><img src='img/prompt.png' /></div>");
		$(".prompt-block").bind("click", function(){
			$(this).remove();
		});
	} else if (u.indexOf('iPhone') > -1) {//苹果手机
	}
	else if (u.indexOf('Windows Phone') > -1) {//winphone手机
	}
	$(window).load(function(){
		drawImg(data);
	});
});
