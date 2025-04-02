export default class Animator {
    constructor(states, startingState, imageString) {
        this.STATES = states;

        this.imageString = imageString;

        this.currentState = startingState;
        this.stateIndex = 0;
        this.state = this.STATES[this.currentState][this.stateIndex];
    }

    getImageString() {
        return `${this.imageString}_${this.state}`;
    }

    update() {
        const stateImages = this.STATES[this.currentState];
        this.stateIndex = (this.stateIndex + 1) % stateImages.length; // Loop through the images
        this.state = stateImages[this.stateIndex];
    }
}
