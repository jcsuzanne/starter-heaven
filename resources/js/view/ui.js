import $ from 'jquery';
import Env from '../base/env.js';
import Channels from '../base/channels.js';

class UI
{
    constructor()
    {
        this.resetEnv();
    }

    resetEnv()
    {
        Channels.on('statechange::before',function()
        {

        })

    }

}

export default UI;