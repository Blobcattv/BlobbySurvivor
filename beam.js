class Beam extends Phaser.GameObjects.Sprite{
    speed = 350;

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

        const playerVeloX = scene.player.body.velocity.x;
        const playerVeloY = scene.player.body.velocity.y;
        const isRunningDiagonal = playerVeloX !== 0 && playerVeloY !== 0;

        let veloX = undefined;
        if (playerVeloX === 0) {
            veloX = 0;
        } else if (playerVeloX > 0) {
            veloX = speed;
        } else {
            veloX = -speed;
        }
        this.body.velocity.x = isRunningDiagonal ? veloX / 1.4 : veloX;

        let veloY = undefined;
        if (playerVeloY === 0) {
            veloY = 0;
        } else if (playerVeloY > 0) {
            veloY = speed;
        } else {
            veloY = -speed;
        }
        this.body.velocity.y = isRunningDiagonal ? veloY / 1.4 : veloY;
    }
}