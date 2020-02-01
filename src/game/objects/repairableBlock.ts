import {Block} from "./block";

export class RepairableBlock extends Phaser.GameObjects.Sprite {
    repairable: boolean = true;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        // variables
        this.initSprite();
        this.scene.add.existing(this);
    }

    private initSprite() {
        // sprite
        this.setOrigin(0, 0);
        this.setFrame(0);

        // physics
        this.scene.physics.world.enable(this);
        this.body.setSize(1, 1);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setVelocityX(-100);
        this.setInteractive();
        this.setScale(0.5);
    }

    update() {
        if (this.x <= (Block.SIZE - 1) * -1) {
            this.setX(this.scene.sys.canvas.width + Block.SIZE);
        }

        if (this.repairable) {
            this.on("pointerdown", function () {
                this.repairable = false;
                console.log(this.repairable);
            });
        }
    }
}
