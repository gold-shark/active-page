$(function(){
	function supportCss3(style) {  
	    var prefix = ['webkit', 'Moz', 'ms', 'o'],  
	    i,  
	    humpString = [],  
	    htmlStyle = document.documentElement.style,  
	    _toHumb = function (string) {  
		    return string.replace(/-(\w)/g, function ($0, $1) {  
		    	return $1.toUpperCase();  
		    });  
	    };	       
	    for (i in prefix){  
	    	humpString.push(_toHumb(prefix[i] + '-' + style));  
	    }
	    humpString.push(_toHumb(style));	       
	    for (i in humpString){  
	    	if (humpString[i] in htmlStyle) 
	    	return true;
	    } 
	    return false;  
	};
	if(!supportCss3('animation-play-state')){
		$(".card-items").find("img").css({"opacity": "1"});
	}
	var n = 0;
	var anim = function(n){
		$(".card-items").fadeOut(1500).eq(n).fadeIn(1500);
	};
	var out = setInterval(function(){
		n++;		
		if(n >= 2){
			clearInterval(out);
		}
		anim(n);
	}, 5000);
});