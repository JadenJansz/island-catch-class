class Boot extends Phaser.Scene {
    
    constructor() {
        super("boot")
    }

    preload(){
        this.load.image("frame", "assets/frame_new.png");
        this.load.image("background", "assets/Background.png");
        this.load.image("sky", "assets/sky.png");
        this.load.image("land", "assets/land.png");
        this.load.spritesheet("helicopter", "assets/spritesheet.png",{
            frameWidth: 399,
            frameHeight: 150
        });
        this.load.spritesheet("splash", "assets/splash.png",{
            frameWidth: 200,
            frameHeight: 170
        })
        this.load.spritesheet("bird", "assets/bird.png",{
            frameWidth: 190,
            frameHeight: 135
        })
        this.load.spritesheet("boatS", "assets/waves.png",{
            frameWidth: 1600,
            frameHeight: 235
        })
        this.load.spritesheet("boatSpriteLeft", "assets/boatSpritesheetLeft.png",{
            frameWidth: 315,
            frameHeight: 210
        })
        this.load.spritesheet("boatSpriteRight", "assets/boatSpritesheetRight.png",{
            frameWidth: 315,
            frameHeight: 210
        })
        this.load.image("tree1", "assets/tree1.png")
        this.load.image("tree2", "assets/tree2.png")
        this.load.image("tree3", "assets/tree3.png")

        this.load.image("mountains", "assets/Mountains.png")
    
        this.load.image("boat", "assets/Boat.png");
        this.load.image("shark2", "assets/Boat.png");
        this.load.image('platform', 'assets/platform.png');
        this.load.image('platformLeft', 'assets/platform.png');
        this.load.image('platformRight', 'assets/platform.png');
        this.load.image("man", "assets/man.png");
        this.load.image("heart", "assets/heart.png");
        this.load.image("shark1", "assets/Fish.png");
        this.load.image("mute", "assets/mute.png");
        this.load.image("unmute", "assets/unmute.png");
        this.load.audio("heli", "assets/helicopter.mp3");
        this.load.audio("success", "assets/Success1.mp3");
        this.load.audio("fail", "assets/fail.wav");
        this.load.audio("fail", "assets/fail.wav");
        this.load.audio("splashSound", "assets/splashSound.mp3")
        this.load.audio("music", "assets/beachMusic.mp3");
        this.load.image("name", "assets/Title.png")
        this.load.image("gameOverImage", "assets/gameOver.png")
        this.load.image("startButton", "assets/Button.png")
        this.load.image("ray", "assets/rays.png")
        this.load.image("restart", "assets/restart.png")
        this.load.image("bigWave", "assets/3.png")
        this.load.image("mediumWave", "assets/2.png")
        this.load.image("sparkles", "assets/sparkles.png")

        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }

    create() {
        this.physics.world.setBounds(420, 1594, 1050, 1980, true, true, false)
                
        

        this.anims.create({
            key: 'bird_anims',
            frames: this.anims.generateFrameNumbers("bird", {
                start: 0,
                end: 8
            }),
            frameRate: 11,
            repeat: -1,
        })

        
        



        
        this.anims.create({
            key: "helicopter_anims",
            frames: this.anims.generateFrameNumbers("helicopter", {
                start: 0,
                end: 3
            }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'splash_anims',
            frames: this.anims.generateFrameNumbers("splash", {
                start: 0,
                end: 5
            }),
            frameRate: 9,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: 'boat_anims_left',
            frames: this.anims.generateFrameNumbers("boatSpriteLeft", {
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1,
        })

        this.anims.create({
            key: 'boat_anims_right',
            frames: this.anims.generateFrameNumbers("boatSpriteRight", {
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1,
        })

        this.scene.start("gameMenu");
    }
}