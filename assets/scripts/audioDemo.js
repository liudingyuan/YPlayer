var devWidth = document.documentElement.clientWidth;
if ( devWidth > 640 ){ devWidth = 640;}
document.documentElement.style.fontSize = devWidth / (750 / 100) + 'px';

var config = {
	el: document.querySelector('#player'),
    preload: 'metadata',                       //加载方式：包含原生属性none,metadata,auto和click点击播放按钮开始加载
	music: {
		url: './song.mp3'
        // url: 'http://7xsthh.com1.z0.glb.clouddn.com/song.mp3'
	}
};

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
        tap: function (element, fn, args) {
            var startTx,startTy;
            element.addEventListener('touchstart', function (e) {
                var touches = e.touches[0];
                startTx = touches.clientX;
                startTy = touches.clientY;
            }, false);

            element.addEventListener('touchend', function (e) {
                var touches = e.changedTouches[0],
                    endTx = touches.clientX,
                    endTy = touches.clientY;

                if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
                    fn(e, args);
                }
            }, false);
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
                var bufferedEnd = audioObj.buffered.end(audioObj.buffered.length - 1),
                    duration = audioObj.duration;

                loadedBar.style.width = bufferedEnd / duration * 100 + '%';
                console.log(bufferedEnd);
            }, false);
                

            audioObj.addEventListener('timeupdate', function () {
                var duration = audioObj.duration,
                    currentX = audioObj.currentTime / duration * 100;

                currentX = tool.limitX(currentX);
                progressBtn.style.left = currentX + '%';
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
            console.log(e);
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
                        // console.dir(e.touches[0]);
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
                                 '<div class="yplayer-loaded" style="width: 0;"></div>' +
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

        audio.preload = config.preload

        audio.onloadedmetadata = function () {
            methods.formatTime(audio.duration, allTimeText);
            methods.setCurrTime(audio, currTimeText);
            methods.setFeedback(audio, loadedBar, progressBtn);
            playedBar.addEventListener('click', function (e) {methods.playedBarContro(e, audio, playedBar);});
            methods.dragBar(audio, playedBar, progressBtn);
        };
	};
}

var app = new YPlayer(config);
app.init();