Main.Game = function (game) {
    this.game = game;
    this.stopped = false;
    var self = this;
    this.game.stop = function (disc, playerDisc) {
        if (!self.stopped) {
            self.stopped = true;
            var crash = new Crash(this.game, disc, playerDisc);
            crash.show();

        }
    };
};

Main.Game.prototype = {
    create: function () {

        console.log(Main.device);
        this.stopped = false;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        var bgGradient = new BackgroundGradient(this.game, "#0054a6", "#66ccff");
        bgGradient.add();
        this.grid = new Grid(this.game.stage.width / 2, this.game.stage.height / 2, this.game);
        this.grid.add();
        var score = new Score(this.game);
        var best = new Best(this.game);
        this.playerDisc = new PlayerDisc(this.game.stage.width / 2, this.game.stage.height / 2, this.game, score);
        this.discManager = new DiscManager(this.playerDisc, this.game);
        this.discLoop = new DiscLoop(this.game, this.discManager, score);
        this.discLoop.start();
        this.collectManager = new CollectManager(this.playerDisc, this.game);
        this.collectManager.start();
    }
};

