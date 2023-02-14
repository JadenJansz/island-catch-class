class Loading extends Phaser.Scene {
    
    constructor() {
        super("LoadGame")
    }

    preload() {
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
            if(this.count){
                this.percentText.text = (parseInt(value*100) + '%');
            }
            progressBox.x = 560
            progressBox.y = 195
            progressBar.x = 560
            progressBar.y = 195
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            // assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            this.count = false
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

    }

    create() {
        
        this.scene.start("boot");
    }
}