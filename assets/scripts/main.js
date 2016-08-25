require('../styles/yplayer.scss');

class YPlayer {
	constructor(option) {
		const defaultOpt = {
			el: document.querySelector('.ypalyer'),
			playIcon: './assets/imgs/play.svg',
			pauseIcon: './assets/imgs/pause.svg',
			loop: false,
			preload: 'metadata'
		};

		for (let key in defaultOpt) {
			if (defaultOpt.hasOwnProperty(key) && !option.hasOwnProperty(key)) {
				option[key] = defaultOpt[key];
			}
		}

		this.option = option;
		this.svg = {
			play: '<svg width="32" height="32" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M389.44 703.104 708.032 519.168 389.44 321.856ZM512 4.48c-280.576 0-508.032 227.456-508.032 508.032S231.36 1020.48 512 1020.48s508.032-227.456 508.032-508.032S792.576 4.48 512 4.48zM512 919.232c-224.704 0-406.72-182.08-406.72-406.72 0-224.64 182.08-406.72 406.72-406.72 224.64 0 406.784 182.08 406.784 406.72C918.72 737.216 736.64 919.232 512 919.232z" fill="#272636"></path></g></g></svg>',
			volume: '<svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M537.163099 178.203658 292.371884 355.596857 175.60446 355.596857c-14.896268 0-26.968212 12.07706-26.968212 26.969235l0 258.866792c0 14.892175 12.076036 26.969235 26.968212 26.969235l116.767424 0L537.163099 845.796342c17.831111 12.919241 42.794665 0.182149 42.794665-21.837354L579.957765 200.041012C579.957765 178.020486 554.99421 165.284417 537.163099 178.203658L537.163099 178.203658zM774.257006 503.919974M678.222789 443.989023c1.835811 1.835811 3.669576 5.505387 5.505387 7.339152 25.687032 36.69576 25.687032 88.071871 0 124.767632-1.835811 1.836835-1.835811 3.669576-3.669576 5.506411l-12.845563 12.842493c-11.008728 11.008728-27.520797 11.008728-36.69576 0-11.009751-11.009751-11.009751-27.520797 0-38.529525l5.505387-5.506411 0 0 0 0c20.181645-20.181645 20.181645-55.044664 0-75.226309l0 0-5.505387-5.505387c-11.009751-11.009751-11.009751-27.520797 0-38.530548 11.008728-11.008728 27.522844-11.008728 36.69576 0L678.222789 443.989023 678.222789 443.989023z" fill="#a9b7b7"></path></g></g></svg>',
			loop: '<svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M870.4 317.3c28.6 0 53 10 72.798 29.8 19.8 19.8 29.602 44 29.602 72.6l0 297c0 27.402-10 51.2-29.602 71.8-19.798 20.602-44 30.8-72.798 30.8L153.6 819.3c-27.4 0-51.2-10.2-71.6-30.8s-30.8-44.398-30.8-71.8l0-297c0-28.6 10.202-53 30.8-72.6 20.4-19.8 44.4-29.8 71.6-29.8l256 0 0-112.6 204.8 184.4-204.8 184.4 0-112.6L194.6 460.9l0 215 634.8 0L829.4 460.7l-153.6 0 0-143.4L870.4 317.3z" fill="#a9b7b7"></path></g></g></svg>'
		};
	}

	init() {
		let elHTML = `<div class="yplayer-container">
		                  <div class="yplayer-button-wrap">
                              <button class="yplayer-button">${this.svg.play}</button>
		                  </div>
		                  <div class="yplayer-mid">
                              <div class="yplayer-info"></div>
                              <div class="yplayer-bar-wrap">
                                  <div class="yplayer-bar">
                                      <div class="yplayer-loaded"></div>
                                      <div class="yplayer-played">
                                          <span class="yplayer-dot"></span>
                                      </div>
                                  </div>
                              </div>
		                  </div>
		                  <div class="yplayer-item">
                              <span class="yplayer-time">00:00/00:00</span>
                              <div class="yplayer-volume-wrap">
                                  <button class="yplayer-volume-button">
                                      ${this.svg.volume}
                                  </button>
                                  <div class="yplayer-volume-bar">
                                      <div class="yplayer-volume"></div>
                                  </div>
                              </div>
                              <button class="yplayer-loop-button">
                                  ${this.svg.loop}
                              </button>
		                  </div>
		              </div>`;

		this.option.el.innerHTML = elHTML;
	}
}

var option = {
	el: document.querySelector('#app')
};

var app = new YPlayer(option);
app.init();