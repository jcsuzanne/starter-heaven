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
            Channels.emit('statechange::before')
        });
        Barba.Dispatcher.on('newPageReady', function() {
            Channels.emit('statechange::ready')
        });
    }
}

export default OuterHeaven;