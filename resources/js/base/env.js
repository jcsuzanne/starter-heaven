'use strict';

let env = {
    $window: window,
    $html: document.getElementsByTagName("html")[0],
    $mainContent: document.getElementById('barba-wrapper'),
    $body: document.body,
    $master: document.getElementById('master'),
    $mainNav: document.getElementById('main-nav'),
    $mainTransition: document.getElementById('jsView--transition'),
    framework: {},
    tablet: false,
    mobile: false,
    phone: false,
    desktop: false,
    ios: false,
    ie11: false,
    edge:false,
    orientation: false,
    isVisiting: false,
    isOldie: false,
    isTouch:'ontouchstart' in window
}

export default env;