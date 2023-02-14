class Game extends Phaser.Scene {

    constructor() {
        super("playGame")
    }

    create(){
        console.log("lol")

        this.scene.get("gameMenu")
    }
}