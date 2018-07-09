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
    speed: 3
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
      target.attr('data-is-loaded', 'true');
      setPosition(0);

      $(window).resize(() => {
        setPosition($(window).scrollTop());
      });

      $(window).scroll(() => {
        setPosition($(window).scrollTop());
      });
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
     * Return height of background image
     *
     * @return {int}
     */
    function getBackGroundImageHeight() {
      if (objectFitSupported()) {
        return bgimage.outerWidth() / dummy.width * dummy.height;
      }
      return bgimage.outerHeight();
    }

    /**
     * Reset background image position
     *
     * @type {void}
     */
    function resetImagePosition() {
      if (objectFitSupported()) {
        bgimage.css('object-position', '');
      } else {
        bgimage.css('transform', '');
      }
    }

    /**
     * Set background image position
     *
     * @type {void}
     */
    function setImagePosition(scroll) {
      const offset        = target.offset().top;
      const parallax      = Math.round(((scroll - offset) / params.speed));
      const targetHeight  = bgimage.parent().outerHeight();
      const bgimageHeight = getBackGroundImageHeight();

      if (offset + targetHeight <= scroll + $(window).height()) {
        if ((bgimageHeight - targetHeight) / 2 <= Math.abs(parallax)) {
          return;
        }
      }

      if (objectFitSupported()) {
        bgimage.css('object-position', `50% calc(50% + ${parallax}px)`);
      } else {
        bgimage.css('transform', `translate3d(0, calc(-50% + ${parallax}px), 0)`);
      }
    }

    /**
     * Whether supported object-fit

     * @return {boolean}
     */
    function objectFitSupported() {
      if ('cover' === bgimage.css('object-fit')) {
        return true;
      }
      return false;
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
