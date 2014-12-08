(function(window, document, undefined) {
    'use strict';

    SITE.preload = (function()
    {

        var
            intervalProgress
        ,   preloadInstance


        var manifest = function(_datas,_fn)
        {
            var scope = this;
            var total = _datas.length;
            var datas = _datas;
            preloadInstance = new createjs.LoadQueue(false);
            preloadInstance.loadManifest(datas);
            preloadInstance.on("complete", function() {
                if(typeof _fn == 'function') _fn();
            }, this);
        }

        return {
            manifest:manifest
        }
    })();

}(window, document));

