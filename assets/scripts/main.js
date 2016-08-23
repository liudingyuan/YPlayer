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
	}

	init() {
		let elHTML = `<div class="yplayer-container">
		                  <div class="ypalyer-button">
                              <img src="${{this.option.playIcon}}" alt="" class="ypalyer-playicon" width="100%"/>
		                  </div>
		                  <div class="yplayer-mid">
                              <div class="yplayer-info"></div>
                              <div class="yplayer-bar">
                                  <div class="yplayer-loaded"></div>
                                  <div class="yplayer-played">
                                      <span class="ypalyer-dot"></span>
                                  </div>
                              </div>
		                  </div>
		                  <div class="yplayer-item">
                              <span class="ypalyer-time">00:00</span>
                              <div class="yplayer-volume-wrap">
                                  <button class="yplayer-volume-icon"></button>
                                  <div class="yplayer-volume-bar">
                                      <div class="yplayer-volume"></div>
                                  </div>
                              </div>
                              <button class="ypalyer-loop"></button>
		                  </div>
		              </div>`;
	}
}