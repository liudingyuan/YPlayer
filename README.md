# YPlayer
a HTML5 music player

[DEMO](http://liudyuan.com/YPlayer/)

![aplayer](http://7xsthh.com1.z0.glb.clouddn.com/yplayer.png)

## Usage
HTML
    
    <div id="app" class="yplayer"></div>
    <script src="YPlayer.min.js"></script>

JS

    var option = {
    		el: document.querySelector('#app'),
    		music: {
    			name: 'perfect time',
    			author: '小林未郁/七つの大罪',
    			url: 'http://7xsthh.com1.z0.glb.clouddn.com/song.mp3',
    			pic: 'http://7xsthh.com1.z0.glb.clouddn.com/thumbnail.jpg'
    		}
    	};
    	var app = new YPlayer(option);
    	app.init();

Options

    var options = {
        el: document.querySelector('#app'),
        autoplay: false,
        loop: false,
        preload: 'metadata',
        music: {
            name: '',   //music name
            author: '', //music author
            url: '',    //music url
            pic: ''     //player background image
        }
    }

API

* app.init()  //initialize a application object
* app.play()  //play audio
* app.pause() //pause audio

Maybe you like

    var YPlayer = require('YPlayer');