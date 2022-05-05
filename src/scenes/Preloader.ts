import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('tiles', 'tiles/level_1_tiles.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/test.json')
    }

    create() {
        this.scene.start('game')
    }
}