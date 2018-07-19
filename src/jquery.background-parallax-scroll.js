/**
 * Name: jquery.background-parallax-scroll
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * @param { speed }
 */

'use strict';

import $ from 'jquery';

$.fn.backgroundParallaxScroll = function(params) {
  params = $.extend({
    speed: 5
  }, params);

  return this.each((i, e) => {
    const target  = $(e);
    const bgimage = target.children('.js-bg-parallax__bgimage').children('img');

    if (isMobile()) {
      target.attr('data-is-mobile', 'true');
      target.attr('data-is-loaded', 'true');
      return;
    }

    if (! bgimage.length) {
      target.attr('data-is-loaded', 'true');
      return;
    }

    const src = bgimage.attr('src');

    if (! src || ! src.match(/\.[^\.\/]+?$/)) {
      target.attr('data-is-loaded', 'true');
      return;
    }

    const dummy = new Image();
    dummy.onload = () => {
      setPosition(0);
      target.attr('data-is-loaded', 'true');

      let resizeTimer;
      window.addEventListener('resize', () => {
        if (resizeTimer !== false) {
          clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function () {
          setPosition(getScrollTop());
        }, 50);
      }, false);

      window.addEventListener('scroll', () => {
        setPosition(getScrollTop());
      }, false);
    }
    dummy.src = src;

    /**
     * Set background image position for parallax effect
     *
     * @param {int} scroll
     * @return {void}
     */
    function setPosition(scroll) {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        resetImagePosition();
      } else {
        setImagePosition(scroll);
      }
    }

    /**
     * Reset background image position
     *
     * @type {void}
     */
    function resetImagePosition() {
      bgimage.get(0).style.transform = '';
    }

    /**
     * Set background image position
     *
     * @type {void}
     */
    function setImagePosition(scroll) {
      const targetOffset  = target.offset().top;
      const targetHeight  = bgimage.parent().outerHeight();
      const bgimageOffset = bgimage.offset().top;
      const bgimageHeight = bgimage.outerHeight();
      const parallax      = Math.round((scroll - targetOffset + (($(window).height() - targetHeight) / 2)) / params.speed);

      // The target is under the window
      if (targetOffset - $(window).height() >= scroll) {
        return;
      }

      // The target is above the window
      if (targetOffset + targetHeight <= scroll) {
        return;
      }

      if ((bgimageHeight - targetHeight) / 2 <= Math.abs(parallax)) {
        return;
      }

      bgimage.get(0).style.transform = `translate3d(0, calc(-50% + ${parallax}px), 0)`;
    }

    /**
     * Return scrolled distance
     *
     * @return {int}
     */
    function getScrollTop() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }

    /**
     * Return true when mobile device
     *
     * @return {Boolean}
     */
    function isMobile() {
      const ua = navigator.userAgent;

      if (0 < ua.indexOf('iPhone') || 0 < ua.indexOf('iPod') || 0 < ua.indexOf('Android') && 0 < ua.indexOf('Mobile')) {
        return true;
      } else if (0 < ua.indexOf('iPad')) {
        return true;
      }

      return false;
    }
  });
};
