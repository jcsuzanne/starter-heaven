'use strict';
import $ from 'jquery';
import Barba from 'barba.js';
import Channels from '../base/channels.js';
import UI from '../view/ui.js';
import Env from '../base/env.js';

class Toolbox
{
    constructor()
    {
        this.resetContext()
        this.newContextIsReady()
    }

    goBack()
    {
        if(document.referrer.length == 0)
        {
            Barba.Pjax.goTo(config.urlHome)
        }
        else
        {
            window.history.go(-1);
        }
    }

    getController()
    {
        return document.querySelector('.barba-container').getAttribute("data-namespace")
    }

    getMode()
    {
        let index = $(document.getElementById('state-indicator')).css('z-index');
        let states = {
            1 : 'mobile',
            2:  'tablet'
        };
        return states[index] || 'desktop';
    }

    getViewport()
    {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            outerWidth: window.innerWidth,
            outerHeight: window.innerHeight
        }
    }

    guid()
    {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }

    pushGA(url=window.location.href)
    {
        // Inform Google Analytics of the change
        if (typeof window._gaq !== 'undefined' )
        {
            window._gaq.push(['_trackPageview']);
        }
        if (typeof window.ga !== 'undefined')
        {
            ga('send', 'pageview', {'page': url});
        }
    }

    resetScroll()
    {
        window.scrollTo(0, 0);
    }

    resetContext()
    {
        Channels.on('statechange::before',() => {
            Channels.removeAllListeners('window::smartresize');
        })
    }

    newContextIsReady()
    {
        Channels.on('statechange::ready',() => {
            Env.isVisiting = true
            this.pushGA(window.location.href)
        })
    }

}

export default Toolbox;