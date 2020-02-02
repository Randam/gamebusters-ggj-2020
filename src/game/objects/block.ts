import {RepairableBlock} from "./repairableBlock";
import { settings } from "../game";
import { streetTiles } from "../scenes/main-scene";

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
        this.body.setVelocityX(settings.walkSpeed * -1);
        this.setScale(3.75, 1);
        this.setVisible(false);
    }

    update() {
        if (this.x <= (Block.SIZE - 1) * -1) {
            this.setX((streetTiles.length - 1) * Block.SIZE);
            if (this.repairblock) {
                this.setY(this.scene.sys.canvas.height + 500);
                this.repairblock.repaired = false;
            }
        }

        if (this.repairblock && this.repairblock.repaired && this.y !== this.scene.sys.canvas.height - 225) {
            this.repairblock.repaired = true;
            this.repairblock.repairing = false;
            this.setY(this.scene.sys.canvas.height - 225);
        }
    }
}
