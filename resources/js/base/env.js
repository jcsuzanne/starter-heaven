'use strict';
import $ from 'jquery';

let env = {
    $window: $(window),
    $html: document.getElementsByTagName("html")[0],
    $mainContent: document.getElementById('barba-wrapper'),
    $body: document.body,
    $master: document.getElementById('master'),
    $mainNav: document.getElementById('main-nav'),
    framework: {},
    tablet: false,
    mobile: false,
    desktop: false,
    orientation: false,
    isVisiting: false,
    isOldie: false,
    isTouch:'ontouchstart' in window
}

export default env;