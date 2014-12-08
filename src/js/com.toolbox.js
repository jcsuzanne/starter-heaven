(function(window, document, undefined) {
    'use strict';

    SITE.toolbox = (function()
    {

        var getController = function()
        {
            return document.getElementById('main-content').getAttribute("data-controller")
        }

        var getDeviceState = function()
        {
            var index = $(document.getElementById('state-indicator')).css('z-index');
            var states = {
                1 : 'desktop'
                2:  'tablet',
                3:  'mobile'
            };

            return states[index] || 'desktop';
        }

        return {
                getController : getController
            ,   getDeviceState : getDeviceState
        }
    })();

}(window, document));