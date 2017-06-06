'use strict';

// Main Application
function App_banner() {
    if (App_banner.instance !== undefined) {
        return App_banner.instance;
    } else {
        App_banner.instance = this;
    }
    LTApp.call(this);
    return App_banner.instance;
}
App_banner.prototype = new LTApp();
App_banner.fn = App_banner.prototype;

// Singleton thing
App_banner.getInstance = function () {
    if (App_banner.instance === undefined) {
        new App_banner();
    }
    return App_banner.instance;
}

//Initialize your app, surcharge with whatever needed
App_banner.fn.init = function () {
    if (!this.INITED) {
        this.INITED = true;

        // Add the images url you want to preload in the empty array on the first parameter
        this.preload([], this.display.bind(this));
    }
};

// Shows everything, start animating
App_banner.fn.display = function () {
    this.steps = $('.step');
    this.goTo(1);
    $('body').removeClass('loading');
    $('body').addClass('loaded');
};

// Display the given step
App_banner.fn.goTo = function (stepNumber) {
    this.steps.each(function (i, el) {
        var $el = $(el);

        if ($el.data('order') == stepNumber) {
            $('.step-active').removeClass('step-active');
            $el.addClass('step-active');
        }
    });

    if (this['step' + stepNumber]) {
        this['step' + stepNumber]();
    }
};

// Display the given step
App_banner.fn.goToAndWait = function (stepNumber, seconds) {
    this.steps.each(function (i, el) {
        var $el = $(el);
        var $old;

        if ($el.data('order') == stepNumber) {
            $old = $('.step-active');
            $el.addClass('step-active');

            setTimeout(function () {
                $oldç.removeClass('step-active');
            }, seconds);
        }
    });

    if (this['step' + stepNumber]) {
        this['step' + stepNumber]();
    }
};

// main function for animation
App_banner.fn.step1 = function() {
    // global variables
    var tl        = new TimelineLite();
        cArm1     = $('#cobalt-arm-1'),
        cArm2     = $('#cobalt-arm-2'),
        lowesLogo = $('#lowes-logo'),
        cLogo     = $('#cobalt-logo'),
        cpy1      = $('#cpy-1'),
        cpy2      = $('#cpy-2'),
        cpy3      = $('#cpy-3'),
        cpyComp   = $('#copy-comp');

    // debug animation from console
    window.tl = tl;
    // main animation
    tl.addLabel('intro')
      .to(cArm1, 0.5, {x:-149, ease: Back.easeOut.config(1)},'intro+=1')
      .to(cpy1, 0.2, {x:121},'intro+=1.8')
      .to(cArm2, 0.5, {x:-146, ease: Back.easeOut.config(1)},'intro+=2.6')
      .to(cpy2, 0.2, {x:121},'intro+=3.3')
      .addLabel('lastFrame')
      .to([cArm1,cArm2,cpy1,cpy2], 0.6,{x:300},'lastFrame+=1')
      .to([cpyComp,cLogo,cpy3], 0.8, {x:161},'lastFrame+=1.4');
};
