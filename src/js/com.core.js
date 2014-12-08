kickstarter.bootstrap('SITE', {
    ajax: {
        durationFadeIn: 800,
        durationFadeOut: 800
    }
});

//variables
//=========
var
    $mainContent
,   $HTML
,   $body
,   $master
,   $mainNav
,   API_transition
,   RAF
,   $window             = $(window)
,   _k                  = kickstarter
,   isVisiting          = false
,   _DEBUGG             = false
,   isOldie             = false
,   no3D                = false
,   isTouch             = false
,   isTablet            = false
,   startApp            = false
,   allowPreventTouch   = true
,   EVENTS              = {}
;

(function(window, document, undefined) {
    'use strict';

    SITE.core = (function()
    {

        var detectBrowser = function() {
            if(!Modernizr.csstransforms) {
                no3D = true;
            }
            if(kickstarter.ev.move == 'touchmove') {
                isTouch = true;
            }
            Modernizr.Detectizr.detect({
                addAllFeaturesAsClass: false
            ,   detectDevice: true
            ,   detectDeviceModel: false
            ,   detectScreen: false
            ,   detectOS: true
            ,   detectBrowser: true
            ,   detectPlugins: false
            })
            if(Detectizr.device.type == 'tablet') {
                isTablet = true;
                // preventTouchBounce();
            }
            if((Detectizr.browser.name == "ie" && Detectizr.browser.version == "8") || $HTML.hasClass('ie8'))
            {
                isOldie = true;
            }
        }

        //master finalize
        //================
        var finalize = function()
        {

        }

        //master init
        //===========
        var init = function()
        {
            var __that = this;
            API_transition      =   transition.init();
            setGlobalVariables();
            smartResize();
            detectBrowser();
            __that.ready();
        }

        // Datas Is Ready
        //==============
        var ready = function() {
            SITE.toolbox.init();
            SITE.layout.init();
        }

        // Do a clean resize bind
        //=======================
        var smartResize = function() {
            $(window).on("throttledresize", function( event ) {
                kickstarter.publish('window::smartresize');
            });
        }

        //set global element in cache
        //===========================
        var setGlobalVariables = function() {
            $HTML               = $(document.getElementsByTagName("html")[0]);
            $mainContent        = $(document.getElementById('main-content'));
            $body               = $(document.body);
            $master             = $(document.getElementById('master'));
            $mainNav            = $(document.getElementById('main-nav'));
        }

        return {
            'ready': ready,
            'init': init,
            'finalize': finalize,
            'smartResize':smartResize

        };
    })();

}(window, document));