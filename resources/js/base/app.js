;(function (window, undefined) {
    "use strict";

    var App = function()
    {
        this.init();
    };
    App.prototype =
    {
        channels : function()
        {
            var
            self = this

            _k.subscribe('statechange::before',function()
            {
                canAjax = false
            })

            _k.subscribe('statechange::after',function(_json) {
                isVisiting = true;
                self.htmlin(_json);
                if($HTML.hasClass('isVisiting') == false)
                {
                    $HTML.addClass('isVisiting')
                }
            });
            _k.subscribe('statechange::finalize',function(_controller) {
                API_transition.global(_controller);
            });
        }
        ,
        htmlin : function(_data) {
            var
                getTitle
            ,   master
            ,   getController
            ,   $view
            ,   data = _data
            ,   wrapper = document.createElement('div')
            ,   getOldController = $mainContent[0].getAttribute('data-controller')

            // append content
	        wrapper.innerHTML = data
            // title
            getTitle = wrapper.querySelector('title').textContent
            if(getTitle.length == 0)
            {
                getTitle = config.fallbackSEOTitle
            }
            // get context
            master = wrapper.querySelector('#master')
            getController = master.getAttribute('data-controller')
            // get view
            $view = $(wrapper.querySelector('.the-view'))

            // attaches
            $body.attr('data-controller',getController)
            $mainContent.attr('data-controller',getController);

            $view
                .addClass('ajaxhidden ajaxoverride ajaxnext')
                .appendTo($mainContent)
                .ajaxify()
            ;
            if(typeof SITE[getController] != 'undefined' && typeof SITE[getController].after == 'function') SITE[getController].after($view);
            document.title = getTitle;
            _k.publish('statechange::finalize',[getController,getOldController]);
        }
        ,
        init : function()
        {
            this.channels();
        }
    }
    window.App = App;
})(window);
// call
if(startApp) var app = new App();
