'use strict';
import Barba from 'barba.js';
import Env from '../base/env.js';

let page

class Home
{
    constructor(view='')
    {
        this.classView = 'currentView--home'
    }
}

page = Barba.BaseView.extend({
    namespace: 'home',
    node: undefined,
    onEnter: function() {
        this.node = new Home(this.container)
        Env.$html.classList.add(this.node.classView)
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