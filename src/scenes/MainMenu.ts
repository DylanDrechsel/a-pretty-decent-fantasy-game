import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private buttons: Phaser.GameObjects.Image[] = []
	private selectedButtonIndex = 0
    private buttonSelector!: Phaser.GameObjects.Image

    constructor(){
        super('main-menu')
    }
    init(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }
    preload()
    {
		//nothing for now

    }

    create()
    {
        const { width, height } = this.scale
        this.add.sprite(0, 0, 'menu-background').setOrigin(0,0).setDisplaySize(400,250);
        // Play button
        const playButton = this.add.image(width * 0.5, height * 0.6, 'play-button')
            .setDisplaySize(200, 40)
        //
        //// Settings button
        //const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'menu-button-background')
        //    .setDisplaySize(200, 40)

        //// Credits button
        //const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'menu-button-background')
        //    .setDisplaySize(200, 50)
        //
        this.buttons.push(playButton)
        //this.buttons.push(settingsButton)
        //this.buttons.push(creditsButton)
        this.selectButton(0)
        //this.buttonSelector = this.add.image(0, 0, 'cursor-hand')
        
	playButton.on('selected', () => {
		this.scene.start('game');
	})

    }

	selectButton(index: number)
	{
		const currentButton = this.buttons[this.selectedButtonIndex]

        // set the current selected button to a white tint
        //currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        // set the newly selected button to a green tint
        // button.setTint(0x66ff7f)

        // move the hand cursor to the right edge


        // store the new selected index
        this.selectedButtonIndex = index
	}

	selectNextButton(change = 1)
	{
		let index = this.selectedButtonIndex + change

        // wrap the index to the front or end of array
        if (index >= this.buttons.length)
        {
            index = 0
        }
        else if (index < 0)
        {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

	confirmSelection()
	{
		const button = this.buttons[this.selectedButtonIndex]

        // emit the 'selected' event
        button.emit('selected')
	}
	
	update()
	{
		const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)
		
		if (upJustPressed)
		{
			this.selectNextButton(-1)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(1)
		}
		else if (spaceJustPressed)
		{
			this.confirmSelection()
		}
	}
}