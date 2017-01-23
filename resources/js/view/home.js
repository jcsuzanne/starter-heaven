(function(window, document, undefined) {
    'use strict';

    SITE.home = (function()
    {
        var
        klassName = '.layout-home'

        var DOM = function(_view)
        {
            this.view = (typeof _view != 'undefined')?_view.find(klassName):$(klassName);
            this.init();
        }
        DOM.prototype = {
            init : function()
            {

            }
        }

        var init = function()
        {
            new DOM($mainContent);
            _k.publish('context::dom::ready',$mainContent)
        }

        var after = function(_view)
        {
            new DOM(_view);
        }

        return {
                init : init
            ,   after : after
        }
    })();

}(window, document));