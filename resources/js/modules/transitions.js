import $ from 'jquery';
import Barba from 'barba.js';
import Env from '../base/env.js';
import TweenMax from '../vendor/gsap/TweenMax.js';
import Channels from '../base/channels.js';

let MainTransitions = Barba.BaseTransition.extend({
    start: function()
    {
        const currentController = this.oldContainer.getAttribute('data-namespace')
        Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.dispatchTransition.bind(this))
    },
    none: function()
    {
        const deferred = Barba.Utils.deferred();
        this.oldContainer.style.width = this.oldContainer.clientWidth + 'px'
        deferred.resolve();
    },
    fadeOut:function()
    {
        const deferred = Barba.Utils.deferred();
        const timeline = new TimelineLite({ onComplete : complete })
        const viewport  = Env.framework.toolbox.getViewport()

        this.oldContainer.style.width = this.oldContainer.clientWidth + 'px'
        timeline.kill()
        timeline.add([
            TweenLite.fromTo(Env.$mainTransition  , .6 , { autoAlpha : 0 } , { autoAlpha : 1 }),
        ])

        function complete()
        {
             deferred.resolve();
        }
        return deferred.promise;
    },
    dispatchTransition:function()
    {
        const self = this
        const currentController = this.oldContainer.getAttribute('data-namespace')
        const newController = this.newContainer.getAttribute('data-namespace')
        const timeline = new TimelineLite({ onComplete : complete , paused: true })
        const viewport  = Env.framework.toolbox.getViewport()
        let tweenIn, tweenOut = undefined;

        timeline.kill()
        timeline.add([
            TweenLite.fromTo(Env.$mainTransition , .6 , { autoAlpha : 1 } , { autoAlpha : 0 , onStart:() =>{
                    Env.framework.toolbox.resetScroll()
                    this.done()
                }
            }),
        ])
        function complete()
        {
            Channels.emit('statechange::finalize');
            TweenLite.set(self.newContainer, { clearProps: 'all' });
        }
        setTimeout(()=>{
            timeline.restart()
        },500)
    }
})

export default MainTransitions;