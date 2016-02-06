'use strict';

/**
 *
 * Main Application
 *
 **/

function App_skippy() {
  if (App_skippy.instance !== undefined) {
    return App_skippy.instance;
  } else {
    App_skippy.instance = this;
  }
  LTApp.call(this);
  return App_skippy.instance;
}
App_skippy.prototype = new LTApp();
App_skippy.fn = App_skippy.prototype;

/**
 *
 * Singleton thing
 *
 **/
App_skippy.getInstance = function() {
  if (App_skippy.instance === undefined) {
    new App_skippy();
  }
  return App_skippy.instance;
}

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_skippy.fn.init = function() {
  if (!this.INITED) {
    this.INITED = true;

    /**
     * Add the images url you want to preload in the empty array on the first parameter
     */
    this.preload([], this.display.bind(this));

    this.zoomIn = {
      scaleX: 1,
      scaleY: 1,
      ease: Power1.easeOut
    };
    this.opacityIn = {
      opacity: 1
    };
    this.heightIn = {
      height: 23
    };
    this.displayBlock = {
      display: 'block'
    };
    this.zoomOut = {
      scaleX: 0,
      scaleY: 0,
      ease: Power1.easeOut
    };
    this.opacityOut = {
      opacity: 0
    };
  }
};

/**
 *
 * shows everything, start animating
 *
 **/
App_skippy.fn.display = function() {
  this.steps = $('.step');
  this.goTo(1);
  $('body').removeClass('loading');
  $('body').addClass('loaded');
};

/**
 *
 * Display the given step
 *
 */
App_skippy.fn.goTo = function(stepNumber) {
  this.steps.each(function(i, el) {
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

/**
 *
 * Display the given step
 *
 */
App_skippy.fn.goToAndWait = function(stepNumber, seconds) {
  this.steps.each(function(i, el) {
    var $el = $(el);
    var $old;

    if ($el.data('order') == stepNumber) {
      $old = $('.step-active');
      $el.addClass('step-active');

      setTimeout(function() {
        $old.removeClass('step-active');
      }, seconds);
    }
  });

  if (this['step' + stepNumber]) {
    this['step' + stepNumber]();
  }
};


App_skippy.fn.step1 = function() {

  var tl            = new TimelineLite(),
      skippySP      = $('.skippy-small-product'),
      pretzel       = $('.pretzel'),
      cloud         = $('.cloud'),
      raysMain      = $('.rays-container'),
      rayOne        = $('.ray-1'),
      rayTwo        = $('.ray-2'),
      rayThree      = $('.ray-3'),
      rayFour       = $('.ray-4'),
      cloudTxt      = $('.cloud-txt'),
      cookie        = $('.cookie'),
      rainMain      = $('.cookie-rain'),
      cookieOne     = $('.cookie-1'),
      cookieTwo     = $('.cookie-2'),
      cookieThree   = $('.cookie-3'),
      cookieFour    = $('.cookie-4'),
      cookieFive    = $('.cookie-5'),
      cookieSix     = $('.cookie-6'),
      cookieSeven   = $('.cookie-7'),
      cookieFlippedOne = $('.cookie-flipped-1'),
      skippyBP      = $('.skippy-big-product'),
      skippyBPC     = $('.skippy-big-product__cap'),
      copyOne       = $('.txt-1'),
      copyTwo       = $('.txt-2'),
      logo          = $('.logo'),
      skippySmall   = $('.skippy-small'),
      cta           = $('#cta-arrow'),
      runShake   = true;

      window.tl = tl;

      function rays () {
        if (runShake) {

          var tween = new TimelineLite();
              tween.to(rayOne, 0.2, {x:-4, y: 4},'shake')
                   .to(rayOne, 0.2, {x: 7, y: -5},'shake+=0.2')
                   .to(rayOne, 0.2, {x:-5, y: -4},'shake+=0.4')

                   .to(rayTwo, 0.2, {x:-7, y: -2},'shake')
                   .to(rayTwo, 0.2, {x: 6, y: 8},'shake+=0.2')
                   .to(rayTwo, 0.2, {x:-4, y: 4},'shake+=0.4')

                   .to(rayThree, 0.2, {x:-1, y: 6},'shake')
                   .to(rayThree, 0.2, {x: 3, y: -9},'shake+=0.2')
                   .to(rayThree, 0.2, {x:-3, y: -4},'shake+=0.4')

                   .to(rayFour, 0.2, {x:-4, y: 2},'shake')
                   .to(rayFour, 0.2, {x: 5, y: 5},'shake+=0.2')
                   .to(rayFour, 0.2, {x:-7, y: -4, onComplete: rays},'shake+=0.4');

        };
      }

      function shake () {
        if (runShake) {
          var tween = new TimelineLite();
              tween.to(cloud, 0.2, {x:-5, y: 5},'shake')
                   .to(cloud, 0.2, {x: 8, y: -6},'shake+=0.2')
                   .to(cloud, 0.2, {x:-9, y: -7},'shake+=0.4')
                   .to(cloud, 0.2, {x:3, y: 5},'shake+=0.6')
                   .to(cloud, 0.2, {x:-7, y: -9},'shake+=0.8')
                   .to(cloud, 0.2, {x:6, y: -5},'shake+=1')

                   .to(cloudTxt, 0.4, {x:-8, y: -3},'shake')
                   .to(cloudTxt, 0.4, {x: 7, y: 9},'shake+=0.2')
                   .to(cloudTxt, 0.4, {x:-7, y: 5,},'shake+=0.4')
                   .to(cloudTxt, 0.4, {x: 6, y: -9,},'shake+=0.6')
                   .to(cloudTxt, 0.4, {x:-5, y: 8,},'shake+=0.8')
                   .to(cloudTxt, 0.4, {x: 9, y: -5, onComplete: shake},'shake+=1')
        }
      }


      function intro () {
         tl.from(skippySP, 0.9 ,{x: -200},'intro')
              .to(skippySP, 0.3 ,{x: -20,},'intro+=1.5')
              .from(pretzel, 0.9 ,{x: 200},'intro')
              .to(pretzel, 0.3 ,{x: 20},'intro+=1.5')
              .to(skippySP, 0.4 ,{x: 295,ease: Elastic.easeOut, onComplete: rays},'intro+=2')
              .to(pretzel, 0.4 ,{x: -295,ease: Elastic.easeOut, onComplete: shake},'intro+=2')
              .to(skippySP, 0.3 ,{opacity: 0},'intro+=2.2')
              .to(pretzel, 0.3 ,{opacity: 0},'intro+=2.2')
              .from(cloud, 0.5 ,{opacity: 0, scale:0},'intro+=2')
              .from(cloudTxt, 0.5 ,{opacity: 0, scale:0},'intro+=2')
              .from(raysMain, 0.5 ,{opacity: 0, scale:0,},'intro+=2')
              .to(raysMain, 0 ,{onComplete: midFrame},'intro+=3.2');
      }

      intro();

      function midFrame() {

        runShake = false;

        tl.to(cloudTxt, 0.5 ,{opacity: 0, scale:0},'final+=0.5')
          .to([raysMain,cloud], 0.5 ,{opacity: 0, scale:0},'final+=0.5')
          .to(cookie, 0.5 ,{opacity: 1, scale:1},'final+=0.5')
          .to(cloud, 0.5 ,{scaleX: 1, scaleY:0.5},'final+=1.5')
          .to(cookie, 0.4 ,{x: -63.5},'final+=1.5')
          .to(cookieFlippedOne, 0.1,{opacity:1},'final+=1.5')
          .to(cookieFlippedOne, 0.4,{x: 57.5},'final+=1.5')
          .to([cookieFlippedOne,cookie], 0.4,{x:0, onComplete: finalFrame},'final+=2.5');


      }

      function finalFrame () {
        tl.to(cloud, 0.7,{opacity: 0, y: -200},'out+=0.5')
          .to([cookieFlippedOne,cookie], 0.7,{y:200},'out+=0.5')
          .from([skippyBP,skippyBPC], 0.4, {z:-100, y: 100},'pack-=0.5')
          .to([skippyBP,skippyBPC], 0.4, {opacity:1},'pack-=0.5')

          .to(cookieOne, 0.7,{y:90, rotationZ: 110},'rain')
          .to(cookieTwo, 0.7,{y:75, rotationZ: 115},'rain+=0.5')
          .to(cookieThree, 0.5,{y:85, rotationZ: 112},'rain+=0.9')
          .to(cookieFour, 0.7,{y:95, rotationZ: 115},'rain')
          .to(cookieFive, 0.5,{y:95, rotationZ: 180},'rain-=0.2')
          .to(cookieSix, 0.7,{y:90, rotationZ: 112},'rain+=0.4')
          .to(cookieSeven, 0.7,{y:80, rotationZ: 110},'rain')

          .to(rainMain, 0.5, {x:-9 ,y:-85 ,scale:0.63},'packOut+=0.9')
          .to(rainMain, 0.4, {y:-200 ,opacity:0},'packOut+=2')
          .to(skippySmall, 0.4, {x:45 ,opacity:1},'logoIntro')
          .to(logo, 0.4, {x:-161 ,opacity:1},'logoIntro')
          .to(copyOne, 0.4, {opacity:1},'copy')
          .to(copyOne, 0.4, {opacity:0},'copy+=2.5')
          .to(copyTwo, 0.4, {opacity:1},'finalF')
          .to(cta, 0.4, {opacity:1},'finalF')
          .to(legal, 0.4, {opacity:1},'finalF+=0.3');
      }

};

function initEB() {
  if (!EB.isInitialized()) {
    EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
  } else {
    startAd();
  }
}

function startAd() {
  addEventListeners();
}

function addEventListeners() {
  document.getElementById("cta-arrow").addEventListener("click", clickthrough);
}

function clickthrough() {
  EB.clickthrough();
}

window.addEventListener("load", initEB);
