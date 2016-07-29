var devWidth = document.documentElement.clientWidth;
if ( devWidth > 640 ){ devWidth = 640;}
document.documentElement.style.fontSize = devWidth / (750 / 100) + 'px';

var config = {
	el: document.querySelector('#player'),
    preload: 'metadata',                       //加载方式：包含原生属性none,metadata,auto和click点击播放按钮开始加载
	music: {
		url: './song.mp3'
	}
};

function YPlayer(config) {
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

        //格式化时间 eg: 00:00
    	formatTime: function (time, target) {
            var min = parseInt(time / 60, 10),
    		    sec = parseInt(time % 60, 10);

            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            target.innerHTML = min + ':' + sec;
    	},

        //设置当前播放时间
        setCurrTime: function (audioObj, target) {
            audioObj.addEventListener('timeupdate', function () {
                methods.formatTime(audioObj.currentTime, target);
            }, false);
        },

        //设置进度条，包含加载进度条和播放进度
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
        },

        //初始化加载方式
        initPreload: function (audioObj, config, btnTarget) {
            if (config.preload !== 'click') {
                audioObj.preload = config.preload;
            }
            else {
                audioObj.preload = 'none';
                btnTarget.onclick = function () {audioObj.preload = 'auto'};
            }
        }
    };

	this.init = function () {
		var viewHtml = '<div class="yplayer-container">' +
                            '<div class="yplayBtn">' +
        	                     '<img src="' + setting.playIcon + '" width="100%"></img>' +
                            '</div>' +
                            '<div class="yplayer-bar">' +
                                 '<div class="yplayer-loaded" style="width: 0;"></div>' +
                                 '<div class="yplayer-played"><span class="yplayer-thumb"></span></div>' +   
                            '</div>' +
                            '<div class="yplayer-time"><span class="yplayer-sTime">00:00</span>&#47;<span class="yplayer-etime">00:00</span></div>' +
    	                    '<audio src="' + config.music.url + '"></audio>' +	
                            '</div>';
        config.el.innerHTML = viewHtml;

        var audio = tool.$('audio', setting.el),
            playBtn = tool.$('.yplayBtn', setting.el),
            playIcon = tool.$('img', playBtn),
            currTimeText = tool.$('.yplayer-sTime'),
            allTimeText = tool.$('.yplayer-etime'),
            loadedBar = tool.$('.yplayer-loaded'),
            progressBar = tool.$('.yplayer-played');

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

        methods.initPreload(audio, config, playBtn);

        audio.onloadedmetadata = function () {
            methods.formatTime(audio.duration, allTimeText);
            methods.setCurrTime(audio, currTimeText);
            methods.setFeedback(audio, loadedBar, progressBar);
        };
	};
}

var app = new YPlayer(config);
app.init();