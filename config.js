var config = {
    type: Phaser.WEBGL,
    backgroundColor: '#000000',
    pixelArt: false,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [
        Boot, Game
    ],
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 990,
    },
    render: {
        antialias: true,
        roundPixels: true,
    },
    resolution: 3
}

var game = new Phaser.Game(config);