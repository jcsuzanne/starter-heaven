
import Env from '../base/env.js';
import Channels from '../base/channels.js';
import 'scroll-restoration-polyfill';

class UI
{
    constructor()
    {
        history.scrollRestoration = 'manual';
        this.resetEnv();
    }

    resetEnv()
    {
        Channels.on('statechange::before',function()
        {

        })
        Channels.on('statechange::ready',(current,old,container)=>
        {
            // Env.$html.classList.remove('skin--isWhite')
            // Env.$html.classList.remove('skin--isDark')
            // Env.$mainNav.classList.remove('is--active');
            // Env.$html.classList.remove('mainnav--isOpened')
        })

    }

}

export default UI;