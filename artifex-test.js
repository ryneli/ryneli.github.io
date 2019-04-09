console.log("artifex test");

class Wow {
    constructor(svgEl, startStrokeFn, updateStrokeFn, endStrokeFn) {
        this.svgEl = svgEl;
        this.startStrokeFn = startStrokeFn;
        this.updateStrokeFn = updateStrokeFn;
        this.endStrokeFn = endStrokeFn;
        this.svgEl.addEventListener('pointerdown', (e) => console.log('artifex %o', e));
    }

    onTouchStart(e) {
        console.log('artifex: %o', e);
        this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: {x: 0, y: 0}}));
    }
    onTouchMove(e) {
        console.log('artifex: %o', e);
    }
    onTouchEnd(e) {
        console.log('artifex: %o', e);
    }
}

svgEls = document.getElementsByClassName('boardsvg');
Array.from(svgEls).forEach((svgEl) => {
    new Wow(svgEl, ()=>{}, ()=>{}, ()=>{});
});
