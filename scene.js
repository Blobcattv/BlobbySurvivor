class Scene extends Phaser.Scene {
    preload(){
        // load background
        this.load.spritesheet("background", "assets/Sprout Lands/Tilesets/Grass.png",{
            frameWidth: 31,
            frameHeight: 31
        });

        // load player
        this.load.spritesheet("player", "assets/Sprout Lands/Characters/Basic Charakter Spritesheet.png",{
            frameWidth: 33,
            frameHeight: 33
        });
    }

    create(){
        // add background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        this.background.setScale(2);

        // add player
        this.player = this.physics.add.sprite(config.width / 2, config.height / 2, "player");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        // camera logic to follow player
        this.cameras.main.setBounds(0, 0, 600 * 2, 500 * 2);
        this.physics.world.setBounds(0, 0, 600 * 2, 500 * 2);
        this.cameras.main.startFollow(this.player);
    }

    update(){
        this.movePlayerManager();
    }

    // functions
    movePlayerManager() {
        const Move = 200;
        this.player.setDrag(2000);

        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-Move);
        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(Move);
        }

         if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-Move);
        } else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(Move);
        }
    }

}