(function(window, document, undefined) {
    'use strict';

    SITE.layout = (function()
    {


        // UI
        //=======
        var UI = function() {

            this.init();
        };
        UI.prototype = {
            channels : function() {
                var
                self = this
                ;
                _k.subscribe('mainnav::update',function(_controller) {
                    self.mainnavUpdate(_controller);
                });
                _k.subscribe('statechange::before',function() {
                    self.offAll();
                    self.reset();
                });
            }
            ,
            offAll : function() {
                $.each(EVENTS,function() {
                    if(this.indexOf('keydown') >= 0)
                    {
                        $body.off(this);
                    }
                    else
                    {
                        $mainContent.off(this);
                    }
                });
                _k.unsubscribe('window::smartresize');
                cancelRequestAnimFrame(RAF);
                allowPreventTouch = true;
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
                getController = $mainContent.attr('data-controller')

                this.mainnavUpdate(getController);
            }
            ,
            init : function() {
                this.channels();
                this.setup();
            }
        }


        // Initialize the template
        //=======================
        var init = function()
        {
            new UI();
        }

        return {
            init: init
        }
    })();

}(window, document));