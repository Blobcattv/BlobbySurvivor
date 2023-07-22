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

        // load enemy
        this.load.spritesheet("enemy", "assets/Sprout Lands/Characters/Basic Charakter Spritesheet.png",{
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

        // add "enemy"
        this.enemies = this.physics.add.sprite(config.width, config.height, "enemy");

        
        // health bar
        this.healthBar = this.makeBar(0,0,0xe7153c);
        this.healtbarValue = 100;
        this.setValue(this.healthBar, this.healtbarValue);
        
        // add physics to player and enemy
        this.physics.add.collider(this.player, this.enemies, (player) => this.hurtPlayer(player, this.healthBar), null, this);
        
        // create container for player and healthbar
        // const container = this.add.container(config.width / 2, config.height / 2, [ this.healthBar, this.player ]);
        
        // camera logic to follow player
        this.cameras.main.setBounds(0, 0, 600 * 2, 500 * 2);
        this.physics.world.setBounds(0, 0, 600 * 2, 500 * 2);
        this.cameras.main.startFollow(this.player);
    }

    update(){
        this.movePlayerManager();
        this.enemyFollows();
    }

    hurtPlayer(player, bar) {
        this.healtbarValue += 15;
        const damage = 15;
        bar.scaleX = (bar.scaleX - damage) /100;
        // player.this.setTintFill(0xffffff);

        // if (this.isTinted) {
        //     this.clearTint();
        // } else {
        //     this.setTintFill(0xffffff);
        // }
    }

    // takeDamage(player) {

    // }

    makeBar(x,y,color) {
        const bar = this.add.graphics();

        bar.fillStyle(color);
        bar.fillRect(0, 0, 30, 5);

        bar.x = x;
        bar.y = y;
        
        return bar;
    }

    setValue(bar,percentage) {
        bar.scaleX = percentage/100;
    }

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

    enemyFollows () {
        this.physics.moveToObject(this.enemies, this.player, 100);
    }
}