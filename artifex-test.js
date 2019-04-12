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

function getTouchType(safariType) {
    switch(safariType) {
        case 'direct':
        return 'finger';
        case 'stylue':
        return 'pen';
        default:
        return safariType;
    }
}

class Wow {
    constructor(svgEl) {
        this.svgEl = svgEl;
        this.svgEl.addEventListener('touchstart', (e) => {
            this.onTouchStart(e);
            // this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail: getCpEvent(0,0,'finger', 0)}));
        });
        this.svgEl.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.svgEl.addEventListener('touchend', (e) => this.onTouchEnd(e));
    }

    onTouchStart(e) {
        const bounding = this.svgEl.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const detail = {
            x: touch.clientX - bounding.x, 
            y: touch.clientY - bounding.y,
            type: getTouchType(e.targetTouches[0].touchType),
        };
        console.log('onTouchStart: (%o, %o), (%o, %o), (%o, %o)', 
            e.target.scrollLeft, e.target.scrollTop,
            e.target.clientLeft, e.target.clientTop,
            detail);
        
        this.svgEl.dispatchEvent(new CustomEvent('WowDown', {detail}));
    }
    onTouchMove(e) {
        const bounding = this.svgEl.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const detail = {
            x: touch.clientX - bounding.x, 
            y: touch.clientY - bounding.y,
            type: getTouchType(e.targetTouches[0].touchType),
        };
        this.svgEl.dispatchEvent(new CustomEvent('WowMove', {detail}));
    }
    onTouchEnd(e) {
        const bounding = this.svgEl.getBoundingClientRect();
        const detail = {
            x: e.target.x - bounding.x, 
            y: e.target.y - bounding.y,
        };

        console.log('onTouchEnd: (%o, %o), (%o, %o), detail: %o', 
            e.target.scrollLeft, e.target.scrollTop,
            e.target.clientLeft, e.target.clientTop,
            detail);
        this.svgEl.dispatchEvent(new CustomEvent('WowUp', {detail}));
    }
}

elementIds = new Set([]);

function tryInit() {
    svgEls = document.getElementsByClassName('boardsvg');
    Array.from(svgEls).forEach((svgEl) => {
        if (!elementIds.has(svgEl.id)) {
            if (svgEl.id === '') {
                svgEl.setAttribute('id', createUUID());
            }
            console.log("AFX:zhenqiangli %o", svgEl);
            elementIds.add(svgEl.id);
            new Wow(svgEl);
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


/* register SVG element listener.
window.setInterval(() => {
    tryInit();
}, 5000);
*/

window.addEventListener('touchstart', (e) => e.preventDefault());
window.addEventListener('touchmove', (e) => e.preventDefault());
window.addEventListener('touchend', (e) => e.preventDefault());

const metaTag=document.createElement('meta');
metaTag.name = "viewport"
metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
document.getElementsByTagName('head')[0].appendChild(metaTag);
