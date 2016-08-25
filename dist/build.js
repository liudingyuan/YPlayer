/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var YPlayer = function () {
		function YPlayer(option) {
			_classCallCheck(this, YPlayer);

			var defaultOpt = {
				el: document.querySelector('.ypalyer'),
				playIcon: './assets/imgs/play.svg',
				pauseIcon: './assets/imgs/pause.svg',
				loop: false,
				preload: 'metadata'
			};

			for (var key in defaultOpt) {
				if (defaultOpt.hasOwnProperty(key) && !option.hasOwnProperty(key)) {
					option[key] = defaultOpt[key];
				}
			}

			this.option = option;
			this.svg = {
				playIcon: '<svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M389.44 703.104 708.032 519.168 389.44 321.856ZM512 4.48c-280.576 0-508.032 227.456-508.032 508.032S231.36 1020.48 512 1020.48s508.032-227.456 508.032-508.032S792.576 4.48 512 4.48zM512 919.232c-224.704 0-406.72-182.08-406.72-406.72 0-224.64 182.08-406.72 406.72-406.72 224.64 0 406.784 182.08 406.784 406.72C918.72 737.216 736.64 919.232 512 919.232z" fill="#272636"></path></g></g></svg>'
			};
		}

		_createClass(YPlayer, [{
			key: 'init',
			value: function init() {
				var elHTML = '<div class="yplayer-container">\n\t\t                  <div class="ypalyer-button-wrap">\n                              <button class="ypalyer-button">' + this.svg.playIcon + '</button>\n\t\t                  </div>\n\t\t                  <div class="yplayer-mid">\n                              <div class="yplayer-info"></div>\n                              <div class="yplayer-bar">\n                                  <div class="yplayer-loaded"></div>\n                                  <div class="yplayer-played">\n                                      <span class="ypalyer-dot"></span>\n                                  </div>\n                              </div>\n\t\t                  </div>\n\t\t                  <div class="yplayer-item">\n                              <span class="ypalyer-time">00:00</span>\n                              <div class="yplayer-volume-wrap">\n                                  <button class="yplayer-volume-icon"></button>\n                                  <div class="yplayer-volume-bar">\n                                      <div class="yplayer-volume"></div>\n                                  </div>\n                              </div>\n                              <button class="ypalyer-loop"></button>\n\t\t                  </div>\n\t\t              </div>';

				this.option.el.innerHTML = elHTML;
			}
		}]);

		return YPlayer;
	}();

	var option = {
		el: document.querySelector('#app')
	};

	var app = new YPlayer(option);
	app.init();

/***/ }
/******/ ]);