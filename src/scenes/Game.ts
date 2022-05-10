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
        const tileset = map.addTilesetImage('level-1-new', 'tiles')
        const invisibleWallsTileset = map.addTilesetImage('roofs', 'invisibleWallsTiles')

        map.createLayer('Map', tileset)
        const invisibleWallsLayer = map.createLayer('Invisable Walls', invisibleWallsTileset)

        // Not enabling collision for the "debugGraphics"
        // invisibleWallsLayer.setCollisionByProperty({ collides: true })

        // Enables collison for "debugGraphic"
        invisibleWallsLayer.forEachTile((tile) => {
            if (tile.index === 11317) {
                tile.collideDown = true,
                tile.collideUp = true,
                tile.collideLeft = true,
                tile.collideRight = true
            }
        })  

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        invisibleWallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })

        const character = this.add.sprite(128, 128, 'male', 'standing-down.png')
        
        this.anims.create({
            key: 'character-idle-down',
            frames: [{ key: 'male', frame: 'standing-down.png'}]
        })

        this.anims.create({
            key: 'character-idle-up',
            frames: [{ key: 'male', frame: 'standing-up.png'}]
        })

        this.anims.create({
            key: 'character-idle-left',
            frames: [{ key: 'male', frame: 'standing-left.png'}]
        })

        this.anims.create({
            key: 'character-idle-right',
            frames: [{ key: 'male', frame: 'standing-right.png'}]
        })

        this.anims.create({
            key: 'character-run-down',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-down-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'character-run-up',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-up-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'character-run-left',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-left-', suffix: '.png'}),
            repeat: -1,
            frameRate: 1
        })

        this.anims.create({
            key: 'character-run-right',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 1, prefix: 'walking-right-', suffix: '.png'}),
            repeat: -1,
            frameRate: 1
        })

        character.anims.play('character-run-right')
    }
}
