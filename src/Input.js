export default class Input {
    constructor(startingPattern) {
        this.pattern = startingPattern + startingPattern;
        this.inputString = [];

        this.matches = false;

        window.addEventListener('keydown', (e) => {
            // console.log(e.key);
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

    setPattern(pattern) {
        this.pattern = pattern + pattern;
    }
}
