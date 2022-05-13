import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('tiles', 'tiles/level-1-new-extruded.png')
        this.load.image('trees', 'tiles/treetop-8px-extruded.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/level-1-new.json')
        this.load.atlas('male', 'character/male_walkcycle.png', 'character/male_walkcycle.json')
        this.load.image('menu-background', 'main-menu/menu-background.png')
		this.load.image('play-button', 'main-menu/play_button.png')
        this.load.image('options-button', 'main-menu/options_button.png')
        this.load.image('options-button-highlighted', 'main-menu/options_button_highlighted.png')
        this.load.image('play-button-highlighted', 'main-menu/play_button_highlight.png')


    }

    create() {
        this.scene.start('main-menu')
    }
}