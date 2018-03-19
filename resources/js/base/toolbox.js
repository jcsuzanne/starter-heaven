'use strict';
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
    
    calculateTime(_time,_duration)
    {
        let secs = parseInt(_time % 60);
        let mins = parseInt((_time / 60) % 60);
        let hours = parseInt(((_time / 60) / 60) % 60);

        // Do we need to display hours?
        let displayHours = (parseInt(((_duration / 60) / 60) % 60) > 0);

        // Ensure it's two digits. For example, 03 rather than 3.
        secs = ('0' + secs).slice(-2);
        mins = ('0' + mins).slice(-2);

        let timeToDisplay = (displayHours ? hours + ':' : '') + mins + ':' + secs
        return timeToDisplay;
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
        let index = document.getElementById('state-indicator').style.zIndex;
        let states = {
            1 : 'mobile',
            2:  'tablet'
        };
        return states[index] || 'desktop';
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getTransformValues(element)
    {
        const style = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(style.webkitTransform);
        return {x:matrix.m41,y:matrix.m42}
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
        if(typeof window.gtag !== "undefined") {
            gtag('config', window.GTAG_ID, {
                'page_path': url
              });
        }
    }

    parseHashUrl()
    {
        var hashParams = {};
        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&=]+)=?([^&]*)/g,
            d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
            q = window.location.hash.substring(1);

        while (e = r.exec(q))
           hashParams[d(e[1])] = d(e[2]);

        return hashParams;
    }
    
    resetScroll()
    {
        window.scrollTo(0, 0);
    }

    resetContext()
    {
        Channels.on('statechange::before',() => {

        })
    }

    setScroll(x,y)
    {
        window.scrollTo(x, y);
    }
    
    shareSocial(_btn)
    {
        const $ref = _btn
        const network = $ref.getAttribute('data-network')
        const url = $ref.getAttribute('data-shareurl')

        if(network == 'facebook')
        {
            FB.ui({
                method: 'share',
                display: 'popup',
                href: url,
            }, function(response){});
        }
        else if(network == "twitter" || network == "pinterest" || network == "linkedin")
        {
            window.open(url,"nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=550, height=420");
        }
    }

    scaleToWindow(canvas, backgroundColor) {
        var scaleX, scaleY, scale, center;

        //1. Scale the canvas to the correct size
        //Figure out the scale amount on each axis
        scaleX = window.innerWidth / canvas.offsetWidth;
        scaleY = window.innerHeight / canvas.offsetHeight;

        //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
        scale = Math.min(scaleX, scaleY);
        canvas.style.transformOrigin = "0 0";
        canvas.style.transform = "scale(" + scale + ")";

        //2. Center the canvas.
        //Decide whether to center the canvas vertically or horizontally.
        //Wide canvases should be centered vertically, and
        //square or tall canvases should be centered horizontally
        if (canvas.offsetWidth > canvas.offsetHeight) {
            if (canvas.offsetWidth * scale < window.innerWidth) {
            center = "horizontally";
            } else {
            center = "vertically";
            }
        } else {
            if (canvas.offsetHeight * scale < window.innerHeight) {
            center = "vertically";
            } else {
            center = "horizontally";
            }
        }

        //Center horizontally (for square or tall canvases)
        var margin;
        if (center === "horizontally") {
            margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
            canvas.style.marginTop = 0 + "px";
            canvas.style.marginBottom = 0 + "px";
            canvas.style.marginLeft = margin + "px";
            canvas.style.marginRight = margin + "px";
        }

        //Center vertically (for wide canvases)
        if (center === "vertically") {
            margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
            canvas.style.marginTop = margin + "px";
            canvas.style.marginBottom = margin + "px";
            canvas.style.marginLeft = 0 + "px";
            canvas.style.marginRight = 0 + "px";
        }

        //3. Remove any padding from the canvas  and body and set the canvas
        //display style to "block"
        canvas.style.paddingLeft = 0 + "px";
        canvas.style.paddingRight = 0 + "px";
        canvas.style.paddingTop = 0 + "px";
        canvas.style.paddingBottom = 0 + "px";
        canvas.style.display = "block";

        //4. Set the color of the HTML body background
        document.body.style.backgroundColor = backgroundColor;

        //Fix some quirkiness in scaling for Safari
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("safari") != -1) {
            if (ua.indexOf("chrome") > -1) {
            // Chrome
            } else {
            // Safari
            //canvas.style.maxHeight = "100%";
            //canvas.style.minHeight = "100%";
            }
        }

        //5. Return the `scale` value. This is important, because you'll nee this value
        //for correct hit testing between the pointer and sprites
        return scale;
    }

    scrollPosition()
    {
        /*https://developer.mozilla.org/fr/docs/Web/API/document/scrollingElement*/
        let getScrollY;
        const getViewport = this.getViewport()
        const pageHeight = Math.round(Env.$master.getBoundingClientRect().height - getViewport.height)
        if(document.scrollingElement && document.scrollingElement.scrollTop)
        {
            getScrollY = document.scrollingElement.scrollTop
        }
        else if(document.documentElement && document.documentElement.scrollTop)
        {
            getScrollY = document.documentElement.scrollTop
        }
        else
        {
            getScrollY = Env.$body.scrollTop
        }
        // const getScrollY = (document.documentElement && document.documentElement.scrollTop) || Env.$body.scrollTop
        return {scrollY:getScrollY,fullPageHeight: pageHeight}
    }

    newContextIsReady()
    {
        Channels.on('statechange::ready',() => {
            Env.isVisiting = true
            this.pushGA(window.location.href)
        })
    }

    wheelSupport()
    {
        // detect available wheel event
        const support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
        return support
    }

}

export default Toolbox;
