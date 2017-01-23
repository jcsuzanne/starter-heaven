;(function (window, undefined) {
    "use strict";

    var App = function()
    {
        this.init();
    };
    App.prototype           =
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
            });
            _k.subscribe('statechange::finalize',function(_controller) {
                console.log('anim');
            });
        }
        ,
        htmlin : function(_data) {
            var
                data            =   JSON.parse(_data)
            ,   $view           =   $(data.view)
            ,   getOldController    =   $('#main-content').attr('data-controller')
            ,   getController   =   data.jscontroller
            ,   getTitle        =   data.meta
            ;

            $body.attr('data-controller',getController)
            $mainContent.attr('data-controller',getController);


            $view
                .addClass('ajaxhidden ajaxoverride ajaxnext')
                .appendTo($mainContent)
                .ajaxify()
            ;
            if(typeof SITE[getController] != 'undefined' && typeof SITE[getController].after == 'function') SITE[getController].after($view);
            document.title  =   getTitle;
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