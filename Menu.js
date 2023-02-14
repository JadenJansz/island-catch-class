class Menu extends Phaser.Scene {

    constructor() {
        super("gameMenu")

        this.startGame = false
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

    create(){

        this.helicopterSound = this.sound.add("heli");
        this.helicopterSound.play({ volume: 0.4, loop: true });
        
        this.successSound = this.sound.add("success");
        this.failureSound = this.sound.add("splashSound")

        this.backgroundMusic = this.sound.add("music");
        this.backgroundMusic.play({ volume: 0.8, loop: true });

        if (!this.sound.locked)
        {
            this.helicopterSound.play()
            this.backgroundMusic.play()
        }
        else
        {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                helicopterSound.play()
                backgroundMusic.play()
            })
        }
        
        this.sky = this.add.tileSprite(950,450, 2012, 812, 'sky')
        this.sky.setScale(0.65);

        this.land = this.add.image(950, 520, 'land');
        this.land.setScale(0.65)
        this.platform = this.physics.add.image(950, 790, 'platform')
        this.platform.visible = false;
        this.platform.scaleX = 2.5

        this.platformLeft = this.physics.add.staticImage(240, 340, 'platform')
        this.platformLeft.visible = false
        this.platformLeft.scaleX = 0
        this.platformLeft.scaleY = 10
        
        
        this.platformRight = this.physics.add.staticImage(1655, 340, 'platform')
        this.platformRight.visible = false
        this.platformRight.scaleX = 0
        this.platformRight.scaleY = 10
        
        this.helicopter = this.physics.add.sprite(1350,300, 'helicopter').setScale(0.5).refreshBody().setInteractive();
        this.helicopter.play("helicopter_anims");
        this.helicopter.setVelocityX(-160);
        this.helicopter.setCollideWorldBounds(true);
        this.helicopter.setBounce(1);
        this.physics.add.collider(this.helicopter, this.platformLeft, this.flipChopper, null, this)
        this.physics.add.collider(this.helicopter, this.platformRight, this.flipChopper, null, this)

        this.bird = this.physics.add.sprite(350,Math.round(Math.random() * (500 - 370) + 370), "bird").setScale(0.15)
        this.bird.play("bird_anims")

        this.bird1 = this.physics.add.sprite(150,Math.round(Math.random() * (500 - 370) + 370), "bird").setScale(0.1)
        this.bird1.play("bird_anims")

        this.bird2 = this.physics.add.sprite(100,Math.round(Math.random() * (300 - 270) + 270), "bird").setScale(0.1)
        this.bird2.play("bird_anims")
        
        this.tree2 = this.add.image(1430, 600, "tree2");
        this.tree2.setOrigin(1,1);
        this.tree2.scale = .4

        this.tree3 = this.add.image(860, 590, "tree3");
        this.tree3.setOrigin(1,1);
        this.tree3.setScale(0.4)

        this.tree1 = this.add.image(1170, 600, "tree1");
        this.tree1.setOrigin(1,1);
        this.tree1.scale = 0.5

        this.mountains = this.add.image(940, 505, "mountains");
        this.mountains.setScale(0.7)

        
        
        this.unmute = this.add.image(1450, 240, 'mute').setScale(0.35)
        this.unmute.inputEnabled = true;
        this.unmute.setInteractive();
        this.unmute.on('pointerdown', this.muteSound);
        this.unmute.visible = false;

        this.mute = this.add.image(1450, 240, 'unmute').setScale(0.35)
        this.mute.inputEnabled = true;
        this.mute.setInteractive();
        this.mute.on('pointerdown', this.muteSound);

        this.shark2 = this.physics.add.image(770, 715, 'shark1').setScale(0.6).refreshBody();
        this.shark2.setVelocityX(30);

        this.boatLeft = this.physics.add.sprite(950, 730, 'boatSpriteLeft')
        this.boatLeft.setScale(0.62)
        this.boatLeft.setSize(210, 30, true);
        this.boatLeft.setDepth(1)
        this.boatLeft.setCollideWorldBounds(true);
        this.boatLeft.play("boat_anims_left")

        this.boatRight = this.physics.add.sprite(950, 730, 'boatSpriteRight')
        this.boatRight.setScale(0.62)
        this.boatRight.setSize(210, 30, true)
        this.boatRight.setDepth(1)
        this.boatRight.setCollideWorldBounds(true);
        this.boatLeft.visible = false
        this.boatRight.play("boat_anims_right")
        
        this.shark1 = this.physics.add.image(1100, 700, 'shark1').setScale(0.7).refreshBody();
        this.shark1.setVelocityX(30);

        this.shark3 = this.physics.add.image(1400, 770, 'shark1').setScale(0.7).setDepth(1).refreshBody();
        this.shark3.flipX = true;
        this.shark3.setVelocityX(-30);

        this.shark4 = this.physics.add.image(500, 770, 'shark1').setScale(0.7).setDepth(1).refreshBody();
        this.shark4.setVelocityX(30);
        
        
        this.heart = this.add.group({
            key: 'heart',
            repeat: 2,
            setXY: { x: 440, y: 250, stepX: 30 },
            setScale: { x: 0.08, y: 0.08 }
        })
        
        this.frame = this.add.image(955, 490, "frame");
        this.frame.setScale(1.68).setDepth(1)

        this.timer = this.time.addEvent({ delay: Math.round(Math.random() * (4500 - 2000) + 2000), callback: this.createMan, callbackScope: this, loop: true });
        
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.score = 0;
        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel = this.add.text(427, 210, "SCORE : 000000" , { fontFamily: 'CustomFont', fontSize: 20, fill: '#eef0f3',stroke: '#000000', strokeThickness: 3 });
        this.gameName = this.add.image(970, 520, "name").setScale(0.3)

        this.startGameText = this.add.image(970, 640, "startButton").setScale(0.2).setDepth(1).setAlpha(0).setInteractive();
        this.startGameText.on('pointerdown', function(){ this.scene.start("playGame") }, this);

        this.startGameText.on('pointerover', function(){ this.startGameText.setScale(0.6) }, this )
        this.startGameText.on('pointerout', function(){ this.startGameText.setScale(0.5) }, this )

        this.restartButton = this.add.image(970, 640, "restart").setScale(0.08).setDepth(1).setAlpha(0).setInteractive();
        this.restartButton.on('pointerdown', function() {
            console.log(fail)
            startGame = false
            restart = true
        });

        this.restartButton.on('pointerover', function(){ this.restartButton.setScale(0.6), this })
        this.restartButton.on('pointerout', function(){ this.restartButton.setScale(0.5), this })
        
        this.gameOverText = this.add.image(970, 490, "gameOverImage").setScale(0.25).setDepth(1).setAlpha(0);
        this.finalScore = this.add.text(970, 570, "Final Score : 000000", { fontFamily: 'CustomFont', fontSize: 45, fill: '#eef0f3',stroke: '#000000', strokeThickness: 3 }).setDepth(1).setAlpha(0).setInteractive();
        this.finalScore.setOrigin(0.5, 0.5);

        var gameNameTeen = this.tweens.add({
            targets: [this.gameName],
            alpha: { from: 0, to: 1 },
            scale: { from: 0, to: 0.3 },
            duration: 2000,
            ease: 'Back.easeInOut',
            repeat: 0,
            onComplete: function(){
                
                this.tweens.add({
                    targets: [this.startGameText],
                    alpha: { from: 0, to: 1 },
                    scale: { from: 0, to: 0.5 },
                    duration: 1500,
                    ease: 'Back.easeInOut',
                    repeat: 0,
                    // onComplete: function(){
                    //     gameName.alpha = 0.5;
                    // },
                    callbackScope: this
                })
            },
            callbackScope: this
        })

        var tween = this.tweens.addCounter({
            from: 3,
            to: 1,
            duration: 4000,
            repeat: -1,
            onUpdate: function (tween)
            {

                this.tree1.setAngle(1);
            },
            yoyo: true,
            callbackScope: this
        });

        var tween = this.tweens.addCounter({
            from: 0.2,
            to: 2,
            duration: 4000,
            repeat: -1,
            onUpdate: function (tween)
            {

                this.tree2.setAngle(tween.getValue());
            },
            yoyo: true,
            callbackScope: this
        });

        var tween = this.tweens.addCounter({
            from: 5,
            to: 1,
            duration: 4000,
            repeat: -1,
            onUpdate: function (tween)
            {

                this.tree3.setAngle(tween.getValue());
            },
            yoyo: true,
            callbackScope: this
        });

        this.tweens.add({
            targets: this.shark1,
            x: 1230,
            ease: 'Linear',
            duration: 3000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.shark2,
            x: 830,
            ease: 'Linear',
            duration: 5000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.shark3,
            x: 1200,
            ease: 'Linear',
            duration: 7000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.shark4,
            x: 850,
            ease: 'Linear',
            duration: 5000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.bird,
            x: 1800,
            ease: 'Linear',
            duration: 10000,
            repeat: -1,
            onRepeat: function(bird){
                bird.y = Math.round(Math.random() * (500 - 370) + 370)
            }
        });

        this.tweens.add({
            targets: this.bird1,
            x: 1800,
            ease: 'Linear',
            duration: 9000,
            repeat: -1,
            onRepeat: function(bird1){
                bird1.y = Math.round(Math.random() * (500 - 370) + 370)
            }
        });

        this.tweens.add({
            targets: this.bird2,
            x: 1800,
            ease: 'Linear',
            duration: 11000,
            repeat: -1,
            onRepeat: function(bird2){
                bird2.y = Math.round(Math.random() * (300 - 270) + 270)
            }
        });
    }




    update(){
        if(this.startGame){
            // console.log(this.startGame)
        }
    }


    startGame() {
        this.scene.start("playGame");
    }

    flipChopper(helicopter){
        helicopter.toggleFlipX();
    }

    createMan(){
        if(this.startGame){
            man = this.physics.add.image(helicopter.x,helicopter.y, 'man').setOrigin(0,0.5).setSize(180,300).setScale(0.17);
            man.setGravityY(Math.round(Math.random() * (100 - 20) + 20));
            man.setOrigin(0.5,0)

            var timeline = tweensVariable.createTimeline();

            timeline.add({
                targets: man,
                angle: { from: 0, to: 5 },
                duration: 1000,
            });

            timeline.add({
                targets: man,
                angle: { from: 5, to: -10 },
                scale: { from: 0.17, to: 0.22 },
                duration: 1500,
            });

            timeline.add({
                targets: man,
                angle: { from: -10, to: 15 },
                scale: { from: 0.22, to: 0.25 },
                duration: 2000,
            });

            timeline.add({
                targets: man,
                angle: { from: 15, to: -20 },
                scale: { from: 0.25, to: 0.3 },
                duration: 3000,
            });

            timeline.play();

            this.physics.add.overlap(man, boatLeft, catchMan, null, this);
            this.physics.add.overlap(man, platform, removeLife, null, this);

        }
    }

    muteSound() {
        if (!game.sound.mute) {
            game.sound.mute = true;
            unmute.visible = true;
            unmute.setDepth(1)
        } else {
            game.sound.mute = false;
            unmute.visible = false;
            mute.setDepth(1)
        }
    }

    unmuteSound() {
        mute.visible = true;
        unmute.visible = false;
        game.sound.mute = false;
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    scaleButton(pointer, gameObject){
        gameObject.setScale(0.6)
    }
}