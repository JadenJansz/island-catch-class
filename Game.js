class Game extends Phaser.Scene {

    constructor() {
        super("game")

        this.restart = false;
        this.startGame = false;
        this.move = 0;
        this.fail = 0;
        this.failAnimation = false;
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

        var bird2 = new Bird(this, 100, Math.round(Math.random() * (300 - 270) + 270), 0.1, 1800, 11000)
        
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

        var bird = new Bird(this, 350, Math.round(Math.random() * (500 - 370) + 370), 0.15, 1800, 10000)

        var bird1 = new Bird(this, 150, Math.round(Math.random() * (500 - 370) + 370), 0.15, 1800, 9000)
        
        
        this.unmute = this.add.image(1450, 240, 'mute').setScale(0.35)
        this.unmute.inputEnabled = true;
        this.unmute.setInteractive();
        this.unmute.on('pointerdown', this.muteSound);
        this.unmute.visible = false;

        this.mute = this.add.image(1450, 240, 'unmute').setScale(0.35)
        this.mute.inputEnabled = true;
        this.mute.setInteractive();
        this.mute.on('pointerdown', this.muteSound);

        var shark2 = new Shark(this, 770, 715, 0.6, 30, 830, 5000);

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

        var shark1 = new Shark(this, 1100, 700, 0.7, 30, 1230, 3000);

        var shark3 = new Shark(this, 1400, 770, 0.7, -30, 1200, 7000);
        shark3.setDepth(1)
        shark3.flipX = true
        
        var shark4 = new Shark(this, 500, 770, 0.7, 30, 850, 5000);
        shark4.setDepth(1)

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
        this.startGameText.on('pointerdown', function(){ this.startGame = true }, this);

        this.startGameText.on('pointerover', function(){ this.startGameText.setScale(0.6) }, this )
        this.startGameText.on('pointerout', function(){ this.startGameText.setScale(0.5) }, this )

        this.restartButton = this.add.image(970, 640, "restart").setScale(0.08).setDepth(1).setAlpha(0).setInteractive();
        this.restartButton.on('pointerdown', function() {
            this.startGame = false
            this.restart = true
        }, this);

        this.restartButton.on('pointerover', function(){ this.restartButton.setScale(0.6)}, this )
        this.restartButton.on('pointerout', function(){ this.restartButton.setScale(0.5)}, this )
        
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

                this.tree1.setAngle(tween.getValue());
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
    }




    update() {
                
        this.sky.tilePositionX -= 0.2

        if(this.restart === true){
            this.backgroundMusic.pause();
            this.restart = false;
            this.fail = 0;
            this.failAnimation = false;
            this.scene.restart();
        }

        if(!this.startGame){
            this.boatLeft.stop();
            this.boatRight.stop();
            this.scoreLabel.visible = false;
            this.heart.setVisible(false);

            this.gameName.visible = true;
            this.startGameText.visible = true
            
            this.gameName.y = 520 + Math.sin(-this.move)*2;
            this.gameName.x = 980 + Math.cos((10*0.3) + this.move)*2;
            this.move += 0.07;
        }
        else if(this.startGame){

            this.backgroundMusic.setVolume(0.3);
            this.game.loop.resume();
            this.physics.resume();

            
            this.startGameText.visible = false;
            this.scoreLabel.visible = true;
            this.heart.setVisible(true);
            

            var nameTeen = this.tweens.add({
                targets: this.gameName,
                scale: 0,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                repeat: 0,
                // onComplete: function(){
                //     gameName.alpha = 0.5;
                // },
                callbackScope: this
            })
            
            if(this.fail == 3){
                this.game.loop.sleep();
                this.physics.pause();
                this.helicopterSound.pause();
                this.scoreLabel.visible = false;
                this.startAnimation();
                this.man.destroy();
                return;
            }

            if(this.boatLeft.body.velocity.x > 0){
                this.boatLeft.anims.play("boat_anims_left", true);
            }else if(this.boatLeft.body.velocity.x < 0){
                this.boatLeft.playReverse("boat_anims_left", true);
            }
            
            if(this.boatRight.body.velocity.x > 0){
                this.boatRight.anims.play("boat_anims_right", true);
            }else if(this.boatRight.body.velocity.x < 0){
                this.boatRight.playReverse("boat_anims_right", true);
            }

            if(this.boatLeft.body.velocity.x === 0 || this.boatRight.body.velocity.x === 0){
                this.boatLeft.stop();
                this.boatRight.stop();
            }
            
            this.moveBoatManager();
        }

    }

    flipChopper(helicopter){
        helicopter.toggleFlipX();
    }

    moveBoatManager(){
                
        this.boatLeft.setVelocity(0);
        this.boatRight.setVelocity(0);
        
        if(this.cursorKeys.left.isDown){
            this.boatRight.visible = false
            this.boatLeft.visible = true
            this.boatRight.setVelocityX(-470);
            this.boatLeft.setVelocityX(-470);
            
            this.waves1 = this.add.image(this.boatRight.x+8, this.boatRight.y+33, 'mediumWave').setScale(0.1).setDepth(1)
            this.waves1.flipX = true;
            var iol = this.tweens.add({
                targets: [this.waves1],
                ease: 'Sine.easeInOut',
                duration: 150,
                callbackScope: this,
                props: {
                    alpha: { value: { from: 0.5, to: 0 }, duration: 300, ease: 'Linear' }
                }
            });

        }
        else if(this.cursorKeys.right.isDown){
            this.boatRight.visible = true
            this.boatLeft.visible = false
            this.boatLeft.setVelocityX(470)
            this.boatRight.setVelocityX(470);
            
            this.waves = this.add.image( this.boatLeft.x+20,  this.boatLeft.y+5, 'bigWave').setScale(0.1).setAlpha(0)
            this.waves1 = this.add.image( this.boatLeft.x+8,  this.boatLeft.y+33, 'mediumWave').setScale(0.1).setDepth(1)
            this.waves1.flipX = true;
            var iol = this.tweens.add({
                targets: [this.waves1],
                ease: 'Sine.easeInOut',
                duration: 150,
                callbackScope: this,
                props: {
                    alpha: { value: { from: 0.5, to: 0 }, duration: 300, ease: 'Linear' }
                }
            });
        }
    }

    createMan(){
        if(this.startGame){
            this.man = this.physics.add.image(this.helicopter.x,this.helicopter.y, 'man').setOrigin(0,0.5).setSize(180,300).setScale(0.17);
            this.man.setGravityY(Math.round(Math.random() * (100 - 20) + 20));
            this.man.setOrigin(0.5,0)

            var timeline = this.tweens.createTimeline();

            timeline.add({
                targets: this.man,
                angle: { from: 0, to: 5 },
                duration: 1000,
            });

            timeline.add({
                targets: this.man,
                angle: { from: 5, to: -10 },
                scale: { from: 0.17, to: 0.22 },
                duration: 1500,
            });

            timeline.add({
                targets: this.man,
                angle: { from: -10, to: 15 },
                scale: { from: 0.22, to: 0.25 },
                duration: 2000,
            });

            timeline.add({
                targets: this.man,
                angle: { from: 15, to: -20 },
                scale: { from: 0.25, to: 0.3 },
                duration: 3000,
            });

            timeline.play();

            this.physics.add.overlap(this.man, this.boatLeft, this.catchMan, null, this);
            this.physics.add.overlap(this.man, this.platform, this.removeLife, null, this);

        }
    }

    catchMan(man){
        this.score += 10;
        var scoreFormated = this.zeroPad( this.score, 6);
        this.scoreLabel.text = "SCORE : " + scoreFormated;
        this.finalScore.text = "Final Score : " + scoreFormated;
        this.successSound.play({ volume: 0.4});
        var sparkles = this.add.sprite(this.boatLeft.x,this.boatLeft.y , 'sparkles').setScale(0.1).setDepth(1)

        var iol = this.tweens.add({
            targets: [sparkles],
            ease: 'Sine.easeInOut',
            duration: 1000,
            callbackScope: this,
            props: {
                alpha: { value: { from: 1, to: 0 }, duration: 800, ease: 'Linear' }
            }
        });

        man.destroy();
    }

    removeLife(man){
        this.fail += 1
        // this.life = fail
        this.heart.remove( this.heart.getLast(true), true);
        this.failureSound.play({ volume: 0.3});
        this.splash = this.physics.add.sprite( man.x - 15, man.y + 70, 'splash').setScale(0.6)
        this.splash.play("splash_anims")
        man.destroy();
    }

    startAnimation(){
        if(this.failAnimation === false){
            this.failAnimation = true;
            var iol = this.tweens.add({
                targets: [this.gameOverText],
                alpha: 1,
                scale: { from: 0, to: 0.2 },
                ease: 'Back.easeInOut',
                duration: 1000,
                callbackScope: this,
                onComplete: function(){
                    
                    this.tweens.add({
                        targets: [this.finalScore],
                        alpha: { from: 0, to: 1 },
                        scale: { from: 0, to: 1 },
                        ease: 'Back.easeInOut',
                        duration: 1000,
                        callbackScope: this,
                        onComplete: function(){
                            this.tweens.add({
                            targets: [this.restartButton],
                            scale: { from: 0, to: 0.5 },
                            alpha: { from: 0, to: 1 },
                            ease: 'Back.easeInOut',
                            duration: 1000,
                            callbackScope: this,
                            })
                        }
                    })
            
                }

                
            });

        }
    }

    muteSound() {
        if (!game.sound.mute) {
            this.game.sound.mute = true;
            this.unmute.visible = true;
            this.unmute.setDepth(1)
        } else {
            this.game.sound.mute = false;
            this.unmute.visible = false;
            this.mute.setDepth(1)
        }
    }

    unmuteSound() {
        this.mute.visible = true;
        this.unmute.visible = false;
        this.game.sound.mute = false;
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}