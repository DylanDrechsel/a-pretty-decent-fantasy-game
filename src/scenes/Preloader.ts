import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('tiles', 'tiles/level-1-new.png')
        this.load.image('invisibleWallsTiles', 'tiles/roofs.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/level-1-new.json')
        // this.load.tilemapTiledJSON('invisibleWalls', 'tiles/invisable-walls.json')
    }

    create() {
        this.scene.start('game')
    }
}