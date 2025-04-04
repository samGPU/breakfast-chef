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
    
        // Calculate scale based on the aspect ratio
        const aspectRatio = 1;
        let newWidth = innerWidth * 0.9; // 90% of window width
        let newHeight = newWidth / aspectRatio;
    
        // Ensure it fits within the window height
        if (newHeight > innerHeight * 0.9) {
            newHeight = innerHeight * 0.9; // 90% of window height
            newWidth = newHeight * aspectRatio;
        }
    
        element.style.width = `${newWidth}px`;
        element.style.height = `${newHeight}px`;
        element.width = newWidth;
        element.height = newHeight;
    
        this.width = newWidth;
        this.height = newHeight;
    
        console.log('Resized canvas to:', newWidth, newHeight);

        // Resize the game container to the correct width to move the UI elements
        const container = document.getElementById("ui");
        console.log(container)
        container.style.width = `${this.width - 20}px`;
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

            if (x === 'right') {
                // Place image all the way to the right
                x = this.width - width; 
            }
        }
    
        this.context.drawImage(image, x, y, width, height);
    }
}
