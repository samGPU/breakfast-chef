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
        this.input = new Input(RECIPES.SCRAMBLED.pattern);

        this.chef = new Animator(
            {
                NEW_BOWL: { frames: [1, 2], loop: false },
                WHISK: { frames: [3, 4, 5], loop: true },
                END_BOWL: { frames: [6, 7], loop: false },
            }, 
            'NEW_BOWL', 
            'chef'
        );

        const nextStateElement = document.getElementById("nextState");
        if (nextStateElement) {
            nextStateElement.onclick = () => this.chef.nextState();
        }

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

                // Check user input
                console.log(this.input.matches)
    
                // Update and render
                this.chef.update();
                this.canvas.drawImage(this.canvas.images[this.chef.getImageString()], 'right', 0);
            }
    
            requestAnimationFrame(loop);
        };
    
        requestAnimationFrame(loop);
    }
}
