(function(window, document, undefined) {
    'use strict';
    /*
     * Global api.
     */
    var transition = window.transition = {
        get: function() {
            return _instance;
        },
        //Main entry point.
        init: function(options) {
            return _instance || new Transition(options);
        }
    };

    Transition.prototype.global = function(_controller)
    {
        var
        $current            =   $mainContent.find('.the-view:not(.ajaxnext)')
        ,$next              =   $mainContent.find('.ajaxnext')
        ,timeline           =   new TimelineLite({
            paused : true,
            onComplete : complete
        })
        ,duration           =   1
        ,$ref               =   $mainTransition
        ,getController      =   API_toolbox.getController()

        // timeline
        //=========
        timeline.kill();
        timeline.add(
            [
                TweenLite.fromTo($ref, .4, { autoAlpha : 0 } , { autoAlpha : 1 , ease:Linear.easeNone , 
                    onStart : function() { _k.publish('context::ajax::exit',[$next,$current,_controller]) } 
                })
            ]
        );
        timeline.call(function() {
            // clean
            _k.publish('ui::removeskin')
            $current.remove();
            $next.removeClass('ajaxnext ajaxoverride ajaxhidden');
            $body.removeClass().addClass('page-'+_controller[0]);
            posScroll()
        });
        timeline.add(
            [
                TweenLite.to($ref, .4,  { autoAlpha : 0, ease:Linear.easeNone , delay : .1  })
            ]
        );

        timeline.restart();

        function posScroll()
        {
            var
            $ref = ($HTML.hasClass('webkit'))?$body:$window
            $ref.scrollTop(0);
        }

        function complete()
        {
            _k.publish('context::ajax::ready',[$next,$current])
        }
    }

    

    /**
     * Constructor.
     */
    function Transition(options) {
        _instance = this;
        return _instance;
    }


    // Singleton
    var _instance;

}(window, document));