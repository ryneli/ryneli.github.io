console.log("artifex test");

class Wow {
    constructor(svgEl, startStrokeFn, updateStrokeFn, endStrokeFn) {
        this.svgEl = svgEl;
        this.startStrokeFn = startStrokeFn;
        this.updateStrokeFn = updateStrokeFn;
        this.endStrokeFn = endStrokeFn;
    }

    onTouchStart(e) {
        console.log('artifex: %o', e);
    }
    onTouchMove(e) {
        console.log('artifex: %o', e);
    }
    onTouchEnd(e) {
        console.log('artifex: %o', e);
    }
}