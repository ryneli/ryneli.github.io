(function() {
    class NotePad extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
            <svg id='notepad-svg' style='width: 90vw; height: 90vh; background-color: green;'>
            </svg>`
            this.svgcontainer = document.getElementById('notepad');
            this.svg = document.getElementById('notepad-svg');
            this.initListeners();
            this.movable = new Movable(this.svgcontainer);
            this.drawable = new Drawable(this.svg);
        }

        getTouchType(inType) {
            switch(inType) {
                case 'direct':
                    return 'touch';
                case 'stylus':
                    return 'pen';
                default:
                    return inType;
            }
        }

        startAction(x, y, touchType) {
            if (touchType === 'touch') {
                this.movable.startMove(x, y);
            } else if (touchType === 'pen' || touchType === 'mouse') {
                this.drawable.startStroke(x, y);
            }
        }
        updateAction(x, y, touchType) {
            if (touchType === 'touch') {
                this.movable.updateMove(x, y);
            } else if (touchType === 'pen' || touchType === 'mouse') {
                this.drawable.updateStroke(x, y);
            }
        }
        endAction(x, y, touchType) {
            if (touchType === 'touch') {
                this.movable.endMove(x, y);
            } else if (touchType === 'pen' || touchType === 'mouse') {
                this.drawable.endStroke(x, y);
            }
        }

        initListeners() {
            this.svgcontainer.addEventListener("touchstart", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.startAction(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("touchmove", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.updateAction(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("touchend", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.endAction(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("mousedown", (e) => {
                this.startAction(e.clientX, e.clientY, 'mouse');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("mousemove", (e) => {
                this.updateAction(e.clientX, e.clientY, 'mouse');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("mouseup", (e) => {
                this.endAction(e.clientX, e.clientY, 'mouse');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("pointerdown", (e) => {
                this.startAction(e.clientX, e.clientY, e.pointerType);
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("pointermove", (e) => {
                this.updateAction(e.clientX, e.clientY, e.pointerType);
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("pointerup", (e) => {
                this.endAction(e.clientX, e.clientY, e.pointerType);
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }

    class Drawable {
        constructor(targetSvg) {
            this.svg = targetSvg;
            this.initPath();
        }

        initPath() {
            this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.path.setAttribute('stroke', 'black');
            this.path.setAttribute('fill', 'none');
            this.path.setAttribute('stroke-width', '3');
            this.d = '';
        }

        startStroke(x, y) {
            this.initPath();
            this.d = `M ${x} ${y}`;
            this.svg.append(this.path);
        }

        updateStroke(x, y) {
            if (this.d.startsWith('M')) {
                this.d = `${this.d} L ${x} ${y}`;
                this.path.setAttribute('d', `${this.d}`);
            }
        }

        endStroke(x, y) {
            this.initPath();
        }
    }

    class Movable {
        constructor(target) {
            this.target = target;
        }
        resetMoving() {
            this.moving = false;
        }

        setMoving() {
            this.moving = true;
        }

        isMoving() {
            return this.moving;
        }

        startMove(x, y) {
            console.log('startMove: (%o, %o)', x, y);
            this.setMoving();
            this.targetLeft = this.target.offsetLeft;
            this.targetTop = this.target.offsetTop;
            this.startX = x;
            this.startY = y;
        }

        updateMove(x, y) {
            if (this.moving) {
                const calX = this.targetLeft + x - this.startX;
                const calY = this.targetTop + y - this.startY
                this.target.style.left = calX + 'px';
                this.target.style.top = calY + 'px';
                console.log('updateMove: (%o, %o) %o', calX, calY, this.target);
            }
        }

        endMove(x, y, type) {
            console.log('endMove: (%o, %o)', x, y);
            this.resetMoving();
        }
    }
  
    window.customElements.define('note-pad', NotePad);
  })();
