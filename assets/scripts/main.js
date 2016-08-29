require('../styles/yplayer.scss');

class YPlayer {
	constructor(option) {
		const defaultOpt = {
			el: document.querySelector('.ypalyer'),
			autoplay: false,
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
			play: '<svg width="32" height="32" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M389.44 703.104 708.032 519.168 389.44 321.856ZM512 4.48c-280.576 0-508.032 227.456-508.032 508.032S231.36 1020.48 512 1020.48s508.032-227.456 508.032-508.032S792.576 4.48 512 4.48zM512 919.232c-224.704 0-406.72-182.08-406.72-406.72 0-224.64 182.08-406.72 406.72-406.72 224.64 0 406.784 182.08 406.784 406.72C918.72 737.216 736.64 919.232 512 919.232z" fill="#ecf0f1"></path></g></g></svg>',
			pause: '<svg width="32" height="32" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M512 0c-282.784 0-512 229.216-512 512s229.216 512 512 512 512-229.216 512-512-229.216-512-512-512zM512 928c-229.76 0-416-186.24-416-416s186.24-416 416-416 416 186.24 416 416-186.24 416-416 416zM320 320l128 0 0 384-128 0zM576 320l128 0 0 384-128 0z" fill="#ecf0f1"></path></g></g></svg>',
			volume: '<svg width="16.03125" height="16" viewBox="0 0 16.03125 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M136.331732 368.846067 102.405546 368.846067C45.890408 368.846067 0 414.692059 0 471.245956L0 573.646177C0 630.221093 45.848525 676.046067 102.405546 676.046067L136.324458 676.046067C150.980668 698.503661 169.339644 717.883344 189.265625 730.337082L425.134375 877.755051C473.096553 907.731413 512 886.24374 512 829.743707L512 215.148426C512 158.645171 473.108935 137.152982 425.134375 167.137082L189.265625 314.555051C169.345693 327.005009 150.98835 346.386577 136.331732 368.846067ZM878.287156 879.046642C1073.896387 680.192983 1074.198344 361.222145 879.193028 161.997643 869.802236 150.615366 855.588408 143.36 839.68 143.36 811.403021 143.36 788.48 166.283021 788.48 194.56 788.48 208.454701 794.01483 221.056673 803.000011 230.281439L802.851836 230.429614C962.810586 390.388364 962.810586 649.732739 802.851836 809.691489L802.907264 809.746917C794.748427 818.816627 789.783536 830.816896 789.783536 843.976778 789.783536 872.253756 812.706556 895.176778 840.983536 895.176778 854.143416 895.176778 866.143686 890.211886 875.213395 882.053048L875.25957 882.099224C875.668602 881.690192 876.076797 881.280641 876.484155 880.870571 877.100172 880.277674 877.701376 879.669494 878.287156 879.046642ZM715.72655 692.995397C813.096193 593.234435 812.729776 433.65676 714.627301 334.345997 705.257017 323.964646 691.694879 317.44 676.608828 317.44 648.331849 317.44 625.408828 340.363021 625.408828 368.64 625.408828 383.150235 631.444905 396.250669 641.143099 405.567345L641.091601 405.618843C701.076133 465.603374 701.076133 562.857515 641.091601 622.842046L641.323865 623.07431C631.071659 632.436975 624.64 645.912945 624.64 660.891108 624.64 689.168088 647.563021 712.091108 675.84 712.091108 691.96079 712.091108 706.341451 704.640727 715.72655 692.995397Z" fill="#a9b7b7"></path></g></g></svg>',
			muted: '<svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M705.422222 711.111111 824.888889 591.644444 944.355556 711.111111 1024 631.466667 904.533333 512 1024 392.533333 944.355556 312.888889 824.888889 432.355556 705.422222 312.888889 625.777778 392.533333 745.244444 512 625.777778 631.466667ZM215.36508 341.800191 40.634921 341.800191C16.253968 341.800191 0 358.912726 0 384.581531L0 641.269572C0 666.938374 16.253968 684.05091 40.634921 684.05091L215.36508 684.05091 446.984127 903.50889C475.428572 920.621426 512 903.50889 512 869.283817L512 156.567282C512 122.34221 475.428572 100.95154 446.984127 122.34221L215.36508 341.800191Z" fill="#a9b7b7"></path></g></g></svg>',
			loop: '<svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path class="yplayer-fill" d="M870.4 317.3c28.6 0 53 10 72.798 29.8 19.8 19.8 29.602 44 29.602 72.6l0 297c0 27.402-10 51.2-29.602 71.8-19.798 20.602-44 30.8-72.798 30.8L153.6 819.3c-27.4 0-51.2-10.2-71.6-30.8s-30.8-44.398-30.8-71.8l0-297c0-28.6 10.202-53 30.8-72.6 20.4-19.8 44.4-29.8 71.6-29.8l256 0 0-112.6 204.8 184.4-204.8 184.4 0-112.6L194.6 460.9l0 215 634.8 0L829.4 460.7l-153.6 0 0-143.4L870.4 317.3z" fill="#a9b7b7"></path></g></g></svg>'
		};
        
        //param second,return 00:00
		this.formatTime = (second) => {
			let min = parseInt(second / 60);
			let sec = parseInt(second % 60);
			min = min >= 10 ? min : '0' + min;
			sec = sec >= 10 ? sec : '0' + sec;

			return min + ':' + sec;
		};
	}

	init() {
		this.el = this.option.el;
		let elHTML = `<div class="yplayer-container">
		                  <div class="yplayer-button-wrap">
                              <button class="yplayer-button">${this.svg.play}</button>
		                  </div>
		                  <div class="yplayer-mid">
                              <div class="yplayer-info">
                                  <span class="yplayer-music-name">${this.option.music.name}</span>
                                  <span class="yplayer-music-author">${this.option.music.author}</span>
                              </div>
                              <div class="yplayer-bar-wrap">
                                  <div class="yplayer-bar">
                                      <div class="yplayer-loaded" style="width: 0;"></div>
                                      <div class="yplayer-played" style="width: 0;">
                                          <span class="yplayer-dot"></span>
                                      </div>
                                  </div>
                              </div>
		                  </div>
		                  <div class="yplayer-item">
                              <div class="yplayer-time-wrap"><span class="yplayer-ptime">00:00</span>/<span class="yplayer-alltime">00:00</span></div>
                              <div class="yplayer-volume-wrap">
                                  <button class="yplayer-volume-button">
                                      ${this.svg.volume}
                                  </button>
                                  <div class="yplayer-volume-bar-wrap">
                                      <div class="yplayer-volume-bar">
                                          <div class="yplayer-volume"></div>
                                      </div>
                                  </div>
                              </div>
                              <button class="yplayer-loop-button" title="循环">
                                  ${this.svg.loop}
                              </button>
		                  </div>
		              </div>`;

		this.el.innerHTML = elHTML;
		this.setMusic();
        
        //play and pause
		this.button = this.el.querySelector('.yplayer-button');
		this.button.addEventListener('click', () => {
            if (this.audio.paused) {
            	this.play();
            }
            else {
            	this.pause();
            }
		}, false);

		//operation progress bar
		const progressBar = this.el.querySelector('.yplayer-bar');
		const playedBar = this.el.querySelector('.yplayer-played');
		const progressBarWidth = progressBar.clientWidth;
		let dragging = null;
		
		progressBar.addEventListener('click', (event) => {
			const e = event || window.event;
			const target = e.target || e.srcElement;
			const ratio = e.offsetX / progressBarWidth;
			
			if (!target.classList.contains('yplayer-dot')) {
                playedBar.style.width = ratio * 100 + '%';
                this.el.querySelector('.yplayer-ptime').innerHTML = this.formatTime(this.audio.duration * ratio);
                this.audio.currentTime = this.audio.duration * ratio;
			}
		}, false);
        
        const getElementLeft = (element) => {
            let actualLeft = element.offsetLeft;
            let current = element.offsetParent;

            while (current !== null) {
            	actualLeft += current.offsetLeft;
            	current = current.offsetParent;
            }

            return actualLeft;
        };
        
		const dotMove = (event) => {
			const e = event || window.event;
			
			if (dragging) {
				let ratio = (e.clientX - getElementLeft(progressBar)) / progressBarWidth;
			    ratio = ratio > 0 ? ratio : 0;
			    ratio = ratio < 1 ? ratio : 1;
			    playedBar.style.width = ratio * 100 + '%';
                this.el.querySelector('.yplayer-ptime').innerHTML = this.formatTime(this.audio.duration * ratio);
			}
		};
		const dotUp = () => {
			document.removeEventListener('mousemove', dotMove);
			document.removeEventListener('mouseup', dotUp);
			dragging = null;
			console.log(parseFloat(playedBar.style.width));
			this.audio.currentTime = parseFloat(playedBar.style.width) / 100 * this.audio.duration;
		};
        this.el.querySelector('.yplayer-dot').addEventListener('mousedown', () => {
            dragging = this.el.querySelector('.yplayer-played');
            document.addEventListener('mousemove', dotMove);
            document.addEventListener('mouseup', dotUp);
		}, false);

        //parse time display
		this.audio.addEventListener('loadedmetadata', () => {
			this.el.querySelector('.yplayer-alltime').innerHTML = this.formatTime(this.audio.duration);
		}, false);

		this.audio.addEventListener('timeupdate', () => {
			const duration = this.audio.duration;
			const currentTime = this.audio.currentTime;
			const percentage = currentTime / duration * 100 + '%';

			this.el.querySelector('.yplayer-ptime').innerHTML = this.formatTime(currentTime);
			this.el.querySelector('.yplayer-played').style.width = percentage;
		}, false);

		//contro volume
		this.volumeBtn = this.el.querySelector('.yplayer-volume-button');
		const volumeBar = this.el.querySelector('.yplayer-volume-bar');
		const volumeBarHeight = volumeBar.clientHeight;
		const volume = this.el.querySelector('.yplayer-volume');
		volume.style.height = this.audio.volume * 100 + '%';

		this.volumeBtn.addEventListener('click', () => {
			this.audio.muted = !this.audio.muted;
			this.volumeBtn.innerHTML = this.audio.muted ? this.svg.muted : this.svg.volume;
            volume.style.height = this.audio.muted ? 0 : this.audio.volume * 100 + '%';
		}, false);
		volumeBar.addEventListener('click', (event) => {
            const e = event || window.event;
            const ratio = e.offsetY / volumeBarHeight;
            volume.style.height = ratio * 100 + '%';
            this.audio.volume = ratio;
		}, false);

		//contro loop
		this.loopBtn = this.el.querySelector('.yplayer-loop-button');
		this.loopBtn.addEventListener('click', () => {
		    this.audio.loop = !this.audio.loop;
		    if (this.audio.loop) {
		    	this.loopBtn.classList.remove('yplayer-noloop');
		    }
		    else {
		    	this.loopBtn.classList.add('yplayer-noloop');
		    }
		}, false);
	}

	setMusic() {
		this.audio = document.createElement('audio');
		this.audio.src = this.option.music.url;
		this.audio.preload = this.option.preload;
		this.audio.autoplay = this.option.autoplay;
		this.audio.loop = this.option.loop;

		if (!this.audio.loop) {this.el.querySelector('.yplayer-loop-button').classList.add('yplayer-noloop');}

		this.el.querySelector('.yplayer-button-wrap').style.backgroundImage = `url(${this.option.music.pic})`;
        
        //loaded progress bar
		this.audio.addEventListener('progress', () => {
			const ratio =this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0;
			this.el.querySelector('.yplayer-loaded').style.width = ratio * 100 + '%';
		}, false);

		//audio ended
		this.audio.addEventListener('ended', () => {
			
			if (!this.audio.loop) {
				this.pause();
			    this.audio.currentTime = 0;
			}
		}, false);
	}

	play() {
		if (this.audio.paused) {
			this.button.innerHTML = this.svg.pause;
			this.audio.play();
		}
	}

	pause() {
		if (!this.audio.paused || this.audio.ended) {
			this.button.innerHTML = this.svg.play;
			this.audio.pause();
		}
	}
}

export {YPlayer};
