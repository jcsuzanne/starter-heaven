import Barba from 'barba.js';
import Channels from '../base/channels.js';
import MainTransitions from '../modules/transitions.js';

class OuterHeaven
{
    constructor()
    {
        Barba.Pjax.cacheEnabled = true
        Barba.Prefetch.init();
        Barba.Pjax.getTransition = function()
        {
            return MainTransitions
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