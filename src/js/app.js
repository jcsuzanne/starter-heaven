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
                scope       =   this
            ;
            _k.subscribe('statechange::after',function(_html) {
                scope.htmlin(_html);
            });
            _k.subscribe('statechange::finalize',function(_controller) {
                console.log('anim');
            });
        }
        ,
        htmlin : function(_html) {
            var
                $html           =   $(_html)
            ,   getView         =   $html.find('.the-view')
            ,   getOldController    =   $('#main-content').attr('data-controller')
            ,   getController   =   $html.find('#main-content').attr('data-controller')
            ,   getTitle        =   $html.filter('title').text()
            ;

            $body.attr('data-controller',getController);
            $mainContent.attr('data-controller',getController);

            $(getView)
                .addClass('ajaxhidden ajaxoverride ajaxnext')
                .appendTo($mainContent)
                .ajaxify()
            ;
            if(typeof SITE[getController] != 'undefined' && typeof SITE[getController].after == 'function') SITE[getController].after($(getView));
            document.title  =   getTitle;
            _k.publish('statechange::finalize',[getController,getOldController]);
            isVisiting = true;
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