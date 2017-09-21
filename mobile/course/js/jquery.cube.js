(function($, undefined) {
  var data = {
    direction: true, //滑动的方向（默认为水平true）
    shape: 4, //多边体 （默认为正方体）
    loop: false, //是否循环（默认是false）
    width: $(window).width(), //视宽（默认为设备的宽度）
    height: $(window).height(), //视高（默认为设备的高度）
    perspective: 1000, //视距（默认为1000）
    perspectiveOrigin: { //视野角度（默认为中心点）
      x: 'center',
      y: 'center'
    }
  };
  /* 窗体的样式  */
  var formCss = function(obj, data) {
    obj.css({
      'width': data.wid,
      'height': data.heg,
      'padding-top': data.top,
      'padding-right': data.right,
      'padding-bottom': data.bottom,
      'padding-left': data.left,
      '-webkit-perspective': data.pst,
      '-moz-perspective': data.pst,
      'perspective': data.pst,
      '-webkit-perspective-origin': data.pog.x + ' ' + data.pog.y,
      '-moz-perspective-origin': data.pog.x + ' ' + data.pog.y,
      'perspective-origin': data.pog.x + ' ' + data.pog.y
    });
  };
  /* 显示项的样式  */
  var itemCss = function(obj, data) {
    var cssStr = 'rotateY(' + data.deg + 'deg) translateZ(' + data.z + 'px)';
    if (!data.direction) {
      cssStr = 'rotateX(' + data.deg + 'deg) translateZ(' + data.z + 'px)';
    }
    obj.css({
      'display': 'block',
      '-webkit-transform': cssStr,
      '-moz-transform': cssStr,
      'transform': cssStr
    });
  };
  /* 启动过度  */
  var startTransition = function(obj, data) {
    obj.css({
      '-webkit-transition-property': 'all',
      '-moz-transition-property': 'all',
      'transition-property': 'all',
      '-webkit-transition-duration': data.time,
      '-moz-transition-duration': data.time,
      'transition-duration': data.time,
      '-webkit-transition-timing-function': data.cubic,
      '-moz-transition-timing-function': data.cubic,
      'transition-timing-function': data.cubic
    });
  };
  /* 关闭过度  */
  var closeTransition = function(obj) {
    obj.css({
      '-webkit-transition-property': 'none',
      '-moz-transition-property': 'none',
      'transition-property': 'none',
      '-webkit-transition-duration': '0s',
      '-moz-transition-duration': '0s',
      'transition-duration': '0s'
    });
  };
  /* 动画结束时的状态 */
  var animationStatus = function(obj, data) {
    var cssStr = 'rotateY(' + data.deg + 'deg)';
    if (!data.direction) {
      cssStr = 'rotateX(' + data.deg + 'deg)';
    }
    obj.css({
      '-webkit-transform': cssStr,
      '-moz-transform': cssStr,
      'transform': cssStr
    });
  };
  $.extend($.fn, {
    cube: function(options) {
      $.extend(data, options);
      this.each(function(i, e) {
        var legh = $(e).find('.cube').children().length; //子项的个数
        var vtl = data.direction; //滑动的方向
        var leg = data.shape; //多边形的长度
        var pst = data.perspective; //视距
        var wid = data.width; //视宽      
        var heg = data.height; //视高
        var loop = data.loop; //是否循环
        var pog = data.perspectiveOrigin; //视野角度
        if (leg < 3) { //多边形最小是三边
          throw new Error('shape parameters cannot be less than 3');
          return;
        }
        if (legh <= 1) { //当子项只有一项时
          formCss($(e), {
            wid: wid,
            heg: heg,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            pst: pst,
            pog: pog
          });
          $(e).find(".cube").children().css('display', 'block');
          return;
        }
        var deg = 360 / leg; //角度
        var radian = deg * (2 * Math.PI / 360); //弧度
        var tan = Math.tan(radian / 2); //正切值
        var owid; //真实宽度
        var oheg; //真实高度
        var zleg; //Z轴平移的距离
        /* 根据等式 ( pst / wid = (pst - zleg) / owid ) */
        if (vtl) {
          owid = Math.round(2 * tan * pst * wid / (2 * tan * pst + wid));
          zleg = owid / (2 * tan);
          oheg = Math.round((pst - zleg) * heg / pst);
        } else {
          oheg = Math.round(2 * tan * pst * heg / (2 * tan * pst + heg));
          zleg = oheg / (2 * tan);
          owid = Math.round((pst - zleg) * wid / pst);
        }
        var top; //上内边距
        var bottom; //下内边距
        var left; //左内边距
        var right; //右内边距
        if (pog.y === 'top') {
          top = 0;
          bottom = Math.round(heg - oheg);
        } else if (pog.y === 'bottom') {
          top = Math.round(heg - oheg);
          bottom = 0;
        } else {
          top = Math.floor((heg - oheg) / 2);
          bottom = Math.ceil((heg - oheg) / 2);
        }
        if (pog.x === 'left') {
          left = 0;
          right = Math.round(wid - owid);
        } else if (pog.x === 'right') {
          left = Math.round(wid - owid);
          right = 0;
        } else {
          left = Math.floor((wid - owid) / 2);
          right = Math.ceil((wid - owid) / 2);
        }
        formCss($(e), {
          wid: owid,
          heg: oheg,
          top: top,
          right: right,
          bottom: bottom,
          left: left,
          pst: pst,
          pog: pog
        });
        if (legh < leg) { //当子项数比多边形数小时，就不循环
          loop = false;
        }
        if (loop) {
          if (leg > 4 && legh > 4) {
            /* 设置前前个项的样式  */
            itemCss($(e).find(".cube").children().eq(legh - 2), {
              direction: vtl,
              deg: 360 - 2 * deg,
              z: zleg
            });
          }
          if (legh > 2) {
            /* 设置前一个项的样式  */
            itemCss($(e).find(".cube").children().eq(legh - 1), {
              direction: vtl,
              deg: 360 - deg,
              z: zleg
            });
          }
        }
        /* 设置当前项的样式  */
        itemCss($(e).find(".cube").children().eq(0), {
          direction: vtl,
          deg: 0,
          z: zleg
        });
        if (legh > 1) {
          /* 设置后一项的样式  */
          itemCss($(e).find(".cube").children().eq(1), {
            direction: vtl,
            deg: deg,
            z: zleg
          });
        }
        if (leg > 4 && legh > 2) {
          /* 设置后后个项的样式  */
          itemCss($(e).find(".cube").children().eq(2), {
            direction: vtl,
            deg: 2 * deg,
            z: zleg
          });
        }
        var n = 0; //当前索引
        var b = false; //是否有滑动过
        var sp = { //开始坐标
          x: 0,
          y: 0
        };
        var ep = { //结束坐标
          x: 0,
          y: 0
        };
        $(e).on('touchstart', function(ex) {
          $.extend(sp, {
            x: ex.originalEvent.touches[0].pageX,
            y: ex.originalEvent.touches[0].pageY
          });
          closeTransition($(this).find(".cube"));
        });
        $(e).on('touchmove', function(ex) {
          ex.originalEvent.preventDefault();
          $.extend(ep, {
            x: ex.originalEvent.touches[0].pageX,
            y: ex.originalEvent.touches[0].pageY
          });
          b = true;
          var angle = vtl ? ((ep.x - sp.x) * deg / wid) : (-(ep.y - sp.y) * deg / heg);
          animationStatus($(this).find(".cube"), {
            direction: vtl,
            deg: angle
          });
        });
        $(e).on('touchend', function(ex) {
          if (b) {
            b = false;
            var _this = $(this);
            var angle = -deg;
            if (vtl) {
              if (ep.x - sp.x > 30) { //向右滑动
                n--;
                angle = deg;
              } else if (ep.x - sp.x < -30) { //向左滑动
                n++;
                angle = -deg;
              }
            } else {
              if (ep.y - sp.y > 30) { //向下滑动
                n++;
                angle = -deg;
              } else if (ep.y - sp.y < -30) { //向上滑动
                n--;
                angle = deg;
              }
            }
            if (loop) {
              if (n < 0) {
                n = legh - 1;
              } else if (n > legh - 1) {
                n = 0;
              }
            } else {
              if (n < 0) {
                n = 0;
                angle = 0;
              } else if (n > legh - 1) {
                n = legh - 1;
                angle = 0;
              }
            }
            startTransition(_this.find('.cube'), {
              time: '.3s',
              cubic: 'linear'
            });
            animationStatus(_this.find(".cube"), {
              direction: vtl,
              deg: angle
            });
            setTimeout(function() {
              var _prevs = n - 2;
              var _prev = n - 1;
              var _cur = n;
              var _next = n + 1;
              var _nexts = n + 2;
              if (n === 0 && loop) {
                _prevs = legh - 2;
                _prev = legh - 1;
              }
              if (n === 1 && loop) {
                _prevs = legh - 1;
              }
              if (n === legh - 2 && loop) {
                _nexts = 0;
              }
              if (n === legh - 1 && loop) {
                _next = 0;
                _nexts = 1;
              }
              _this.find(".cube").children().removeAttr('style');
              if (leg > 4 && legh > 4 && _prevs > -1) {
                itemCss(_this.find(".cube").children().eq(_prevs), {
                  direction: vtl,
                  deg: 360 - 2 * deg,
                  z: zleg
                });
              }
              if (legh > 1 && _prev > -1) {
                itemCss(_this.find(".cube").children().eq(_prev), {
                  direction: vtl,
                  deg: 360 - deg,
                  z: zleg
                });
              }
              itemCss(_this.find(".cube").children().eq(_cur), {
                direction: vtl,
                deg: 0,
                z: zleg
              });
              if (legh > 1 && _next < legh) {
                itemCss(_this.find(".cube").children().eq(_next), {
                  direction: vtl,
                  deg: deg,
                  z: zleg
                });
              }
              if (leg > 4 && legh > 2 && _nexts < legh) {
                itemCss(_this.find(".cube").children().eq(_nexts), {
                  direction: vtl,
                  deg: 2 * deg,
                  z: zleg
                });
              }
              closeTransition(_this.find(".cube"));
              animationStatus(_this.find(".cube"), {
                direction: vtl,
                deg: 0
              });
            }, 300);
          }
        });
      });
    }
  });
}(jQuery));