import MobileDetect from 'mobile-detect';
import Env from './env.js';
import Channels from './channels.js';


class BrowserDetection
{
    constructor()
    {
        this.detect();
        this.orientation();
        Channels.on('window::smartresize',() => {
            this.detect();
            this.orientation();
        })
    }

    detect()
    {
        let
        md = new MobileDetect(window.navigator.userAgent)

        Env.desktop = false
        Env.mobile = !!md.mobile()
        Env.phone = !!md.phone()
        Env.tablet = !!md.tablet()
        Env.ios = (md.mobile() == 'iPhone' == true || md.tablet() == 'iPad' == true)?true:false

        if(Env.mobile == false) Env.desktop = true

        Env.ie11 = !!navigator.userAgent.match(/Trident\/7\./)
        if(Env.ie11 == true) Env.$html.classList.add('ie11')

        Env.edge = (window.navigator.userAgent.indexOf("Edge") > -1)?true:false

        Env.$html.classList.remove('desktop')
        Env.$html.classList.remove('tablet')
        Env.$html.classList.remove('mobile')
        if(Env.desktop == true)
        {
            Env.$html.classList.add('desktop')
        }
        if(Env.phone == true)
        {
            Env.$html.classList.add('mobile')
        }
        if(Env.tablet == true)
        {
            Env.$html.classList.add('tablet')
        }
    }

    orientation()
    {
        Env.$html.classList.remove('landscape')
        Env.$html.classList.remove('portrait')
        if(window.innerWidth > window.innerHeight)
        {
            Env.orientation = 'landscape'
        }
        else
        {
            Env.orientation = 'portrait'
        }
        Env.$html.classList.add(Env.orientation)
    }
}

export default BrowserDetection;