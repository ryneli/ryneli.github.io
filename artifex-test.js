class Wow {
    constructor(svgEl, startStrokeFn, updateStrokeFn, endStrokeFn) {
        this.svgEl = svgEl;
        this.startStrokeFn = startStrokeFn;
        this.updateStrokeFn = updateStrokeFn;
        this.endStrokeFn = endStrokeFn;
        this.svgEl.addEventListener('pointerdown', (e) => {
            console.log('artifex pointerdown %o', e);
            this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: {x: 0, y: 0}}));
        });
        this.svgEl.addEventListener('mousedown', (e) => {
            console.log('artifex mousedown %o', e);
            this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: {x: 0, y: 0}}));
        });
        this.svgEl.addEventListener('touchstart', (e) => {
            console.log('artifex touchstart %o', e);
            this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: {x: 0, y: 0}}));
        });
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

elementIds = new Set([]);

function tryInit() {
    svgEls = document.getElementsByClassName('boardsvg');
    console.log("AFX:zhenqiangli %o", svgEls);
    Array.from(svgEls).forEach((svgEl) => {
        if (!elementIds.has(svgEl.id)) {
            new Wow(svgEl, ()=>{}, ()=>{}, ()=>{});
        }
    });
}


window.setInterval(() => {
    tryInit();
}, 5000);


