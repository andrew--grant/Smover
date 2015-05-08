'use strict';

var CollectActions = function (game) {
    Phaser.Text.call(this, game, 250, 400, "",
        {font: "55px Revalia", fill: "#fff200", align: "center"});
    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.game.add.existing(this);
    this.executingPopover = false;
};

CollectActions.prototype = Object.create(Phaser.Text.prototype);
CollectActions.prototype.constructor = CollectActions;

CollectActions.prototype.showPointsAndAnimate = function (pointsEarned, collectObj, callback) {
    this.text = "+" + pointsEarned;
    this.x = collectObj.x;
    this.y = collectObj.y -50;
    var self = this;
    if(!self.executingPopover ){
        self.executingPopover = true;
        collectObj.play('collectanim', 20, false, true);
        callback(pointsEarned);
        var tween =  this.game.add.tween(this)
            .to({y: this.y - 30}, 250, "Linear", false)
            .to({alpha: 0}, 350, "Linear", false).start();
        tween.onComplete.add(function () {
            self.executingPopover = false;
        });
    }
};
