(function() {
    const template = document.createElement('template');
  
    template.innerHTML = `
        <style>
          .notepad {
            position: absolute;
            width: 10em;
            height: 10em;
            top: 2em;
            left: 2em;

            font-size: 2.5rem;
            color: hotpink;
            font-family: monospace;
            text-align: center;
            text-decoration: pink solid underline;
            text-decoration-skip: ink;
            background-color: green;
          }
        </style>
        <svg id='notepad' style='position: absolute; width: 10em; height: 10em; background-color: green;'>svg is not support here</svg>
    `;
  
    class NotePad extends HTMLElement {

        connectedCallback() {
            this.innerHTML = `
            <svg id='notepad' style='width=10em; height=10em; background-color=green'>
            </svg>`
            this.svg = document.getElementById('notepad');
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
            this.initPath()
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

    class MovableNotePad extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
            <svg style='width: 10em; height: 10em; background-color: green'>
            </svg>`
            this.svgcontainer = document.getElementById('notepad');
            this.initListeners();
            this.resetMoving();
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

        initListeners() {
            this.svgcontainer.addEventListener("touchstart", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.startMove(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("touchmove", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.updateMove(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("touchend", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.endMove(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("mousedown", (e) => {
                this.startMove(e.clientX, e.clientY, 'mouse');
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("mousemove", (e) => {
                this.updateMove(e.clientX, e.clientY, 'mouse');
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("mouseup", (e) => {
                this.endMove(e.clientX, e.clientY, 'mouse');
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("pointerdown", (e) => {
                this.startMove(e.clientX, e.clientY, e.pointerType);
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("pointermove", (e) => {
                this.updateMove(e.clientX, e.clientY, e.pointerType);
                e.preventDefault();
            });
            this.svgcontainer.addEventListener("pointerup", (e) => {
                this.endMove(e.clientX, e.clientY, e.pointerType);
                e.preventDefault();
            });
        }

        startMove(x, y, type) {
            if (type === 'pen') {
                this.startStroke(x, y);
            } else if (type === 'touch' || type === 'mouse') {
                console.log('startMove: (%o, %o) %o', x, y, type);
                this.setMoving();
                this.svgOldX = this.svgcontainer.offsetLeft;
                this.svgOldY = this.svgcontainer.offsetTop;
                this.startX = x;
                this.startY = y;
            }
        }
        updateMove(x, y, type) {
            if (type === 'pen') {
                this.updateStroke(x, y);
            } else if ((type === 'touch' || type === 'mouse') && this.isMoving()) {
                const calX = this.svgOldX + x - this.startX;
                const calY = this.svgOldY + y - this.startY
                this.svgcontainer.style.left = calX + 'px';
                this.svgcontainer.style.top = calY + 'px';
                console.log('updateMove: (%o, %o) %o %o', calX, calY, type, this.svgcontainer);
            }
        }
        endMove(x, y, type) {
            if (type === 'pen') {
                this.endStroke(x, y);
            } else if (type === 'touch' || type === 'mouse') {
                console.log('endMove: (%o, %o) %o', x, y, type);
                this.resetMoving();
            }
        }
    }
  
    window.customElements.define('note-pad', MovableNotePad);
  })();
