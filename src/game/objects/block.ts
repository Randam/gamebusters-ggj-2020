import {RepairableBlock} from "./repairableBlock";

export class Block extends Phaser.GameObjects.Sprite {
    static SIZE = 300;
    repairblock: RepairableBlock;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.repairblock);

        this.repairblock = params.repairblock;

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
        this.body.setSize(50, 4);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setVelocityX(-100);
        this.setScale(3.75, 1);
        this.setVisible(true);
    }

    update() {
        if (this.x <= (Block.SIZE - 1) * -1) {
            this.setX(this.scene.sys.canvas.width + Block.SIZE);
            if (this.repairblock) {
                this.setY(this.scene.sys.canvas.height + 500);
            }
        }

        if (this.repairblock && this.repairblock.repaired && this.y !== this.scene.sys.canvas.height - 200) {
            this.setY(this.scene.sys.canvas.height - 200);
        }
    }
}
