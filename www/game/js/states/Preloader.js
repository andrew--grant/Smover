Main.Preloader = function (game) {
    this.game = game;
};

Main.fontsReady = false;

Main.Preloader.prototype = {
    preload: function () {


    },

    create: function () {
        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
        this.start();
    },

    start: function () {
        this.game.load.image(Main.Config.sprites.playerDisc.key, Main.Config.sprites.playerDisc.path);
        //this.game.load.image('block', 'http://localhost:8888/');
        this.game.load.image(Main.Config.sprites.disc.key, Main.Config.sprites.disc.path);
        this.game.load.image(Main.Config.sprites.grid.key, Main.Config.sprites.grid.path);
        this.game.load.image(Main.Config.sprites.trail.key, Main.Config.sprites.trail.path);
        this.game.load.image(Main.Config.sprites.emitBlack.key, Main.Config.sprites.emitBlack.path);
        this.game.load.image(Main.Config.sprites.emitWhite.key, Main.Config.sprites.emitWhite.path);
        this.game.load.spritesheet(Main.Config.sprites.collect.key, Main.Config.sprites.collect.path, 120, 120);
        this.game.load.script('webfont', 'lib/webfontloader.js');
        WebFontConfig = {
            custom: {
                families: ['Revalia'],
                urls: ['game/assets/fonts.css']
            },
            active: function () {
                Main.fontsReady = true;
            }
        };
        this.game.load.start();
    },

    loadStart: function () {
        console.log("loadStart");
    },

    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles + " status is " + success);
    },

    loadComplete: function () {
        console.log("progress: " + this.game.load.progress);
        // wait for for fonts to be active
        // (the loader loads the script only)
        game.time.events.loop(500, function () {
            console.log("Main.fontsReady = " + Main.fontsReady);
            if (true) {// todo: put back Main.fontsReady
                this.state.start('menu');
            }
        }, this);


    }
};

var device = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        device.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('Received Event -> ' + id);
    }
};
device.initialize();

Main.device = device;
