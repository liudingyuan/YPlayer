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
        setFeedback: function (audioObj, loadedBar, progressBtn) {
            
            audioObj.addEventListener('progress', function () {
                var bufferedEnd = audioObj.buffered.end(audioObj.buffered.length - 1),
                    duration = audioObj.duration;
                loadedBar.style.width = bufferedEnd / duration * 100 + '%';
            }, false);

            audioObj.addEventListener('timeupdate', function () {
                var duration = audioObj.duration;
                progressBtn.style.left = audioObj.currentTime / duration * 100 + '%';
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
        },

        //进度条点击控制跳跃播放
        playedBarContro: function (e, audioObj, playedBarObj) {
            
            if (e.target.className !== 'yplayer-played') {
                var clickX = e.offsetX,
                duration = audioObj.duration,
                present = clickX / playedBarObj.clientWidth;

                audioObj.currentTime = duration * present;
            }  
        },

        //进度条按钮拖放控制
        dragThumb: function (audioObj, progressBtn, playedBarObj) {
            var canMove = false,
                audio = audioObj;
                // console.log(audio);
            
            progressBtn.addEventListener('mousedown', function () {
                // console.log('mousedown');
                canMove = true;
            });
            progressBtn.addEventListener('mousemove', function (e) {
                
                if (canMove === true) {
                    var currentX = parseFloat(e.target.style.left),
                        difX = (e.offsetX - e.target.clientWidth / 2) / playedBarObj.clientWidth * 100,
                        changeX = currentX + difX,
                        duration = audio.duration;

                    changeX = changeX < 0 ? -changeX : changeX;
                    e.target.style.left = changeX + '%';
                    
                    var currentTime = changeX / 100 * duration; 
                    audioObj.currentTime = currentTime;
                    // console.log(currentTime);

                }
            });
            progressBtn.addEventListener('mouseup', function () {
                // console.log('mouseup');
                canMove = false;
            });
            progressBtn.addEventListener('mouseleave', function () {
                canMove = false;
            });
        }
    };

	this.init = function () {
		var viewHtml = '<div class="yplayer-container">' +
                            '<div class="yplayBtn">' +
        	                     '<img src="' + setting.playIcon + '" width="100%"></img>' +
                            '</div>' +
                            '<div class="yplayer-bar">' +
                                 '<div class="yplayer-loaded" style="width: 0;"></div>' +
                                 '<div class="yplayer-played" style="left: 0%;"><span class="yplayer-thumb"></span></div>' +   
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
            playedBar = tool.$('.yplayer-bar'),
            loadedBar = tool.$('.yplayer-loaded'),
            progressBtn = tool.$('.yplayer-played');

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

        // methods.initPreload(audio, config, playBtn);
        audio.preload = config.preload

        playedBar.addEventListener('click', function (e) {methods.playedBarContro(e, audio, playedBar);});
        methods.dragThumb(audio, progressBtn, playedBar);

        audio.onloadedmetadata = function () {
            methods.formatTime(audio.duration, allTimeText);
            methods.setCurrTime(audio, currTimeText);
            methods.setFeedback(audio, loadedBar, progressBtn);
            
        };
	};
}

var app = new YPlayer(config);
app.init();