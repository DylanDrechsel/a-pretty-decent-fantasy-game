import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('tiles', 'tiles/level-1-new-extruded.png')
        this.load.image('trees', 'tiles/treetop-8px-extruded.png')
        this.load.tilemapTiledJSON('level 1', 'tiles/level-1-new.json')
        this.load.atlas('male', 'character/male_walkcycle.png', 'character/male_walkcycle.json')
    }

    create() {
        this.scene.start('game')
    }
}