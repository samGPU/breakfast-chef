import Canvas from "./Canvas";

export default class Experience {
    constructor(canvas, ui) {
        this.canvas = new Canvas(canvas);
        this.ui = ui;

        this.tick();
    }

    tick() {
        this.canvas.drawImage(this.canvas.images.background, 0, 0);
        this.canvas.drawImage(this.canvas.images.player, 0, 0);
        this.canvas.drawImage(this.canvas.images.bullet, 0, 0);
        this.canvas.drawImage(this.canvas.images.enemy, 0, 0);

        requestAnimationFrame(this.tick.bind(this));
    }
}
