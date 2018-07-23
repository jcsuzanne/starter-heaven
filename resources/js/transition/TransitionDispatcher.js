import Barba from 'barba.js'
import Env from '../base/env.js'
import Channels from '../base/channels.js'

let dispatcher = Barba.BaseTransition.extend({
    start: function()
    {
        const currentController = this.oldContainer.getAttribute('data-namespace')
        Promise
        .all([this.newContainerLoading, this.check()])
        .then(this.dispatchTransition.bind(this))
    },
    check : function()
    {
        const deferred = Barba.Utils.deferred();
        const statusMainTransition = Env.framework.MainTransition.getStatus()
        const statusMainnav = Env.framework.mainnav.getStatus()

        Env.$mainContent.style.height = `${this.oldContainer.clientHeight}px`
        this.oldContainer.style.width = `${this.oldContainer.clientWidth}px`
        // si menu ouvert et transition est active
        if(statusMainnav == true) {
            deferred.resolve();
        } else {
            Env.framework.MainTransition.in(
                null,
                ()=>{
                    deferred.resolve();
                }
            )
        }
        return deferred.promise;
    },
    dispatchTransition:function()
    {
        const self = this
        const currentController = this.oldContainer.getAttribute('data-namespace')
        const newController = this.newContainer.getAttribute('data-namespace')
        const statusMainTransition = Env.framework.MainTransition.getStatus()
        const statusMainnav = Env.framework.mainnav.getStatus()

        Env.$mainContent.removeAttribute('style')
        if(statusMainnav === true) {
            Env.framework.mainnav.close(
                ()=>{
                    this.globalTransitionStart()
                },
                ()=>{
                    this.globalTransitionComplete()
                }
            )
        }
        if(statusMainTransition === 'in') {
            Env.framework.MainTransition.out(
                ()=>{
                    this.globalTransitionStart()
                },
                ()=>{
                    this.globalTransitionComplete()
                }
            )
        }
    },
    globalTransitionStart:function()
    {
        Env.framework.toolbox.resetScroll()
        this.done()
    },
    globalTransitionComplete:function()
    {
        Channels.emit('statechange::finalize')
        TweenLite.set(this.newContainer, { clearProps: 'all' });
    },
})

export default dispatcher;