import Canvas from "./Canvas";
import Animator from "./Animator";
import Input from "./Input";

export default class Experience {
    constructor(canvas, ui) {
        this.canvas = new Canvas(canvas);
        this.ui = ui;

        const RECIPES = {
            SCRAMBLED:  { pattern: '<><><><>' },
            OMLETTE:    { pattern: '>v<^>v<^'},
            SOUFFLE:    { pattern: '<^>v<v>^' },
            PANCAKES:   { pattern: '^>^>^>^>' },
            CUSTARD:    { pattern: '^v^v^v^v' },
            MERINGUE:   { pattern: '>><<>><<' },
            MAYONAISE:  { pattern: '<<^^>>vv' }
        }
        this.showRecipes = false;

        this.chef = new Animator(
            {
                NEW_BOWL: { frames: [1, 2], loop: false, auto: true },
                WHISK: { frames: [3, 4, 5], loop: true, auto: false },
                END_BOWL: { frames: [6, 7], loop: false, auto: true },
            }, 
            'NEW_BOWL', 
            'chef'
        );

        this.input = new Input(this, RECIPES.SCRAMBLED.pattern);

        this.score = 0;
        this.scoreElement = document.getElementById("score");

        // TODO: Capture the Recipe Book Button and add onclick
        //      -- Onclick flip the icon to an X and back
        //      -- Flip the showRecipes value

        this.tick();
    }

    tick() {
        const fps = 10; // Target frames per second
        const interval = 1000 / fps; // Milliseconds per frame
        let lastTime = 0;
    
        const loop = (currentTime) => {
            const deltaTime = currentTime - lastTime;
    
            if (deltaTime >= interval) {
                lastTime = currentTime;

                if(this.showRecipes) {
                    // TODO: When this flag is shown draw the recipe book on screen
                    //          - Create the recipe book image, each recipe with the combination
                    //          - Draw it to the screen
                } else {
                    // Check user input
                    if(this.input.matches) {
                        this.score++;
                        this.scoreElement.innerText = this.score;
                        this.input.reset();
                        this.chef.nextState();
                    }
        
                    // Update and render
                    this.chef.update();
                    this.canvas.drawImage(this.canvas.images[this.chef.getImageString()], 'right', 0);
                    // TODO: Draw the current recipe on screen
                    //          - Create the images
                    //          - Add them to sources and make sure that they load correctly
                    //          - Draw the correct one to the screen
                }
            }
    
            requestAnimationFrame(loop);
        };
    
        requestAnimationFrame(loop);
    }
}
