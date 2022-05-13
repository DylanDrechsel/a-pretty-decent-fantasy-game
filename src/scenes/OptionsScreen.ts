import Phaser from 'phaser'

export default class OptionsScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private buttons: Phaser.GameObjects.Image[] = []
	private selectedButtonIndex = 0
    private buttonSelector!: Phaser.GameObjects.Image

    constructor(){
        super('options-screen')
    }
    init(){
        this.cursors = this.input.keyboard.createCursorKeys()
        this.buttons = []
    }
    preload()
    {
		//nothing for now

    }

    create()
    {
        const { width, height } = this.scale
        this.add.sprite(0, 0, 'menu-background').setOrigin(0,0).setDisplaySize(400,250);
        const exitButton = this.add.image(width * 0.5, height * 0.4, 'exit-button')
            .setDisplaySize(200, 40)
        this.buttons.push(exitButton)
        this.selectButton(0, 0)
        
     exitButton.on('selected', () => {
		this.scene.start('main-menu');
	})
    

    }

	selectButton(index: number, _change: number)
	{
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
		
		//if (upJustPressed)
		//{
		//	this.selectNextButton(-1)
		//}
		//else if (downJustPressed)
		//{
		//	this.selectNextButton(1)
		//}
		if (spaceJustPressed)
		{
			this.confirmSelection()
		}
	}
}