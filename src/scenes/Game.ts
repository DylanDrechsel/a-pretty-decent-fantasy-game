import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    /**
     * The A key.
     * 
     * @name Phaser.Input.Keyboard.KeyCodes.A
     * @type {number}
     * @since 3.0.0
     */
    private character!: Phaser.Physics.Arcade.Sprite

	constructor()
	{
		super('game')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('level-1-new', 'tiles')
        const invisibleWallsTileset = map.addTilesetImage('roofs', 'invisibleWallsTiles')

        map.createLayer('Map', tileset)
        const invisibleWallsLayer = map.createLayer('Invisable Walls', invisibleWallsTileset)

        // Enables collison for "debugGraphic"
        invisibleWallsLayer.forEachTile((tile) => {
            if (tile.index === 44728) {
                tile.properties.collides = true
            }
        }) 

        // Not enabling collision for the "debugGraphics"
        invisibleWallsLayer.setCollisionByProperty({ collides: true })

         

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        invisibleWallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })

        this.character = this.physics.add.sprite(50, 50, 'male', 'standing-down/0.png')
        
        this.anims.create({
            key: 'character-idle-down',
            frames: [{ key: 'male', frame: 'standing-down/0.png'}]
        })

        this.anims.create({
            key: 'character-idle-up',
            frames: [{ key: 'male', frame: 'standing-up/0.png'}]
        })

        this.anims.create({
            key: 'character-idle-left',
            frames: [{ key: 'male', frame: 'standing-left/0.png'}]
        })

        this.anims.create({
            key: 'character-idle-right',
            frames: [{ key: 'male', frame: 'standing-right/0.png'}]
        })

        this.anims.create({
            key: 'character-run-down',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-down/', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'character-run-up',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-up/', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'character-run-left',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-left/', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'character-run-right',
            frames: this.anims.generateFrameNames('male', { start: 1, end: 8, prefix: 'walking-right/', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.character.anims.play('character-idle-down')

        this.physics.add.collider(this.character, invisibleWallsLayer)
    }

    update(time: number, delta: number) {
        if (!this.cursors || !this.character) {
            return
        }

        const speed = 100
        let keyA;
        let keyS;
        let keyD;
        let keyW;

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        if (keyA?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-speed, 0)
        }

        if (keyD?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(speed, 0)
        }

        if (keyW?.isDown) {
            this.character.anims.play('character-run-up', true)
            this.character.setVelocity(0, -speed)
        }

        if (keyS?.isDown) {
            this.character.anims.play('character-run-down', true)
            this.character.setVelocity(0, speed)
        }

        if (!keyA?.isDown && !keyD?.isDown && !keyW?.isDown && !keyS?.isDown) {
            this.character.play('character-idle-down')
            this.character.setVelocity(0, 0)
        }
    }
}
