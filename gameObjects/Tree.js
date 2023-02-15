class Tree extends Phaser.GameObjects.Image {

    constructor(scene, x, y, key, scale,  tweenFrom, tweenTo, tweenDuration){
        super(scene, x, y, key);
        scene.add.existing(this)
        this.setScale(scale);

        scene.tweens.addCounter({
            from: tweenFrom,
            to: tweenTo,
            duration: tweenDuration,
            repeat: -1,
            onUpdate: function (tween)
            {

                scene.tree1.setAngle(tween.getValue());
            },
            yoyo: true,
            callbackScope: this
        });
    }
}