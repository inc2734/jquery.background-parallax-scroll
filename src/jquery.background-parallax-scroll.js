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

;(($) => {
  $.fn.backgroundParallaxScroll = function(params) {
    params = $.extend({
      speed: 3
    }, params);

    return this.each((i, e) => {
      const target = $(e);

      if (isMobile()) {
        target.attr('data-is-mobile', 'true');
        target.attr('data-is-loaded', 'true');
        return;
      }

      const urlRegex = /url\(['"]?(.*?)['"]?\)/g;
      const src      = target.css('background-image').replace(urlRegex, '$1');

      let bpy = 0;

      if (src.match(/\.[^\.\/]+?$/)) {
        const dummy = new Image();
        dummy.onload = () => {
          target.attr('data-is-loaded', 'true');
        }
        dummy.src = src;
      } else {
        target.attr('data-is-loaded', 'true');
      }

      init();
      setPosition(0);

      $(window).resize(() => {
        init();
        setPosition($(window).scrollTop());
      });

      $(window).scroll(() => {
        setPosition($(window).scrollTop());
      });

      /**
       * Set background image position
       *
       * @return {void}
       */
      function init() {
        target.css('background-position-y', '')
        bpy = target.css('background-position-y');
      }

      /**
       * Set background image position for parallax effect
       *
       * @param {int} scroll
       * @return {void}
       */
      function setPosition(scroll) {
        if ('fixed' !== target.css('background-attachment')) {
          return;
        }

        const offset   = target.offset().top;
        const parallax = ((scroll - offset) / params.speed);

        target.css('background-position-y', `calc(${bpy} - ${parallax}px)`);
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
