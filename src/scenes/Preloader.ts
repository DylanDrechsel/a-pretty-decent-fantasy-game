import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('tiles', 'tiles/level-1-new.png')
        // this.load.image('invisibleWallsTiles', 'tiles/roofs.png')ef
        this.load.tilemapTiledJSON('dungeon', 'tiles/level-1-new.json')
        this.load.atlas('male', 'character/male_walkcycle.png', 'character/male_walkcycle.json')
    }

    create() {
        this.scene.start('game')
    }
}