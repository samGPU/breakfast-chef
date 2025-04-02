import { Images }  from './Images';

export default class Canvas {
    constructor(canvas) {
        this.element = canvas;
        this.context = canvas.getContext('2d');
        this.context.imageSmoothingEnabled = true;
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

        const newWidth = width * scale * 0.9;
        const newHeight = height * scale;

        element.style.width = `${newWidth}px`;
        element.style.height = `${newHeight}px`;
        element.width = newWidth;
        element.height = newHeight;

        this.width = newWidth;
        this.height = newHeight;
    }

    drawImage(image, x, y, width = 0, height = 0) {
        if (image === undefined) {
            console.error('Image is undefined');
            return;
        }
    
        if (width === 0 && height === 0) {
            // Scale the image to fit the canvas height
            const aspectRatio = image.width / image.height;
            height = this.height; // Set height to canvas height
            width = height * aspectRatio; // Calculate width to maintain aspect ratio
        }
    
        this.context.drawImage(image, x, y, width, height);
    }
}
