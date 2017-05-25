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

    // Start Barba
    new OuterHeaven();
});

