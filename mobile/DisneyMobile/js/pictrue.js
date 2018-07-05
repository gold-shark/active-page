var picscale = {m: 1, n: 1};
var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息 
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var innerhtml = function(options){
    var html = "<div class='translucent'></div><div class='popup-body'><div class='content'><canvas id='canvas1'></canvas></div><div class='box'><div class='box-top'></div><div class='box-middle'><div class='box-left'></div><div class='box-center'></div><div class='box-right'></div></div><div class='box-bottom'></div></div><div class='footer'><p class='cancel'><a href='javascript:void(0);'><img src='img/3btn4.png'/></a></p><p class='ok'><a href='javascript:void(0);'><img src='img/3btn3.png'/></a></p></div></div>";
    $("body").append(html);    
    $(".popup-body .box-middle").css({"height": options.boxheg});  
    $(".popup-body .box-center").css({"width": options.boxwid});
    $(".popup-body .box-top").css({"height": ($(window).height() - options.boxheg) / 2});
    $(".popup-body .box-bottom").css({"height": ($(window).height() - options.boxheg) / 2});                  
    var startp1 = {x: 0, y:0}, endp1 = {x:0, y:0}, old1 = {x: 0, y: 0},
        startp2 = {x: 0, y:0}, endp2 = {x:0, y:0}, startleg = 0, endleg = 0, oldscale = 1;
    $(".popup-body .box")[0].addEventListener("touchstart", function(e){
        $.extend(startp1, {x: e.touches[0].pageX, y: e.touches[0].pageY});
        if(e.touches.length > 1){
            $.extend(startp2, {x: e.touches[1].pageX, y: e.touches[1].pageY});
            startleg = Math.pow((Math.pow((startp2.x - startp1.x), 2) + Math.pow((startp2.y - startp1.y), 2)), 0.5);
        }
    }, false);
    $(".popup-body .box")[0].addEventListener("touchmove", function(e){
        e.preventDefault();
        $.extend(endp1, {x: e.touches[0].pageX, y: e.touches[0].pageY});
        if(e.touches.length == 1){
            $("#canvas1").css({
                "-webkit-transform": "translate(" + (old1.x + endp1.x - startp1.x) + "px, " + (old1.y + endp1.y - startp1.y) + "px) scale(" + oldscale + "," + oldscale + ")",
                "-moz-transform": "translate(" + (old1.x + endp1.x - startp1.x) + "px, " + (old1.y + endp1.y - startp1.y) + "px) scale(" + oldscale + "," + oldscale + ")",
                "transform": "translate(" + (old1.x + endp1.x - startp1.x) + "px, " + (old1.y + endp1.y - startp1.y) + "px) scale(" + oldscale + "," + oldscale + ")"
            });
        } else {
            $.extend(endp2, {x: e.touches[1].pageX, y: e.touches[1].pageY});
            endleg = Math.pow((Math.pow((endp2.x - endp1.x), 2) + Math.pow((endp2.y - endp1.y), 2)), 0.5);
            var newscale = oldscale * (1 + (endleg - startleg)/500);
            $("#canvas1").css({
                "-webkit-transform": "translate(" + (old1.x + endp1.x - startp1.x) + "px, " + (old1.y + endp1.y - startp1.y) + "px) scale(" + newscale + "," + newscale + ")",
                "-moz-transform": "translate(" + (old1.x + endp1.x - startp1.x) + "px, " + (old1.y + endp1.y - startp1.y) + "px) scale(" + newscale + "," + newscale + ")",
                "transform": "translate(" + (old1.x + endp1.x - startp1.x) + "px, " + (old1.y + endp1.y - startp1.y) + "px) scale(" + newscale + "," + newscale + ")",
            });
        }
    }, false);
    $(".popup-body .box")[0].addEventListener("touchend", function(e){
        $.extend(old1, {x: old1.x + endp1.x - startp1.x, y: old1.y + endp1.y - startp1.y});
        oldscale = oldscale * (1 + (endleg - startleg)/500);
        startleg = 0;
        endleg = 0;
        if(old1.x > $(".popup-body .box-left").width()){
            old1.x = $(".popup-body .box-left").width();                            
        } else if(old1.x < -($(".popup-body canvas").width() * oldscale - $(".popup-body .box-left").width() - $(".popup-body .box-center").outerWidth(true))){
            old1.x = -($(".popup-body canvas").width() * oldscale - $(".popup-body .box-left").width() - $(".popup-body .box-center").outerWidth(true));
        }
        if(old1.y > $(".popup-body .box-top").height()){
            old1.y = $(".popup-body .box-top").height();
        } else if(old1.y < -($(".popup-body canvas").height() * oldscale - $(".popup-body .box-top").height() - $(".popup-body .box-center").outerHeight(true))){
            old1.y = -($(".popup-body canvas").height() * oldscale - $(".popup-body .box-top").height() - $(".popup-body .box-center").outerHeight(true));
        }
        if(oldscale > 3){
            oldscale = 3;
        } else if(oldscale < 0.1){
            oldscale = 0.1;
        }
        $("#canvas1").css({
            "-webkit-transform": "translate(" + old1.x + "px, " + old1.y + "px) scale(" + oldscale + "," + oldscale + ")",
            "-moz-transform": "translate(" + old1.x + "px, " + old1.y + "px) scale(" + oldscale + "," + oldscale + ")",
            "transform": "translate(" + old1.x + "px, " + old1.y + "px) scale(" + oldscale + "," + oldscale + ")"
        });
    }, false);
    $(".ok a").on("click", function(){
        var top = ($(".popup-body .box-top").height() - old1.y) / oldscale;
        var left = ($(".popup-body .box-left").width() - old1.x) / oldscale;
        var wid = $(".popup-body .box-center").outerWidth(true) / oldscale;
        var heg = $(".popup-body .box-center").outerHeight(true) / oldscale;
        var c = document.getElementById("canvas1");
        var cxt = c.getContext("2d");
        var imgdata = cxt.getImageData(left, top,  wid, heg);
        var mc = options.canvas;
        var mcxt = mc.getContext("2d");
        mc.width = options.canwid / oldscale;
        mc.height = options.canheg / oldscale;
        mcxt.clearRect(0, 0, mc.width, mc.height);
        mcxt.putImageData(imgdata, options.x / oldscale, options.y / oldscale);                        
        var img = new Image();
        img.src = options.pic;
        img.onload = function(){
            mcxt.drawImage(img, 0, 0, mc.width, mc.height);
            var idata = mcxt.getImageData(0, 0, mc.width, mc.height);
            for(var i = 0; i < idata.data.length; i += 4){
                if(idata.data[i] == 238 && idata.data[i + 1] == 238 && idata.data[i + 2] == 238 && idata.data[i + 3] == 255){
                    idata.data[i] = 0;
                    idata.data[i + 1] = 0;
                    idata.data[i + 2] = 0;
                    idata.data[i + 3] = 0;
                }
            }
            mcxt.putImageData(idata, 0, 0);
        };
        if(options.stark === 1){
            picscale.m = oldscale;
        } else {
            picscale.n = oldscale;
        }
        options.obj.show();
        $(".translucent,.popup-body").remove();
    });
    $(".cancel a").on("click", function(){
        $(".translucent,.popup-body").remove();
    });
};
var uploadfile = function(e){
    var file = e.currentTarget.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        var mpImg = new MegaPixImage(file);
        var resCanvas1 = document.getElementById("canvas1");
        var max = $(window).width() * 1.2;
        var tion;
        reader.onload = function(e){                        
            var pic = new Image();
            pic.src = e.target.result;
            pic.onload = function(){
                EXIF.getData(pic, function() {
                    tion = EXIF.getTag(this,"Orientation");
                    mpImg.render(resCanvas1, {
                        width: max,
                        maxWidth: max,
                        orientation: tion
                    });
                });
            }
        };
    } else if (browser.versions.android) {
        reader.onload = function(e){
            var c = document.getElementById("canvas1");
            var cxt = c.getContext("2d");
            var img = new Image();
            img.src = e.target.result;
            img.onload = function(){
                var iw = img.naturalWidth, ih = img.naturalHeight;
                c.width = $(window).width();
                c.height = $(window).width() * ih / iw;
                cxt.clearRect(0, 0, c.width, c.height);
                cxt.drawImage(img, 0, 0, c.width, c.height);
            }
        }
    }
};
