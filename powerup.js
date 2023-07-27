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
        }, 1000);
    }

    update(){
        console.log("update");
        console.log({canActivate: this.canActivate});
        if (this.canActivate) {
            this.canActivate = false;
            console.log("beam now");
            new Beam(this.parentScene);
        }
    }

    preDestroy() {
        console.log("preDestroy");
        clearInterval(this.intervalId);
    }

}