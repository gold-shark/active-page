var dataForWeixin={
   appId:"",
   MsgImg:"http://img1.faxinxila.net/images/share_msg.png",
   TLImg:"http://img1.faxinxila.net/images/share.png",
   url:"http://faxinxi.la/img/120X120.jpg",
   title:"房产互联网首次掌上发布会，邀您共同开启免费端口新世纪！",
   desc:"“超级端口”助力行业，助力经纪人免费开放，首轮开放五大城市",
   fakeid:"",
   callback:function(){
   	window.location.href = "http://387997.m.weimob.com/activity/BigWeel?_tj_twtype=13&_tj_pid=387997&_tt=1&_tj_graphicid=8005968&_tj_title=Q%E6%88%BF%E7%BD%91%E7%9B%98%E5%AE%A2%E9%80%9A%EF%BC%88%E7%AB%AF%E5%8F%A3%EF%BC%89%E6%8E%8C%E4%B8%8A%E5%8F%91%E5%B8%83%E4%BC%9A%E6%B4%BB%E5%8A%A8%E5%BC%80%E5%A7%8B%E4%BA%86&_tj_keywords=0416&id=48075&bid=712859&wechatid=oULrJjmEXfOxcO7LnN5u9C1tJXW8&pid=387997&v=599417c7c9f5ea3afda026238dfb8357&channel=kw%255E%2523%255EMDQxNg%3D%3D";
   }
};
(function(){
   var onBridgeReady=function(){
   WeixinJSBridge.on('menu:share:appmessage', function(argv){
      WeixinJSBridge.invoke('sendAppMessage',{
         "appid":dataForWeixin.appId,
         "img_url":dataForWeixin.MsgImg,
         "img_width":"120",
         "img_height":"120",
         "link":dataForWeixin.url,
         "desc":dataForWeixin.desc,
         "title":dataForWeixin.title
      }, function(res){(dataForWeixin.callback)();});
   });
   WeixinJSBridge.on('menu:share:timeline', function(argv){
      (dataForWeixin.callback)();
      WeixinJSBridge.invoke('shareTimeline',{
         "img_url":dataForWeixin.TLImg,
         "img_width":"120",
         "img_height":"120",
         "link":dataForWeixin.url,
         "desc":dataForWeixin.desc,
         "title":dataForWeixin.title
      }, function(res){});
   });
   WeixinJSBridge.on('menu:share:weibo', function(argv){
      WeixinJSBridge.invoke('shareWeibo',{
         "content":dataForWeixin.title,
         "url":dataForWeixin.url
      }, function(res){(dataForWeixin.callback)();});
   });
   WeixinJSBridge.on('menu:share:facebook', function(argv){
      (dataForWeixin.callback)();
      WeixinJSBridge.invoke('shareFB',{
         "img_url":dataForWeixin.TLImg,
         "img_width":"120",
         "img_height":"120",
         "link":dataForWeixin.url,
         "desc":dataForWeixin.desc,
         "title":dataForWeixin.title
      }, function(res){});
   });
};
if(document.addEventListener){
   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
}else if(document.attachEvent){
   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
}
})();