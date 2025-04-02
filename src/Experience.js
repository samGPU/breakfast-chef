import Canvas from "./Canvas";
import Animator from "./Animator";

export default class Experience {
    constructor(canvas, ui) {
        this.canvas = new Canvas(canvas);
        this.ui = ui;

        this.chef = new Animator(
            {
                NEW_BOWL: [1, 2],
                WHISK: [3, 4, 5],
                END_BOWL: [6, 7],
            }, 
            'NEW_BOWL', 
            'chef'
        );

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
    
                // Update and render
                this.chef.update();
                this.canvas.drawImage(this.canvas.images[this.chef.getImageString()], 0, 0);
            }
    
            requestAnimationFrame(loop);
        };
    
        requestAnimationFrame(loop);
    }
}
