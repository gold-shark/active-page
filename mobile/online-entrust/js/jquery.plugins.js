(function ($, undefined) {
  'use strict';

  var o = {
    start: 'touchstart',
    end: 'touchend'
  };

  $.event.special.tap = {
    setup: function () {
      $(this).off('click').on(o.start + ' ' + o.end, function (e) {
        o.e = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
      }).on(o.start, function (e) {
        if (e.which && e.which !== 1) {
          return;
        }
        o.target = e.target;
        o.time = new Date().getTime();
        o.X = o.e.pageX;
        o.Y = o.e.pageY;
      }).on(o.end, function (e) {
        if (
          o.target === e.target &&
          ((new Date().getTime() - o.time) < 750) &&
          (Math.sqrt(Math.pow(o.X - o.e.pageX, 2) + Math.pow(o.Y - o.e.pageY, 2)) < 15)
        ) {
          e.type = 'tap';
          e.pageX = o.e.pageX;
          e.pageY = o.e.pageY;
          $.event.dispatch.call(this, e);
        }
      });
    },
    teardown: function () {
      $(this).off(o.start + ' ' + o.end);
    }
  };

  $.fn['tap'] = function (fn) {
    return this[fn ? 'on' : 'trigger']('tap', fn);
  };
}(jQuery));

(function ($, undefined) {
  'use strict';

  /* 初始化 */
  function init() {
    var _this = this;
    var _prefix = ['-webkit-', '-moz-', '-ms-', '-o-'];
    $.each(this.options, function (i, v) {
      var _str = '{';
      $.each(_prefix, function (j) {
        _str += '\"' + this[j] + i + '\":\"' + v + '\",';
      });
      _str = _str.substr(0, _str.length - 1) + '}';
      $.extend(_this.options, $.parseJSON(_str));
    });
    this.$el.css(this.options);
  };

  /* 给css3加前缀 */
  function Prefix($el, options) {
    this.$el = $el;
    this.options = options;
    init.call(this);
  };

  /* 插件 */
  function Plugin(options) {
    if (typeof options !== 'object') {
      throw 'arguments are not object';
    }
    return new Prefix($(this), options);
  };

  $.fn.prefix = Plugin;
}(jQuery));

(function ($, undefined) {
  'use strict';

  /* 默认参数  */
  var defaultParameters = {
    direction: 'horizontal', // 方向   horizontal | vertical
    duration: 0, // 过渡效果花费的时间
    timing: 'ease', // 过渡效果的时间曲线
    value: 0, // 过渡的值
    callback: null // 回调
  };

  /* 初始化 */
  function init() {
    var _str = '';
    if (typeof this.opts.value === 'number') {
      _str = this.opts.direction === 'horizontal' ? this.opts.value + 'px,0,0' : '0,' + this.opts.value + 'px,0';
    } else {
      _str = this.opts.direction === 'horizontal' ? this.opts.value + ',0,0' : '0,' + this.opts.value + ',0';
    }
    this.$el.prefix({
      'transition-property': 'all',
      'transition-duration': this.opts.duration + 's',
      'transition-timing-function': this.opts.timing,
      'transform': 'translate3d(' + _str + ')'
    });
    if (this.opts.callback && $.isFunction(this.opts.callback)) {
      setTimeout(this.opts.callback, 300);
    }
  };

  /* css3过渡动画 */
  function Translate($el, options) {
    this.$el = $el;
    this.opts = $.extend({}, defaultParameters, options);
    init.call(this);
  };

  /* 插件 */
  function Plugin(options) {
    return new Translate($(this), options);
  };

  $.fn.translate = Plugin;
}(jQuery));
