import Env from '../base/env'

export default class MainTransition
{
    constructor()
    {
        this.view = Env.$mainTransition
        this.settings = { easing : Power2.easeInOut , duration : 1 }
        this.direction = false
        this.status = false
        this.setDirection(-1)
    }

    getStatus()
    {
        return this.status
    }



    in(funcStart='',funcComplete='')
    {
        let timeline = new TimelineLite({
            onStart:()=>{
                this.status = 'animating'
                if(typeof funcStart == 'function' || funcStart != null) funcStart()
            },
            onComplete:()=>{
                this.status = 'in'
                if(typeof funcComplete == 'function' || funcComplete != null) funcComplete()
            }
        })

        timeline.add([
            TweenLite.fromTo(Env.$mainTransitionProgress , 1, { scaleX : 0 , transformOrigin : 'left center' } , { scaleX : 1 , ease : Power3.easeInOut }),
            TweenMax.fromTo(this.view , this.settings.duration,
                {
                    autoAlpha : 0
                },
                {
                    autoAlpha : 1,
                    ease: this.settings.easing,
                    delay: 0,
                }
            )
        ])
    }

    out(funcStart='',funcComplete='')
    {
        let timeline = new TimelineLite({
            onStart:()=>{
                this.status = 'animating'
                if(typeof funcStart == 'function' || funcStart != null) funcStart()
            },
            onComplete:()=>{
                this.status = 'out'
                if(typeof funcComplete == 'function' || funcComplete != null) funcComplete()
            }
        })
        const goTo = (this.direction > 0)?'100%':'-100%'

        timeline.add([
            TweenLite.fromTo(Env.$mainTransitionProgress , 1 , { transformOrigin : 'right center' } , { scaleX : 0 , ease : Power3.easeInOut }),
            TweenMax.fromTo(this.view , 1,
                {
                    autoAlpha : 1
                },
                {
                    autoAlpha : 0,
                    ease: this.settings.easing,
                    delay: 0,
                }
            )
        ])
    }

    setDirection(value)
    {
        this.direction = value
    }
}