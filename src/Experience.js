import Canvas from "./Canvas";

export default class Experience {
    constructor(canvas, ui) {
        this.canvas = new Canvas(canvas);
        this.ui = ui;

        this.counter = 1;

        this.tick();
    }

    tick() {
        this.canvas.drawImage(this.canvas.images["chef_" + this.counter], 0, 0);

        requestAnimationFrame(this.tick.bind(this));
    }
}
