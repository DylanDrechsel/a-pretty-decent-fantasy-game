import Phaser from 'phaser'
import { debugDraw } from '../utils/debug'

export default class HelloWorldScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
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
        const map = this.make.tilemap({ key: 'level 1' })
        const tileset = map.addTilesetImage('level-1-new', 'tiles', 8, 8, 1, 2)
        const invisibleWallsTileset = map.addTilesetImage('level-1-new', 'tiles', 8, 8, 1, 2)
        const treetopTileset = map.addTilesetImage('treetop-8px', 'trees', 8, 8, 1, 2)

        map.createLayer('Map', tileset)
        const invisibleWallsLayer = map.createLayer('Invisible Walls', invisibleWallsTileset)
        const treetopLayer = map.createLayer('Treetops', treetopTileset)

        // Sets property --> next time set it in Tiled
        invisibleWallsLayer.forEachTile((tile) => {
            if (tile.index === 44730 || tile.index === 44731 || tile.index === 162907) {
                tile.properties.collides = true
            }
        }) 

        // Causes collision if tile has a property called collides that is equal to true
        invisibleWallsLayer.setCollisionByProperty({ collides: true })

        debugDraw(invisibleWallsLayer, this)

        // Set Depth for Treetops
        treetopLayer.depth = 1

        this.character = this.physics.add.sprite(100, 50, 'male', 'standing-down/0.png')
        // this.character.body.setSize(this.character.width * 0.5, this.character.height * 0.5)

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

        this.cameras.main.startFollow(this.character, true)
    }

    update(time: number, delta: number) {
        if (!this.cursors || !this.character) {
            return
        }

        const walk = 100
        const sprint = 150
        let keyA;
        let keyS;
        let keyD;
        let keyW;

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // Walk Left
        if (keyA?.isDown && !keyW?.isDown && !keyD.isDown && !keyS.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-walk, 0)
			this.character.body.offset.x = -8
        }

        // Sprint Left
        if (keyA?.isDown && !keyW?.isDown && !keyD.isDown && !keyS.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-sprint, 0)
			this.character.body.offset.x = -8
        }

        // Walk Right
        if (keyD?.isDown && !keyS?.isDown && !keyA.isDown && !keyW.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(walk, 0)
			this.character.body.offset.x = 0
        }

        // Sprint Right
        if (keyD?.isDown && !keyS?.isDown && !keyA.isDown && !keyW.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(sprint, 0)
            this.character.body.offset.x = 0
        }

        // Walk Up
        if (keyW?.isDown && !keyA?.isDown && !keyS?.isDown && !keyD?.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-up', true)
            this.character.setVelocity(0, -walk)
            this.character.body.offset.x = 0
        }

        // Sprint Up
        if (keyW?.isDown && !keyA?.isDown && !keyS?.isDown && !keyD?.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-up', true)
            this.character.setVelocity(0, -sprint)
            this.character.body.offset.x = 0
        }

        // Walk Down
        if (keyS?.isDown && !keyA?.isDown && !keyW?.isDown && !keyD?.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-down', true)
            this.character.setVelocity(0, walk)
            this.character.body.offset.x = 0
        }

        // Sprint Down
        if (keyS?.isDown && !keyA?.isDown && !keyW?.isDown && !keyD?.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-down', true)
            this.character.setVelocity(0, sprint)
            this.character.body.offset.x = 0
        }

        // Walk Diagonal Up Left
        if (keyA?.isDown && keyW?.isDown && !keyD.isDown && !keyS.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-walk*.75, -walk*.75)
			this.character.body.offset.x = -8
        }

        // Sprint Diagonal Up Left
        if (keyA?.isDown && keyW?.isDown && !keyD.isDown && !keyS.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-sprint*.75, -sprint*.75)
			this.character.body.offset.x = -8
        }

        // Walk Diagonal Down Left
        if (keyA?.isDown && !keyW?.isDown && !keyD.isDown && keyS.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-walk*.75, walk*.75)
			this.character.body.offset.x = -8
        }

        // Sprint Diagonal Down Left
        if (keyA?.isDown && !keyW?.isDown && !keyD.isDown && keyS.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-left', true)
            this.character.setVelocity(-sprint*.75, sprint*.75)
			this.character.body.offset.x = -8
        }

        // Walk Diagonal Up Right
        if (!keyA?.isDown && keyW?.isDown && keyD.isDown && !keyS.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(walk*.75, -walk*.75)
			this.character.body.offset.x = -8
        }

        // Sprint Diagonal Up Right
        if (!keyA?.isDown && keyW?.isDown && keyD.isDown && !keyS.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(sprint*.75, -sprint*.75)
			this.character.body.offset.x = -8
        }

        // Walk Diagonal Down Right
        if (!keyA?.isDown && !keyW?.isDown && keyD.isDown && keyS.isDown && !this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(walk*.75, walk*.75)
			this.character.body.offset.x = -8
        }

        // Sprint Diagonal Down Right
        if (!keyA?.isDown && !keyW?.isDown && keyD.isDown && keyS.isDown && this.cursors.shift?.isDown) {
            this.character.anims.play('character-run-right', true)
            this.character.setVelocity(sprint*.75, sprint*.75)
			this.character.body.offset.x = -8
        }

        // Idle
        if (!keyA?.isDown && !keyD?.isDown && !keyW?.isDown && !keyS?.isDown) {
            const parts = this.character.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.character.play(parts.join('-'))
            this.character.setVelocity(0, 0)
        }
    }
}
