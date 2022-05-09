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
        // const invisibleWalls = this.make.tilemap({ key: 'invisibleWalls'})
        const tileset = map.addTilesetImage('level-1-new', 'tiles')
        const invisibleWallsTileset = map.addTilesetImage('roofs', 'invisibleWallsTiles')

        map.createLayer('Map', tileset)
        const invisibleWallsLayer = map.createLayer('Invisable Walls', invisibleWallsTileset)

        invisibleWallsLayer.setCollisionByProperty({ collides: true })

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        invisibleWallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })
    }
}
