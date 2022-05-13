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
        const playButton = this.add.image(width * 0.5, height * 0.4, 'play-button')
            .setDisplaySize(200, 40)
        
        const optionsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'options-button')
            .setDisplaySize(200, 40)

        this.buttons.push(playButton)
        this.buttons.push(optionsButton)
        //this.buttons.push(creditsButton)
        this.selectButton(0, 0)
        //this.buttonSelector = this.add.image(0, 0, 'cursor-hand')
        
	playButton.on('selected', () => {
		this.scene.start('game');
	})
    optionsButton.on('selected', () =>{
        this.scene.start('options-screen')
    })

    }

	selectButton(index: number, change: number)
	{
		const currentButton = this.buttons[this.selectedButtonIndex]
        
        //this.buttons[index] = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'options-button')
        //.setDisplaySize(200, 40)
        this.buttons[index - change].setTexture(`${this.buttons[index - change].texture.key.replace('-highlighted', '')}`)
        this.buttons[index].setTexture(`${this.buttons[index].texture.key}-highlighted`)

        // set the newly selected button to a green tint
        // button.setTint(0x66ff7f)

        // move the hand cursor to the right edge


        // store the new selected index
        this.selectedButtonIndex = index
	}

	selectNextButton(change: number)
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

        this.selectButton(index, change)
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