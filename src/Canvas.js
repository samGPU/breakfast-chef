import { Images }  from './Images';

export default class Canvas {
    constructor(canvas) {
        this.element = canvas;
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.loadImages();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    loadImages() {
        this.images = {};

        Images.forEach(({ name, src }) => {
            console.log('Loading image', name, src);
            const image = new Image();
            image.src = src;
            this.drawImage(image, -100, -100, 1, 1);
            this.images[name] = image;
        });
    }

    resize() {
        const { element } = this;
        const { innerWidth, innerHeight } = window;
        const { width, height } = this;

        const scale = Math.min(innerWidth / width, innerHeight / height);

        element.style.width = `${width * scale * 0.9}px`;
        element.style.height = `${height * scale}px`;
    }

    drawImage(image, x, y, width = 0, height = 0) {
        console.log('Drawing image', image, x, y, width, height);
        if(width === 0) width = image.width;
        if(height === 0) height = image.height;
        this.context.drawImage(image, x, y, width, height);
    }
}
