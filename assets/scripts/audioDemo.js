function YPlayer(config) {
    var setting = {
    	isplay: false,
    	playIcon: './assets/imgs/play.svg',
    	pauseIcon: './assets/imgs/pause.svg',
        isMobile: false
    },
    tool = {
    	$: function (selector, context) {
    		var o = context || document;
    		return o.querySelector(selector);
    	},

        //获取元素绝对位置的横坐标
        getElementLeft: function (element) {
            var actualLeft = element.offsetLeft,
                current = element.offsetParent;

            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        },

        //限制拖动按钮移动界限0-100
        limitX: function (number) {
            var num = number;

            if (num < 0) {num = 0;}
            else if (num > 100) {num = 100;}

            return num;
        },

        //判断是移动端还是PC端
        isMobile: function () {
            return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
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
                var percentage = this.buffered.length ? this.buffered.end(this.buffered.length - 1) / this.duration : 0;
                loadedBar.style.width = percentage * 100 + '%';
                document.querySelector('#test').innerHTML = percentage;
            }, false);

            audioObj.addEventListener('timeupdate', function () {
                var duration = audioObj.duration,
                    currentX = audioObj.currentTime / duration * 100;
                progressBtn.style.left = currentX + '%';
            }, false);     
        },

        //进度条点击控制跳跃播放
        playedBarContro: function (e, audioObj, playedBarObj) {

            if (e.target.className.indexOf('yplayer-played') === -1) {
                var clickX = e.offsetX,
                duration = audioObj.duration,
                present = clickX / playedBarObj.clientWidth;

                audioObj.currentTime = duration * present;
            }  
        },

        //进度条按钮拖放控制
        dragBar: function (audioObj, playedBarObj, progressBtn) {
            var audio = audioObj,
                diffX = 0,
                dragging = null;
            if (setting.isMobile) {
                progressBtn.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    if (e.target.className.indexOf('draggable') > -1) {
                        dragging = e.target;
                        diffX = tool.getElementLeft(playedBarObj);
                    }
                    
                }, false);
                progressBtn.addEventListener('touchmove', function (e) {
                    if (dragging !== null) {
                        var actualX = e.touches[0].clientX - diffX,
                            percent = actualX / playedBarObj.clientWidth * 100;
                        
                        percent = tool.limitX(percent);
                        dragging.style.left = percent + '%';
                        audio.currentTime = percent / 100 * audio.duration;
                    }
                }, false);
                progressBtn.addEventListener('touchend', function (e) {
                   dragging = null;
                }, false);
            }
            else {
                document.addEventListener('mousedown', function (e) {
                    if (e.target.className.indexOf('draggable') > -1) {
                        dragging = e.target;
                        diffX = tool.getElementLeft(playedBarObj) + e.offsetX;
                    }
                }, false);
                document.addEventListener('mousemove', function (e) {
                    
                    if (dragging !== null) {
                        var actualX = e.clientX - diffX,
                            percent = actualX / playedBarObj.clientWidth * 100;

                        percent = tool.limitX(percent);
                        dragging.style.left = percent + '%';
                        audio.currentTime = percent / 100 * audio.duration;

                    }
                }, false);
                document.addEventListener('mouseup', function () {
                    dragging = null;
                }, false)
            }
        }
    };

	this.init = function () {
		var viewHtml = '<div class="yplayer-container">' +
                            '<div class="yplayBtn">' +
        	                     '<img src="' + setting.playIcon + '" width="100%"></img>' +
                            '</div>' +
                            '<div class="yplayer-bar">' +
                                 '<div class="yplayer-loaded" style="width: 0%;"></div>' +
                                 '<div class="yplayer-played draggable" style="left: 0%;"><span class="yplayer-thumb"></span></div>' +   
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

        setting.isMobile = tool.isMobile();

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

        audio.preload = config.preload;

        audio.addEventListener('durationchange', function () {methods.formatTime(audio.duration, allTimeText);}, false)
        
        methods.setCurrTime(audio, currTimeText);
        methods.setFeedback(audio, loadedBar, progressBtn);
        playedBar.addEventListener('click', function (e) {methods.playedBarContro(e, audio, playedBar);});
        methods.dragBar(audio, playedBar, progressBtn);


        audio.addEventListener('waiting', function () {
            progressBtn.className += ' loaded';
        }, false)

        audio.addEventListener('canplay', function () {
            progressBtn.className = 'yplayer-played draggable';
            console.log('canplay');
        }, false)

	};
}
