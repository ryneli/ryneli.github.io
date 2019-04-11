function getCpEvent(x, y, touchType, id) {
    return {
        x,
        y,
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        pressure: null,
        timeStamp: 0,  // timeStamp of this pointer
        id,
        type: touchType,  // stylus/pen, finger/direct, mouse
        target: null,
    };
}

class Wow {
    constructor(svgEl, startStrokeFn, updateStrokeFn, endStrokeFn) {
        this.svgEl = svgEl;
        this.startStrokeFn = startStrokeFn;
        this.updateStrokeFn = updateStrokeFn;
        this.endStrokeFn = endStrokeFn;
        this.svgEl.addEventListener('pointerdown', (e) => {
            console.log('artifex pointerdown %o', e);
            this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: getCpEvent(0,0,'finger', 0)}));
        });
        this.svgEl.addEventListener('mousedown', (e) => {
            console.log('artifex mousedown %o', e);
            this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: getCpEvent(0,0,'finger', 0)}));
        });
        this.svgEl.addEventListener('touchstart', (e) => {
            console.log('artifex touchstart %o', e);
            this.onTouchStart(e);
            // this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: getCpEvent(0,0,'finger', 0)}));
        });
        this.svgEl.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.svgEl.addEventListener('touchend', (e) => this.onTouchEnd(e));
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
            if (svgEl.id === '') {
                svgEl.setAttribute('id', createUUID());
            }
            elementIds.add(svgEl.id);
            new Wow(svgEl, ()=>{}, ()=>{}, ()=>{});
        }
    });
}

function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


window.setInterval(() => {
    tryInit();
}, 5000);


