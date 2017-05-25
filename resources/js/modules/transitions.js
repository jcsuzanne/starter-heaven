import $ from 'jquery';
import Barba from 'barba.js';
import Env from '../base/env.js';
import TweenMax from '../vendor/gsap/TweenMax.js';
import SlipText from '../vendor/gsap/SplitText.js';

let MainTransitions = Barba.BaseTransition.extend({
    start: function()
    {
        const currentController = this.oldContainer.getAttribute('data-namespace')
        Promise
        .all([this.newContainerLoading, this.none()])
        .then(this.dispatchTransition.bind(this))
    },
    none: function()
    {
        const deferred = Barba.Utils.deferred();
        deferred.resolve();
    },
    dispatchTransition:function()
    {
        const self = this
        const currentController = this.oldContainer.getAttribute('data-namespace')
        const newController = this.newContainer.getAttribute('data-namespace')
        const timeline = new TimelineLite({ onComplete : complete , paused: true })
        const $fill = Env.$mainTransition.querySelector('.fill')
        const $frames = Env.$mainTransition.querySelectorAll('.timecode div')
        const viewport  = Env.framework.toolbox.getViewport()
        let tweenIn, tweenOut = undefined;

        switch(currentController)
        {
            case 'detail':
                tweenOut = this.tweenDetailOut(this)
            break;
            case 'about':
                tweenOut = this.tweenAboutOut(this)
            break;
            case 'home':
                tweenOut = this.tweenHomeOut(this)
            break;
        }
        switch(newController)
        {
            case 'detail':
                tweenIn = this.tweenDetailIn(this)
            break;
            case 'about':
                tweenIn = this.tweenAboutIn(this)
            break;
            case 'home':
                tweenIn = this.tweenHomeIn(this)
            break;
        }


        timeline.kill()
        timeline.call(()=>
        {
            TweenLite.set(Env.$mainTransition , { autoAlpha : 1 })
            TweenLite.set($frames , { y : viewport.height * .55 })
        })
        if(typeof tweenOut != "undefined")
        {
            timeline.add(tweenOut)
        }
        timeline.add([
            TweenLite.fromTo($fill , .6 , { autoAlpha : 0 } , { autoAlpha : 1 , onComplete : ()=>
                {
                    Env.framework.toolbox.resetScroll()
                    this.done()
                }
            }),
            TweenMax.staggerFromTo($frames , .6 , { y : viewport.height * .55 } , { y : viewport.height * -1, ease : Power4.easeInOut },.1)
        ],'-=.5')
        timeline.add([
            TweenLite.fromTo($fill , 1 , { y : '0%' } , { y : '100%' , ease : Power4.easeInOut })
        ],'-=.4')
        if(typeof tweenIn != "undefined")
        {
            timeline.add(tweenIn,'-=.5')
        }
        function complete()
        {
            TweenLite.set(self.newContainer, { clearProps: 'all' });
        }

        setTimeout(()=>{
            timeline.restart()
        },500)
    }
    ,
    tweenAboutIn: function(_this)
    {
        const self = _this
        const $ref = self.newContainer
        let splitText = new SlipText($ref.querySelector('.h2'), { type: "words" })
        let tweens = []

        tweens = [
            TweenMax.staggerFromTo(splitText.words , .3 , { autoAlpha : 0 } , { autoAlpha : 1 , ease: Cubic.easeInOut },.05),
            TweenLite.fromTo($ref.querySelector('.about__animation .mirror') , .5 , { y : 200 } , { y : 0 , ease: Back.easeOut }),
            TweenLite.fromTo($ref.querySelector('.about__animation .small-mirror') , .5 , { y : -200 } , { y : 0 , ease: Back.easeOut }),
            TweenLite.fromTo($ref.querySelectorAll('.jsTween--fade') , .3 , { autoAlpha : 0 } , { autoAlpha : 1 , ease: Cubic.easeOut }),
        ]

        return tweens
    }
    ,
    tweenAboutOut: function(_this)
    {
        const self = _this
        const $ref = self.oldContainer
        let tweens = []

        tweens = [
            TweenLite.fromTo($ref.querySelector('.about__animation .mirror') , .5 , { y : 0 } , { y : -200 , ease: Back.easeIn }),
            TweenLite.fromTo($ref.querySelector('.about__animation .small-mirror') , .5 , { y : 0 } , { y : 200 , ease: Back.easeIn }),
            TweenLite.fromTo($ref.querySelectorAll('.jsTween--fade') , .3 , { autoAlpha : 1 } , { autoAlpha : 0 , ease: Cubic.easeIn }),
            TweenLite.fromTo($ref.querySelector('.h2') , .5 , { autoAlpha : 1 } , { autoAlpha : 0 , ease: Cubic.easeIn }),
        ]

        return tweens
    }
    ,
    tweenDetailIn:function(_this)
    {
        const self = _this
        const $ref = self.newContainer
        let tweens = []

        tweens = [
            TweenLite.fromTo($ref.querySelector('.detail__video .visual-context') , .8 , { y : 150 } , { y : 0 , ease: Power4.easeOut }),
            TweenLite.fromTo($ref.querySelector('.detail__video .visual-context .btn-play') , .5 , { autoAlpha : 0 } , { autoAlpha : 1 , delay : .1 , ease: Cubic.easeOut }),
        ]

        return tweens
    }
    ,
    tweenDetailOut:function(_this)
    {
        const self = _this
        const $ref = self.oldContainer
        let tweens = []

        tweens = [
            TweenLite.fromTo($ref.querySelector('.detail__video .visual-context') , .8 , { y : 0 } , { y : -150 , ease: Power4.easeIn }),
            TweenLite.to($ref.querySelector('.detail__video .visual-context .btn-play') , .5 , { autoAlpha : 0 , ease: Cubic.easeIn }),
        ]

        return tweens
    }
    ,
    tweenHomeIn: function(_this)
    {
        const self = _this
        const $ref = self.newContainer
        let tweens = []

        tweens = [
            TweenMax.staggerFromTo($ref.querySelectorAll('.jsCollectionShow--item') , .8 , { autoAlpha : 0 } , { autoAlpha : 1 , ease: Cubic.easeInOut },.1),
            TweenMax.staggerFromTo($ref.querySelectorAll('.jsCollectionShow--item .background') , .6 , { y : -50 } , { y : 0 , ease: Cubic.easeInOut },.1),
        ]

        return tweens
    }
    ,
    tweenHomeOut: function(_this)
    {
        const self = _this
        const $ref = self.oldContainer
        let tweens = []

        tweens = [
            TweenLite.fromTo($ref.querySelectorAll('.background') , .6 , { y : 0 } , { y : 500 , ease: Power4.easeIn }),
            TweenLite.fromTo($ref.querySelectorAll('.h1') , .4 , { y : 0 , autoAlpha : 1 } , { y : -500 , autoAlpha : .2 , ease: Power4.easeIn }),
            TweenLite.fromTo($ref.querySelectorAll('.jsTween--exitFade') , .3 , { autoAlpha : 1 } , { autoAlpha : 0 , ease: Cubic.easeIn }),
        ]

        return tweens
    }
})

export default MainTransitions;