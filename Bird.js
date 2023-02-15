class Bird extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, scale, tweenX, tweenDuration){
        
        super(scene, x, y, "bird");
        scene.add.existing(this)
        this.setScale(scale);
        this.play("bird_anims")

        scene.tweens.add({
            targets: this,
            x: tweenX,
            ease: 'Linear',
            duration: tweenDuration,
            repeat: -1,
            onRepeat: function(){
                this.y = y
            },
            onRepeatScope: this
        });
    }
}