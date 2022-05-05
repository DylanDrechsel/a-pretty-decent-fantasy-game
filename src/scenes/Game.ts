import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('game')
	}

	preload()
    {
    }

    create() {
        const map = this.make.tilemap({ key: 'dungeon' })
    }
}
