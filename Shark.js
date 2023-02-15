class Shark extends Phaser.GameObjects.Image {

    constructor(scene, x, y, scale, velocity, tweenX, tweenDuration){
        
        super(scene, x, y, "shark1");
        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setScale(scale);
        this.body.velocity.x = velocity;

        scene.tweens.add({
            targets: this,
            x: tweenX,
            ease: 'Linear',
            duration: tweenDuration,
            flipX: true,
            yoyo: true,
            repeat: -1
        });
    }
}