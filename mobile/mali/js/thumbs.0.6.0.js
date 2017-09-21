(function(window) {
    try {
        document.createEvent('TouchEvent');
        return;
    }
    catch(e) {
    }
    
    var eventMap = {
        'mousedown': 'touchstart',
        'mouseup':   'touchend',
        'mousemove': 'touchmove'
    };

    var initialize = function() {
        for (var key in eventMap) {
            document.body.addEventListener(key, function(e) {
                var event = createTouchEvent(eventMap[e.type], e);
                e.target.dispatchEvent(event);
                var fn = e.target['on' + eventMap[e.type]];
                if (typeof fn === 'function') fn(e);
            }, false);
        }
    };
    var createTouchEvent = function(name, e) {
        var event = document.createEvent('MouseEvents');

        event.initMouseEvent(
            name,
            e.bubbles,
            e.cancelable,
            e.view,
            e.detail,
            e.screenX,
            e.screenY,
            e.clientX,
            e.clientY,
            e.ctrlKey,
            e.altKey,
            e.shiftKey,
            e.metaKey,
            e.button,
            e.relatedTarget
        );

        return event;
    };
    if (document.readyState === 'complete' || document.readyState === 'loaded') {
        initialize();
    }
    else {
        window.addEventListener('load', initialize, false);
    }

})(window);