(function() {
    const template = document.createElement('template');
  
    template.innerHTML = `
        <style>
          #notepad {
              position: absolute;
            font-size: 2.5rem;
            color: hotpink;
            font-family: monospace;
            text-align: center;
            text-decoration: pink solid underline;
            text-decoration-skip: ink;
            width: 10em;
            height: 10em;
            top: 2em;
            left: 2em;
            background-color: green;
          }
        </style>
        <svg id='notepad'>svg is not support here</svg>
    `;
  
    class NotePad extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.svg = this.shadowRoot.getElementById('notepad');
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

    class MovableNotePad extends NotePad {
        constructor() {
            super();
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
            return !!this.moving;
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
            this.svg.addEventListener("touchstart", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.startMove(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
            });
            this.svg.addEventListener("touchmove", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.updateMove(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
            });
            this.svg.addEventListener("touchend", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.endMove(touch.clientX - rect.left, touch.clientY - rect.top, getTouchType(touch.touchType));
                e.preventDefault();
            });
            this.svg.addEventListener("mousedown", (e) => {
                this.startMove(e.offsetX, e.offsetY, 'mouse');
                e.preventDefault();
            });
            this.svg.addEventListener("mousemove", (e) => {
                this.updateMove(e.offsetX, e.offsetY, 'mouse');
                e.preventDefault();
            });
            this.svg.addEventListener("mouseup", (e) => {
                this.endMove(e.offsetX, e.offsetY, 'mouse');
                e.preventDefault();
            });
            this.svg.addEventListener("pointerdown", (e) => {
                this.startMove(e.offsetX, e.offsetY, e.pointerType);
                e.preventDefault();
            });
            this.svg.addEventListener("pointermove", (e) => {
                this.updateMove(e.offsetX, e.offsetY, e.pointerType);
                e.preventDefault();
            });
            this.svg.addEventListener("pointerup", (e) => {
                this.endMove(e.offsetX, e.offsetY, e.pointerType);
                e.preventDefault();
            });
        }

        startMove(x, y, type) {
            if (type === 'pen') {
                this.startStroke(x, y);
            } else if (type === 'touch' || type === 'mouse') {
                this.setMoving();
                this.svg.style.left = x;
                this.svg.style.top = y;
            }
        }
        updateMove(x, y, type) {
            if (type === 'pen') {
                this.updateStroke(x, y);
            } else if ((type === 'touch' || type === 'mouse') && this.isMoving()) {
                this.svg.style.left = x;
                this.svg.style.top = y;
            }
        }
        endMove(x, y, type) {
            if (type === 'pen') {
                this.endStroke(x, y);
            } else if (type === 'touch' || type === 'mouse') {
                this.resetMoving();
                this.svg.style.left = x;
                this.svg.style.top = y;
            }
        }
    }
  
    window.customElements.define('note-pad', MovableNotePad);
  })();
