class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.map = this.add.image(0, 0, 'map').setOrigin(0) // don't want physics or sprite, just want to display so img it is

        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // do camera things
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height) // you don't have to check your assets all the time
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5) // pixel art tends to smudge when scrolling if you round pixels
        // fix the physics world, or else it will think we are still in the old bounds and not let us walk around
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height) // match the map

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)'

        // checking that the anim works and looks right
        // this.hero.anims.play('spin-attack')
    }

    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step()
    }
}