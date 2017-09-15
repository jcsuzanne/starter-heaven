'use strict';

// MODULES
import $ from 'jquery';
import OuterHeaven from './base/outerheaven.js';
import SmartResize from './vendor/smartresize.js';
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
    $(window).on("throttledresize", function( event ) {
        Channels.emit('window::smartresize')
    });

    // Views
    new UI()
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
});

