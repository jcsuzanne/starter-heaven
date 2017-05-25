'use strict';
import $ from 'jquery';
import Env from '../base/env.js';
import TweenMax from '../vendor/gsap/TweenMax.js';
import Draggable from '../vendor/gsap/Draggable.js';
import ThrowPropsPlugin from '../vendor/gsap/ThrowPropsPlugin.js';
import requestAnimFrame from '../vendor/raf.js';
import cancelRequestAnimFrame from '../vendor/stopraf.js';
import Waypoint from '../vendor/waypoints.js';
import InertiaClass from '../vendor/inertia.js';
import Toolbox from '../base/toolbox.js';
import Channels from '../base/channels.js';
require('jquery-mousewheel')($);

class CollectionShow
{
    constructor(_view=false)
    {
        if(_view == false) return false
        this.view = _view
        this.$instance = this.view.find('.jsCollectionShow--instance')
        this.$drag = this.view.find('.jsCollectionShow--moveable')
        this.$collection = this.$drag
        this.$items = this.view.find('.jsCollectionShow--item')
        this.$itemProgress = this.view.find('.jsCollectionShow--progressItem')
        this.$backgrounds = this.view.find('.jsCollectionShow--item .background')
        this.$visuals = this.view.find('.jsCollectionShow--item .background .visual')
        this.$textsDesc = this.view.find('.jsCollectionShow--item .features')
        this.$progressPointer = this.view.find('.jsCollectionShow--progressText')
        this.$progressValue = this.view.find('.jsCollectionShow--progressValue')
        this.$triggers = this.view.find('.jsCollectionShow--trigger')
        this.$waypoints = this.view.find('.jsJourney--waypoint')
        this.$listener = this.view.find('.jsJourney--listener')
        // Thumbnails
        this.$thumbnailContainer = this.view.find('.jsCollectionShow--thumbnailMoveable');
        this.$thumbnails = this.view.find('.jsCollectionShow--thumbnailItem');
        this.total = this.$items.length
        this.acceleration = 1
        this.snapPoints = []
        this.waypointsInstances =   []
        this.draggable = undefined;
        this.wheelEvent =  { action: Env.events.wheelCollection , durationEase : .35 , typeEase : Cubic.easeOut }
        this.locked = false;
        this.bounds = { minX : 0 , maxX : 0 , minY : 0 , maxY : 0 }
        this.centerItemLeft = 0;
        this.itemWidth = 0;
        this.getPosX = 0
        this.currentIndex = 0
        this.percentage = 0
        this.distanceScroll = 0
        this.newPos = 0
        this.scrollSpeed = 0
        this.scrollDirection = 1
        this.scrollListenerBoundY = 0
        this.dragXStart = 0
        this.fullWidthThumbnailContainer = 0
        this.inertiaControl = new InertiaClass()
        this.rafObj = undefined;
        this.toolbox = Env.framework.toolbox
        this.duration = { start : 0 , end : this.$progressValue.attr('data-end')*1 }
        this.dateObj = new Date(null)
        this.viewingThumbnail = false

    }

    init()
    {
        this.drag()
        this.events()
        if(typeof this.rafObj == "undefined") this.listen()
    }

    drag()
    {
        const self = this
        const viewport = this.toolbox.getViewport()
        const context = this.$items.eq(0).width() + 28
        const listenerScrollHeight = viewport.height * this.total
        this.itemWidth = context

        this.centerItemLeft = (viewport.width - this.itemWidth) / 2
        this.$items.each(i =>
        {

            const snap = context * i * -1

            self.snapPoints.push(snap)
            self.$waypoints.eq(i).css('height',viewport.height)
        })


        this.bounds.maxX = this.snapPoints[this.total - 1]
        this.bounds.maxY = 0

        this.$listener.find('.receptor').css({ 'height' : listenerScrollHeight })
        this.scrollListenerBoundY = listenerScrollHeight - viewport.height

        this.draggable = Draggable.create(
            self.$drag,
            {
                cursor: 'default',
                type:"x",
                edgeResistance:.9,
                dragResistance : .2,
                force3D : true,
                lockAxis : true,
                throwProps:true,
                maxDuration:1,
                throwResistance: 5000,
                dragClickables : true,
                snap: { x: self.snapPoints },
                bounds : {minX : 0 , maxX : self.snapPoints[self.total - 1] },
                onDragStart : function()
                {
                    self.dragXStart = this.x
                },
                onDrag : function()
                {
                    var distance = this.x - self.dragXStart
                    self.distanceScroll += Math.abs(distance) / 3
                    self.scrollDirection = distance * -1
                },
                onThrowComplete : function()
                {
                    self.locked = false
                }
            }
        );
        this.thumbnail()
        this.waypoint()
    }

    destroy()
    {
        cancelRequestAnimFrame(this.rafObj)
        this.destroyWaypoint();
    }

    destroyWaypoint()
    {
        $.each(this.waypointsInstances,function()
        {
            this.destroy();
        })
        this.waypointsInstances = []
    }

    events()
    {
        if(!Env.isTouch)
        {
            this.wheelOn();
        }

        this.$triggers.on('click',(event) =>
        {
            const $trigger = $(event.currentTarget)
            this.moveToValue($trigger)
        })

        Channels.on('window::smartresize',() =>
        {
            this.reset()
        })

        Channels.on('grid::mode::small',()=> {
            this.tweenSmallMode();
        })

        Channels.on('grid::mode::normal',()=> {
            this.tweenNormalMode();
        })
    }

    listen()
    {
        this.rafObj = requestAnimFrame(()=>
        {
            this.listen()
        })

        this.getPosX = this.$collection[0]._gsTransform.x
        this.percentage = this.getPosX / this.bounds.maxX
        this.$listener.scrollTop(this.percentage * this.scrollListenerBoundY)

        // FX SPEED
        this.newPos += (this.distanceScroll - this.newPos) / 20
        this.scrollSpeed = this.distanceScroll - this.newPos

        this.update()
        if(this.viewingThumbnail == false)
        {
            this.moveFx()
        }

        // TweenLite.set(self.$collection , { z : self.scrollSpeed * -1 })
        // console.log(Math.round(self.scrollSpeed));
    }

    moveFx()
    {
        const self = this

        this.$items.each(function(i) {

            var
            $ref = $(this)
            ,xRate = $ref.offset().left/self.centerItemLeft
            ,zeroRate = 1 - xRate
            ,xPosVisual = 50 * zeroRate
            ,xPosDesc = 10 * zeroRate

            TweenLite.set(self.$visuals.eq(i) , { x : xPosVisual })
            TweenLite.set(self.$textsDesc.eq(i) , { x : xPosDesc })
        })
    }

    moveTo(_value) {

        const self = this
        const newPostX = _value * this.acceleration
        const distanceToDo = newPostX + this.$collection[0]._gsTransform.x

        TweenLite.killTweensOf(this.$collection);

        // Startpoint
        if(distanceToDo > 0)
        {
            TweenLite.to( this.$collection , this.wheelEvent.durationEase , { x : 0 , ease : this.wheelEvent.typeEase , onComplete : function() {
                    self.locked = false;
                }
            });
        }
        // Endpoint
        else if(distanceToDo < this.bounds.maxX)
        {
            TweenLite.to( this.$collection , this.wheelEvent.durationEase , { x : this.bounds.maxX , ease : this.wheelEvent.typeEase , onComplete : function() {
                    self.locked = false;
                }
            });
        }
        else
        {
            TweenLite.to( this.$collection , this.wheelEvent.durationEase , { x:'+='+ (newPostX) , ease : this.wheelEvent.typeEase , onComplete : function() {
                    self.locked = false;
                }
            });
        }
    };

    moveToValue(_ref)
    {
        const $ref = _ref
        const pointToGo = this.snapPoints[$ref.attr('data-index')*1]

        TweenLite.killTweensOf(this.$collection);
        TweenLite.to( this.$collection , this.wheelEvent.durationEase , { x : pointToGo , ease : this.wheelEvent.typeEase });
    }

    reset()
    {
        this.draggable[0].kill()
        this.snapPoints = []
        this.fullWidthThumbnailContainer = 0
        TweenLite.set(this.$drag , { x : 0 })
        this.destroyWaypoint();
        this.drag();
    }

    thumbnail()
    {
        const self = this

        this.view.find('.jsCollectionShow--thumbnailItem').each(function()
        {
            self.fullWidthThumbnailContainer += $(this).width() + 28
        })
    }

    tweenSmallMode()
    {
        let timeline = new TimelineLite();
        const viewport = this.toolbox.getViewport();

        this.locked = true;
        if(this.percentage != 0)
        {
            const tweenRepos = this.tweenResetPosition();
            timeline.add([ tweenRepos ])
        }
        else
        {
            this.viewingThumbnail = true;
        }

        timeline.add([
            TweenLite.to(this.$items.find('.features') , .4 ,  { autoAlpha : 0 , ease : Cubic.easeOut }),
            TweenLite.to(this.view.find('.collection__progress') , .4 ,  { y : ((viewport.height - this.view.find('.collection__progress').height()) * -1) , ease : Cubic.easeInOut }),
            TweenLite.to(this.view.find('.collection__timeline'), .4 , { autoAlpha : 0 , ease: Cubic.easeInOut }),
            TweenMax.staggerTo(this.$items, .8 , { width : 60 , ease : Quart.easeInOut },.05)
        ])
        timeline.add([
            TweenLite.to(this.$items.find('.classification') , .4 ,  { autoAlpha : 0 , ease : Cubic.easeOut }),
            TweenMax.staggerFromTo(this.$thumbnails.find('.cache'), .7 , { x : '0%' } , { x : '100%' , ease : Power4.easeInOut },.05)
        ],'-=.4')
        timeline.call(()=>
        {
            this.locked = false
            this.reset()
        })
    }

    tweenNormalMode()
    {
        let timeline = new TimelineLite();
        const viewport = this.toolbox.getViewport();
        const refWidth = viewport.height - 26

        this.locked = true;
        if(this.percentage != 0)
        {
            const tweenRepos = this.tweenResetPosition();
            timeline.add([ tweenRepos ])
        }

        timeline.add([
            TweenMax.staggerFromTo(this.$thumbnails.find('.cache'), .7 , { x : '100%' } , { x : '0%' , ease : Power2.easeInOut },.1)
        ])
        timeline.add([
            TweenLite.to(this.view.find('.collection__progress') , .4 ,  { y : 0 , ease : Cubic.easeInOut }),
            TweenLite.to(this.$items.find('.classification') , .4 ,  { autoAlpha : 1 , ease : Cubic.easeOut }),
            TweenMax.staggerTo(this.$items, .8 , { width : refWidth , ease : Cubic.easeInOut },.1)
        ],'-=.4')
        timeline.add([
            TweenLite.to(this.$items.find('.features') , .4 ,  { autoAlpha : 1 , ease : Cubic.easeOut }),
        ],'-=1')
        timeline.call(()=>
        {
            this.$items.attr('style','');
            Env.$html.classList.remove('maintainGridView--small')
            this.reset()
        })
        timeline.add([
            TweenLite.to(this.view.find('.collection__timeline'), .4 , { autoAlpha : 1 , ease: Cubic.easeOut })
        ])
        timeline.call(()=>
        {
            this.locked = false
            this.viewingThumbnail = false;
        })
    }

    tweenResetPosition()
    {
        const startPoint = this.snapPoints[0]

        const tween = TweenLite.to( this.$collection , .6 , { x : startPoint , ease : Cubic.easeInOut , onComplete : ()=>
            {
                this.viewingThumbnail = true;
            }
        })

        return tween;
    }

    update()
    {
        const newPosX = this.percentage * 100
        const duration = Math.round(this.duration.end * this.percentage)
        const displayedTime = new Date(duration * 1000).toISOString().substr(11,8)
        const marginLeft = 222
        let thumbnailProgress = this.fullWidthThumbnailContainer - marginLeft
        thumbnailProgress = thumbnailProgress * this.percentage * -1

        this.$progressValue[0].innerHTML = displayedTime
        this.$progressPointer[0].style.transform = `translateX(${newPosX}%)`
        this.$thumbnailContainer[0].style.transform = `translateX(${thumbnailProgress}px)`
    }

    wheelOn()
    {
        const self = this

        this.$drag.mousewheel(function(_e) {
            var deltaY = _e.deltaY
            self.distanceScroll += Math.abs(deltaY)
            return false;
        });

        let wheel = function(e)
        {
            let delta
            if(typeof e.wheelDelta != "undefined")
            {
                delta = e.wheelDelta
            }
            else
            {
                delta = e.deltaY
            }
            self.inertiaControl.update(delta)
            self.wheelTask(e);
        }

        this.inertiaControl.addCallback(function(direction)
        {
            self.scrollDirection = direction * -1
        })
        this.view[0].addEventListener('wheel', wheel,true); // for Firefox
        this.view[0].addEventListener('mousewheel', wheel,true); // for everyone else
    };

    wheelTask(_e)
    {

        const directionX = (typeof _e.wheelDeltaX != "undefined")?_e.wheelDeltaX:_e.deltaX * -100
        const directionY = (typeof _e.wheelDeltaY != "undefined")?_e.wheelDeltaY:_e.deltaY * -100
        const checkY = Math.abs(directionY)
        const checkX = Math.abs(directionX)

        if(!this.locked)
        {
            this.locked = false;

            if(checkX >= checkY)
            {
                this.moveTo(directionX);
            }
            else
            {
                this.moveTo(directionY);
            }
        }
    };

    waypoint() {
        const self = this

        this.$waypoints.each(function(i)
        {

            const $ref = $(this)
            const waypoint = new Waypoint({
                element: $ref[0],
                handler: function(direction) {
                    let getIndex = this.element.getAttribute('data-index') * 1
                    if(direction == "up")
                    {
                        getIndex--
                    }

                    self.currentIndex = getIndex
                    self.$items.removeClass('is--active').eq(self.currentIndex).addClass('is--active')
                    self.$itemProgress.removeClass('is--active').eq(self.currentIndex).addClass('is--active')
                },
                context: self.$listener[0],
                offset: '50%'
            })
            self.waypointsInstances.push(waypoint)
        })
    };
}

export default CollectionShow;