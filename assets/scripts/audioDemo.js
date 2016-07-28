var config = {
	el: document.querySelector('#player'),
	music: {
		url: './song.mp3'
	}
};

function DPlayer(config) {
    var setting = {
    	isplay: false,
    	playIcon: './assets/imgs/play.svg',
    	pauseIcon: './assets/imgs/pause.svg'
    },
    tool = {
    	$: function (selector, context) {
    		var o = context || document;
    		return o.querySelector(selector);
    	}
    },
    methods = {
    	formatTime: function (audioObj, currTime, allTime) {
    		var duration = audioObj.duration,
                min = parseInt(duration / 60, 10),
    		    sec = parseInt(duration % 60, 10);
            allTime.innerHTML = min + ':' + sec;

            audioObj.addEventListener('timeupdate', function () {
               //
            }, false);
    	},
        setFeedback: function (audioObj, loadedBar, progressBar) {
            audioObj.addEventListener('progress', function () {
                var bufferedEnd = audioObj.buffered.end(audioObj.buffered.length - 1),
                    duration = audioObj.duration;
                loadedBar.style.width = bufferedEnd / duration * 100 + '%';
            }, false);

            audioObj.addEventListener('timeupdate', function () {
                var duration = audioObj.duration;
                progressBar.style.left = audioObj.currentTime / duration * 100 + '%';
            }, false);     
        }
    };

	this.init = function () {
		var viewHtml = '<div class="dplayer-container">' +
                            '<div class="dplayBtn">' +
        	                     '<img src="' + setting.playIcon + '" width="100%"></img>' +
                            '</div>' +
                            '<div class="dplayer-bar">' +
                                 '<div class="dplayer-loaded" style="width: 0;"></div>' +
                                 '<div class="dplayer-played"><span class="dplayer-thumb"></span></div>' +   
                            '</div>' +
                            '<div class="dplayer-time"><span class="dplayer-sTime">-00:00</span>&#47;<span class="dplayer-etime">00:00</span></div>' +
    	                    '<audio src="' + config.music.url + '"></audio>' +	
                            '</div>';
        config.el.innerHTML = viewHtml;

        var audio = tool.$('audio', setting.el),
            playBtn = tool.$('.dplayBtn', setting.el),
            playIcon = tool.$('img', playBtn),
            currTimeText = tool.$('.dplayer-sTime'),
            allTimeText = tool.$('.dplayer-etime'),
            loadedBar = tool.$('.dplayer-loaded'),
            progressBar = tool.$('.dplayer-played');

        playBtn.onclick = function () {
        	setting.isplay = !setting.isplay;

        	if (setting.isplay) {
        		audio.play();
        		playIcon.src = setting.pauseIcon;
        	}
        	else {
        		audio.pause();
                playIcon.src = setting.playIcon;
        	}
        };

        audio.onloadedmetadata = function () {
            methods.formatTime(audio, allTimeText, currTimeText);
            methods.setFeedback(audio, loadedBar, progressBar);
        };
	};
}

var app = new DPlayer(config);
app.init();