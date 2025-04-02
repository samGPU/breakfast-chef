export default class Animator {
    constructor(states, startingState, imageString) {
        this.STATES = states;

        this.imageString = imageString;

        this.stateKeys = Object.keys(states); // Store the state keys in order
        this.currentState = startingState;
        this.stateIndex = 0;
        this.state = this.STATES[this.currentState].frames[this.stateIndex];
    }

    getImageString() {
        return `${this.imageString}_${this.state}`;
    }

    update() {
        const currentStateObj = this.STATES[this.currentState];
        const stateImages = currentStateObj.frames;

        // Update the frame index
        this.stateIndex++;

        if (this.stateIndex >= stateImages.length) {
            // If loop is false, move to the next state
            if (!currentStateObj.loop) {
                const currentIndex = this.stateKeys.indexOf(this.currentState);
                const nextIndex = (currentIndex + 1) % this.stateKeys.length; // Wrap around if at the end
                this.currentState = this.stateKeys[nextIndex];
                this.stateIndex = 0; // Reset frame index for the new state
            } else {
                // If loop is true, reset to the first frame
                this.stateIndex = 0;
            }
        }

        // Update the current frame
        this.state = this.STATES[this.currentState].frames[this.stateIndex];
    }

    nextState() {
        const currentIndex = this.stateKeys.indexOf(this.currentState);
        const nextIndex = (currentIndex + 1) % this.stateKeys.length; // Wrap around if at the end
        this.currentState = this.stateKeys[nextIndex];
        this.stateIndex = 0; // Reset frame index for the new state
    }
}
