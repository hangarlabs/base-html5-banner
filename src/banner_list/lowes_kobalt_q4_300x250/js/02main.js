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
  IDsToVars();
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
  var tl  = new TimelineLite();

  // debug animation from console
  window.tl   = tl;

  // main animation
  tl.addLabel('intro')
    .to(cobalt_arm_1, 0.5, {y:-199, ease: Back.easeOut.config(1)},'intro+=1')
    .to(cpy_1, 0.2, {y:75},'intro+=1.8')
    .to(cobalt_arm_2, 0.5, {y:-189, ease: Back.easeOut.config(1)},'intro+=2.6')
    .to(cpy_2, 0.2, {y:75},'intro+=3.3')
    .addLabel('lastFrame')
    .to([cobalt_arm_1,cobalt_arm_2,cpy_1,cpy_2], 0.6,{y:300},'lastFrame+=1')
    .to([copy_comp,cobalt_logo,cpy_3], 0.8, {y:235},'lastFrame+=1.4');

    if (GSDevTools) {
        GSDevTools.create();
    }
};

//set ids in dom to global variables
function IDsToVars(){
  var allElements = document.getElementsByTagName("id");
  
  for (var q = 0; q<allElements.length; q++){
     var el = allElements[q];
     if (el.id){
      window[el.id]=document.getElementById(el.id);
    }
  }
};