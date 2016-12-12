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
            reset : function() {
                $mainContent.removeClass('canScroll');
                SITE.core.smartResize();
            }
            ,
            setup : function()
            {

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