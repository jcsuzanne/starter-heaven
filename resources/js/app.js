'use strict';
// LIBS
import { TweenMax } from 'gsap'

// MODULES
import OuterHeaven from './base/outerheaven.js';
import BrowserDetection from './base/detection.js';
import Env from './base/env.js';
import Toolbox from './base/toolbox.js';
import Channels from './base/channels.js';
import Home from './view/home.js';
import UI from './view/ui.js';


document.addEventListener('DOMContentLoaded', function()
{
    // Starter
    Env.framework.toolbox = new Toolbox();
    new BrowserDetection();
    window.addEventListener('resize',function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
            Channels.emit('window::smartresize')
        }, 200);
    });

    // Views
    Env.framework.UI = new UI()
    Home.init()

    // Signature
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        var args = ['\n %c with <3 by @jcsuzanne \u2730 http://www.jcsuzanne.com/ \n\n','background: #ffcc33; padding:5px 0;color: #333333;'];
        window.console.log.apply(console, args);
    } else if (window.console) {
        window.console.log('@jcsuzanne - http://www.jcsuzanne.com/');
    }

    // Start Barba
    new OuterHeaven();

    // PWA
    if(config.env === "production") {
        navigator.serviceWorker.controller?console.log("[PWA Builder] active service worker found, no need to register"):navigator.serviceWorker.register(config.pathRoot+"pwa.js",{scope:config.pathRoot}).then(function(e){console.log("Service worker has been registered for scope:"+e.scope)});
    }
});

