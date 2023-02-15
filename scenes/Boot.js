
class Boot extends Phaser.Scene {
    
    constructor() {
        super("boot")
        
        this.loadCount = true;
    }

    preload(){

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        var loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 60,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
        x: this.width / 2,
        y: this.height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            if(this.loadCount){
                percentText.text = (parseInt(value*100) + '%');
            }
            progressBox.x = 560
            progressBox.y = 195
            progressBar.x = 560
            progressBar.y = 195
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        }, this);
        
        this.load.on('fileprogress', function (file) {
            // assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            this.loadCount = false
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        this.load.image("frame", "assets/images/frame.png");
        this.load.image("background", "assets/images/background.png");
        this.load.image("sky", "assets/images/sky.png");
        this.load.image("land", "assets/images/land.png");
        this.load.spritesheet("helicopter", "assets/spritesheets/helicopterSpritesheet.png",{
            frameWidth: 399,
            frameHeight: 150
        });
        this.load.spritesheet("splash", "assets/spritesheets/splashSpritesheet.png",{
            frameWidth: 200,
            frameHeight: 170
        });
        this.load.spritesheet("bird", "assets/spritesheets/birdSpritesheet.png",{
            frameWidth: 190,
            frameHeight: 135
        });
        this.load.spritesheet("boatSpriteLeft", "assets/spritesheets/boatSpritesheetLeft.png",{
            frameWidth: 315,
            frameHeight: 210
        });
        this.load.spritesheet("boatSpriteRight", "assets/spritesheets/boatSpritesheetRight.png",{
            frameWidth: 315,
            frameHeight: 210
        });

        this.load.image("tree1", "assets/images/tree1.png");
        this.load.image("tree2", "assets/images/tree2.png");
        this.load.image("tree3", "assets/images/tree3.png");
        this.load.image("mountains", "assets/images/mountains.png")
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('platformLeft', 'assets/images/platform.png');
        this.load.image('platformRight', 'assets/images/platform.png');
        this.load.image("man", "assets/images/man.png");
        this.load.image("heart", "assets/images/heart.png");
        this.load.image("shark", "assets/images/shark.png");
        this.load.image("mute", "assets/images/mute.png");
        this.load.image("unmute", "assets/images/unmute.png");
        this.load.image("name", "assets/images/Title.png");
        this.load.image("gameOverImage", "assets/images/gameOver.png");
        this.load.image("startButton", "assets/images/startButton.png");
        this.load.image("restart", "assets/images/restartButton.png");
        this.load.image("waves", "assets/images/boatWaves.png");
        this.load.image("sparkles", "assets/images/sparkles.png");

        this.load.audio("helicopterAudio", "assets/audios/helicopter.mp3");
        this.load.audio("successAudio", "assets/audios/success.mp3");
        this.load.audio("splashSound", "assets/audios/splashAudio.mp3");
        this.load.audio("music", "assets/audios/beachMusic.mp3");
    }

    create() {
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
                end: 2
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
                end: 1
            }),
            frameRate: 7,
            repeat: -1,
        })

        this.anims.create({
            key: 'boat_anims_right',
            frames: this.anims.generateFrameNumbers("boatSpriteRight", {
                start: 0,
                end: 1
            }),
            frameRate: 7,
            repeat: -1,
        })

        this.scene.start("game");
    }
}