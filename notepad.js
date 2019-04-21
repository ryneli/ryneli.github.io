(function() {
    class NotePad extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
            <svg id='notepad-001-svg' style='height:100%; width:100%;'>
            </svg>`
            this.svgcontainer = document.getElementById('notepad-001');
            this.svg = document.getElementById('notepad-001-svg');
            this.initListeners();
            this.movable = new Movable(this.svgcontainer);
            this.drawable = new Drawable(this.svg);
            this.currentActioner = null;
        }

        setBackground() {
            pdfSetBackground(this.svgcontainer);
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
                this.currentActioner = this.movable;
            } else if (touchType === 'pen' || touchType === 'mouse') {
                this.currentActioner = this.drawable;
            }

            if (this.currentActioner !== null) {
                this.currentActioner.startAction(x, y);
            }
        }
        updateAction(x, y, touchType) {
            if (this.currentActioner !== null) {
                this.currentActioner.updateAction(x, y);
            }
        }
        endAction(x, y, touchType) {
            if (this.currentActioner !== null) {
                this.currentActioner.endAction(x, y);
            }
        }

        initListeners() {
            document.addEventListener('keydown', (e) => {
                console.log('keydown %o', e);
                switch (e.key) {
                    case 'b':
                    if (e.altKey) {
                        this.setBackground();
                    }
                    break;
                    case 'ArrowRight':
                    if (e.altKey) {
                        this.setBackground();
                    }
                    break;
                    default:
                    // do nothing
                }
            });
            this.svgcontainer.addEventListener("touchstart", (e) => {
                console.log('touchstart %o', e);
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.startAction(
                    touch.clientX - rect.left, 
                    touch.clientY - rect.top, 
                    this.getTouchType(touch.touchType));
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("touchmove", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.updateAction(
                    touch.clientX - rect.left, 
                    touch.clientY - rect.top, 
                    this.getTouchType(touch.touchType));
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("touchend", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.endAction(-1, -1, 'unknown');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("mousedown", (e) => {
                const rect = this.svgcontainer.getBoundingClientRect();
                this.startAction(e.clientX - rect.left, e.clientY - rect.top, 'mouse');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("mousemove", (e) => {
                const rect = this.svgcontainer.getBoundingClientRect();
                this.updateAction(e.clientX - rect.left, e.clientY - rect.top, 'mouse');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("mouseup", (e) => {
                const rect = this.svgcontainer.getBoundingClientRect();
                this.endAction(e.clientX - rect.left, e.clientY - rect.top, 'mouse');
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("pointerdown", (e) => {
                const rect = this.svgcontainer.getBoundingClientRect();
                this.startAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("pointermove", (e) => {
                const rect = this.svgcontainer.getBoundingClientRect();
                this.updateAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
                e.preventDefault();
                e.stopPropagation();
            });
            this.svgcontainer.addEventListener("pointerup", (e) => {
                const rect = this.svgcontainer.getBoundingClientRect();
                this.endAction(e.clientX - rect.left, e.clientY - rect.top, e.pointerType);
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

        startAction(x, y) {
            this.initPath();
            this.d = `M ${x} ${y}`;
            this.svg.append(this.path);
        }

        updateAction(x, y) {
            if (this.d.startsWith('M')) {
                this.d = `${this.d} L ${x} ${y}`;
                this.path.setAttribute('d', `${this.d}`);
            }
        }

        endAction(x, y) {
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

        startAction(x, y) {
            console.log('startMove: (%o, %o)', x, y);
            this.setMoving();
            this.targetLeft = this.target.offsetLeft;
            this.targetTop = this.target.offsetTop;
            this.startX = x;
            this.startY = y;
        }

        updateAction(x, y) {
            if (this.moving) {
                const calX = this.targetLeft + x - this.startX;
                const calY = this.targetTop + y - this.startY
                this.target.style.left = calX + 'px';
                this.target.style.top = calY + 'px';
                console.log('updateMove: (%o, %o) %o', calX, calY, this.target);
            }
        }

        endAction(x, y) {
            console.log('endMove: (%o, %o)', x, y);
            this.resetMoving();
        }
    }
  
    window.customElements.define('note-pad', NotePad);
  })();
