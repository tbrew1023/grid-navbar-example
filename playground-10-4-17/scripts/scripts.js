/*
Developer: Trenton Brew
Date: 10/9/2017
*/

//-----------------------------global constants--------------------------------

var SCREEN_HEIGHT = window.innerHeight; //height of window
var CONTENT_TOP = 140; //position of content from top
var NAV_HEIGHT = 70; //height of navigation bar
var FADE_RATE = .0014; //rate at which banner fades during scroll
var SCROLL_LIM = (SCREEN_HEIGHT - 70);

//-----------------------------global variables--------------------------------

var selectText = $('.navbar-wrapper .selected').text();
var dimVal = 1;
var imgNum = 0;
var clearVal = 0;
var scrollq = [0,0];
var scrollLim = (SCREEN_HEIGHT - NAV_HEIGHT);

//------------------------------global arrays----------------------------------

//array of images for banner
var bannerImg = [
  'http://studentweb.cdm.depaul.edu/~tbrew/personal-projects/grid-nav/res/edited/fauzan-nafis-firdaus-155512.jpg',
  'http://studentweb.cdm.depaul.edu/~tbrew/personal-projects/grid-nav/res/edited/jumping.jpg',
  'res/plane4_faded.png',
  'res/plane5_faded_cut.png'
];

//--------------------------------functions------------------------------------

//----------sticky navbar function----------

function sticky_navbar(scroll) {
  if(scroll >= scrollLim) {
    $('.navbar-wrapper').css({
      'top':'0px',
      'position':'fixed',
      'box-shadow':'0px 1px 22px -3px rgba(0,0,0,0.5)',
      'transition':'box-shadow .3s',
      'background-color':'#FFFFFF'
    });
    $('.content-wrapper').css({
      'top':(scrollLim + CONTENT_TOP) + 'px'
    });
  }
  else {
    $('.navbar-wrapper').css({
      'position':'absolute',
      'box-shadow':'none',
      'top':scrollLim + 'px',
      'background-color':'rgba(0,0,0,0)' //<-- for fading colors
    });
  }
}

//----------scrolling down?----------

//returns true if scrolling down, and false if scrolling up
function scrollingDown() {
  if(scrollq[0] < scrollq[1]) {
    direction = 'down';
    return true;
  }
  else {
    return false;
  }
}

//----------scrolling up?----------

//returns true if scroling up, and false if scrolling down
function scrollingUp() {
  if(scrollq[0] > scrollq[1]) {
    direction = 'up';
    return true;
  }
  else {
    return false;
  }
}

//----------fade color function----------

//adjusts tint and transparency depending on scroll value
function fade_color(scroll) {
  if(scroll < SCROLL_LIM) {
    if(scrollingDown() || scrollingUp()) {
      dimVal = (1 - (scroll * .001));
    }
  }
  else {
    dimVal = 0.7;
  }

  if(scroll < SCROLL_LIM) {
    if(scrollingDown() || scrollingUp()) {
      clearVal = (scroll * FADE_RATE);
    }
  }
  else {
    clearVal = 1;
  }
}

//----------tint banner function----------

function tint_banner() {
  $('.banner').css({
    'background':'linear-gradient(rgba(255,255,255,' + clearVal + '),rgba(255,255,255,' + clearVal + ')),url(' + bannerImg[imgNum] + ')',
    'background-position':'center',
    'background-size':'125%',
    'background-repeat':'no-repeat',
    'background-attachment':'fixed'
  });
}

//----------------------------------events-------------------------------------

//----------window ready event----------

$(window).ready(function() {
  console.log('window is ready');

  //setting dynamic dimensions
  $('.navbar-wrapper').css({
    'top':scrollLim + 'px'
  });
  $('.content-wrapper').css({
    'top':(scrollLim + CONTENT_TOP) + 'px'
  });
  $('.banner').css({
    'height':(scrollLim + NAV_HEIGHT) + 'px'
  });

  if(selectText == "home") {
    imgNum = 0;
  }
  else if(selectText == "portfolio") {
    imgNum = 1;
  }
  else if(selectText == "resume") {
    imgNum = 2;
  }
  else {
    imgNum = 3;
  }

  console.log(SCREEN_HEIGHT);

});

//----------window scroll event----------

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var scrollTemp = scrollq[1];

    scrollq = [scrollTemp,scroll];

    sticky_navbar(scroll);
    fade_color(scroll);
    tint_banner();

});
