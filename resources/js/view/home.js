'use strict';
import Barba from 'barba.js';
import Env from '../base/env.js';
import Channels from '../base/channels'

let page

class Page
{
    constructor(view='')
    {
        this.view = view
        this.classView = 'currentView--home'
        // Launch Fn
        this.funcLaunch = this.intro.bind(this)
        if(Env.framework.UI.launcher.LAUNCHED == false) this.channels()
    }

    channels()
    {
        Channels.on('launcher::exit',this.funcLaunch)
    }

    destroy()
    {
        Channels.removeListener('launcher::exit', this.funcLaunch);
    }

    finalize()
    {
        setTimeout(() => {
            if(Env.isVisiting === true) {
                this.intro()
            }
        }, 200);
    }

    intro()
    {
        console.log('intro');
    }
}

page = Barba.BaseView.extend({
    namespace: 'home',
    node: undefined,
    onEnter: function() {
        this.node = new Page(this.container)
        Env.$html.classList.add(this.node.classView)
    },
    onEnterCompleted:function()
    {
        this.node.finalize()
    },
    onLeave: function()
    {
        this.node.destroy()
    },
    onLeaveCompleted: function()
    {
        if(this.container.getAttribute('data-namespace') != this.namespace)
        {
            Env.$html.classList.remove(this.node.classView)
        }
    }
});

export default page;