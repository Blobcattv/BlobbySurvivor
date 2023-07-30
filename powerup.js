class Powerup extends Phaser.GameObjects.GameObject {
    parentScene = undefined;
    canActivate = false;
    intervalId = undefined;

    constructor(scene, type = "") {    
        super(scene, type);
        scene.add.existing(this);

        this.parentScene = scene;
        this.intervalId = setInterval(() => {
            this.canActivate = true;
        }, 2000);
    }

    update(){
        if (this.canActivate) {
            this.canActivate = false;
            new Beam(this.parentScene);
        }
    }

    preDestroy() {
        clearInterval(this.intervalId);
    }

}