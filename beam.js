class Beam extends Phaser.GameObjects.Sprite{
    speed = 250;

    constructor(scene) {
        const x = scene.player.x;
        const y = scene.player.y;
        super(scene, x, y, "beam");
        scene.add.existing(this);
        scene.projectiles.add(this);

        scene.physics.world.enableBody(this); // sets body

        this._calcDirection(scene);

        this.play("beam_anim");
    }

    update(){
        if(this.y < 32 ){
          this.destroy();
        }
    }

    _calcDirection(scene) {
        const speed = this.speed;

        switch (scene.player.direction) {
            case "up":
                this.body.velocity.y = -speed;
                break;

            case "down":
                this.body.velocity.y = speed;
                break;

            case "left":
                this.body.velocity.x = -speed;
                break;
            
            case "right":
                this.body.velocity.x = speed;
                break;

            case "leftup":
                this.body.velocity.x = -speed;
                this.body.velocity.y = -speed;
                break;

            case "rightup":
                this.body.velocity.x = speed;
                this.body.velocity.y = -speed;
                break;

            case "leftdown":
                this.body.velocity.x = -speed;
                this.body.velocity.y = speed;
                break;

            case "rightdown":
                this.body.velocity.x = speed;
                this.body.velocity.y = speed;
                break;
        
            default:
                break;
        }
    }
}