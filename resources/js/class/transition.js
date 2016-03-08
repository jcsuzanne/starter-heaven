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