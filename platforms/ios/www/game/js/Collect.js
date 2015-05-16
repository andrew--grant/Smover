'use strict';

var Collect = function (x, y, collectManager) {
    Phaser.Sprite.call(this, collectManager.game, x, y, Main.Config.sprites.collect.key, 0);
    this.game = collectManager.game;
    this.collectManager = collectManager;
    this.playerDisc = collectManager.playerDisc;
    this.game.physics.arcade.enable(this);
    this.scale.setTo(0);
    this.game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('collectanim', [1, 2, 3, 4]);
    this.collectActions = new CollectActions(game);
};

Collect.prototype = Object.create(Phaser.Sprite.prototype);
Collect.prototype.constructor = Collect;

Collect.prototype.update = function (spriteRef, tweenProps) {
    var self = this;
    this.angle += 2;
    if (this.scale.x < 1) {
        this.scale.setTo(this.scale.x + .2, this.scale.y + .2);
    }
    this.game.physics.arcade.overlap(this, this.playerDisc, function () {
        self.collectActions.showPointsAndAnimate(1, self,self.collectManager, function () {
            self.playerDisc.score.updateScore(1);
        });

    });
};
