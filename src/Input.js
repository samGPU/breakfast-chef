export default class Input {
    constructor(experience, startingPattern) {
        this.pattern = startingPattern + startingPattern;
        this.inputString = [];
        this.experience = experience;

        this.matches = false;

        window.addEventListener('keydown', (e) => {
            if(this.experience.showRecipes) return;

            this.experience.chef.addToFrameBuffer();

            if(e.key === 'ArrowLeft') {
                this.inputString.push('<');
            } else if(e.key === 'ArrowUp') {
                this.inputString.push('^');
            } else if(e.key === 'ArrowRight') {
                this.inputString.push('>');
            } else if(e.key === 'ArrowDown') {
                this.inputString.push('v');
            }

            if(this.inputString.length > 8) {
                this.inputString.shift();
            }

            this.matches = this.validatePattern(this.inputString.join(''))
        })
    }

    validatePattern(inputString) {
        console.log(inputString)
        if(inputString.length !== 8) return false;

        return this.pattern.includes(inputString);
    }

    reset() {
        this.matches = false;
        this.inputString = [];
    }

    setPattern(pattern) {
        this.pattern = pattern + pattern;
    }
}
