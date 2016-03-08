(function(window, document, undefined) {
    'use strict';

    SITE.home = (function()
    {

        var DOM = function(_view)
        {
            this.view           =   (typeof _view != 'undefined')?_view.find('.layout__home'):$('.layout__home');
            this.init();
        }
        DOM.prototype = {
            init : function()
            {

            }
        }

        var init = function()
        {
            new DOM();
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