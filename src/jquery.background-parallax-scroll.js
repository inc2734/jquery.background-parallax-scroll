/**
 * Name: jquery.background-parallax-scroll
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * @param { speed }
 */

'use strict';

;(($) => {
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
      }
      dummy.src = src;

      setPosition(0);

      $(window).resize(() => {
        setPosition($(window).scrollTop());
      });

      $(window).scroll(() => {
        setPosition($(window).scrollTop());
      });

      /**
       * Set background image position for parallax effect
       *
       * @param {int} scroll
       * @return {void}
       */
      function setPosition(scroll) {
        const offset   = target.offset().top;
        const parallax = Math.round(((scroll - offset) / params.speed));

        const transform = `translate3d(-50%, calc(-50% + ${parallax}px), 0)`;
        bgimage.css('transform', transform);
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
  }
})(jQuery);
