import Barba from 'barba.js';
import Channels from '../base/channels.js';
import TransitionDispatcher from '../transition/TransitionDispatcher';

class OuterHeaven
{
    constructor()
    {
        if(config.BARBA_ENABLED * 1 === 0)
        {
            Barba.Pjax.preventCheck = function() {
                return false;
            };
        }
        Barba.Pjax.cacheEnabled = true
        Barba.Prefetch.init();
        Barba.Pjax.getTransition = function()
        {
            return TransitionDispatcher
        }
        Barba.Pjax.start();
        Barba.Dispatcher.on('linkClicked', function() {

        });
        Barba.Dispatcher.on('initStateChange',()=>
        {
            Channels.emit('statechange::before')
        })
        Barba.Dispatcher.on('newPageReady', function(current,old,container) {
            Channels.emit('statechange::ready',current,old,container)
        });
    }
}

export default OuterHeaven;