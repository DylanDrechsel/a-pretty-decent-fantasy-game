import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import MainMenuScene from './scenes/MainMenu'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 400,
	height: 250,
	physics: {
		default: 'arcade',
		arcade: {
			// No gravity since this is a top down game
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [Preloader, Game, MainMenuScene],
	scale: {
		zoom: 2
	}
}

export default new Phaser.Game(config)
