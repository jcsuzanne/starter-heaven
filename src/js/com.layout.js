(function(window, document, undefined) {
    'use strict';

    SITE.layout = (function()
    {


        // Global
        //=======
        var Global = function() {

            this.init();
        };
        Global.prototype = {
            channels : function() {
                var
                    global      =   this
                ;
                _k.subscribe('mainnav::update',function(_controller) {
                    global.mainnavUpdate(_controller);
                });
                _k.subscribe('statechange::before',function() {
                    global.offAll();
                    global.reset();
                });
            }
            ,
            offAll : function() {
                $.each(EVENTS,function() {
                    $.each(this,function() {
                        if(this.indexOf('keydown') >= 0)
                        {
                            $body.off(this);
                        }
                        else
                        {
                            $mainContent.off(this);
                        }
                    });
                });
                _k.unsubscribe('window::smartresize');
                cancelRequestAnimFrame(RAF);
                allowPreventTouch   =   true;
            }
            ,
            mainnavUpdate : function(_controller)
            {
                console.log('mainnav update',_controller);
            }
            ,
            reset : function() {
                $mainContent.removeClass('canScroll');
                SITE.core.smartResize();
            }
            ,
            setup : function()
            {
                var
                    getController       =   $mainContent.attr('data-controller')
                ;
                this.mainnavUpdate(getController);
            }
            ,
            init : function() {
                this.channels();
                this.setup();
            }
        }


        // Transition finalize
        //====================
        var transitionFinalize = function(_controller)
        {
            console.log('transitionFinalize :',_controller);
        }

        // Initialize the template
        //=======================
        var init = function()
        {
            new Global();
        }

        return {
                init: init
            ,   transitionFinalize:transitionFinalize
        }
    })();

}(window, document));