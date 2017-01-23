(function(window, document, undefined) {
    'use strict';

    var ContextClass = function()
    {

    }

    ContextClass.prototype.channels = function() {
        var
        self = this

        _k.subscribe('context::dom::ready',function(_view)
        {
            
        })

        _k.subscribe('context::ajax::ready',function(_views)
        {
            var
            current = _views[1]
            ,next = _views[0]

        })

        _k.subscribe('context::ajax::exit',function(_views)
        {
            var
            controller = _views[2]
            canAjax = true
        })
    };

    ContextClass.prototype.init = function() {
        this.channels()
    };

    window.ContextClass = ContextClass

}(window, document));
