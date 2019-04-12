(function() {
    const template = document.createElement('template');
  
    template.innerHTML = `
        <style>
          #notepad {
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
            this.initListeners();
        }

        

        initPath() {
            this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.path.setAttribute('stroke', 'black');
            this.path.setAttribute('fill', 'none');
            this.path.setAttribute('stroke-width', '3');
            this.d = '';
        }

        initListeners() {
            this.svg.addEventListener("touchstart", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                const touch = e.touches[0];
                this.startStroke(touch.clientX - rect.left, touch.clientY - rect.top);
                e.preventDefault();
            });
            this.svg.addEventListener("touchmove", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                this.updateStroke(touch.clientX - rect.left, touch.clientY - rect.top);
                e.preventDefault();
            });
            this.svg.addEventListener("touchend", (e) => {
                const rect = e.srcElement.getBoundingClientRect();
                this.endStroke(touch.clientX - rect.left, touch.clientY - rect.top);
                e.preventDefault();
            });
            this.svg.addEventListener("mousedown", (e) => {
                this.startStroke(e.offsetX, e.offsetY);
                e.preventDefault();
            });
            this.svg.addEventListener("mousemove", (e) => {
                this.updateStroke(e.offsetX, e.offsetY);
                e.preventDefault();
            });
            this.svg.addEventListener("mouseup", (e) => {
                this.endStroke(e.offsetX, e.offsetY);
                e.preventDefault();
            });
            this.svg.addEventListener("pointerdown", (e) => {
                this.startStroke(e.offsetX, e.offsetY);
                e.preventDefault();
            });
            this.svg.addEventListener("pointermove", (e) => {
                this.updateStroke(e.offsetX, e.offsetY);
                e.preventDefault();
            });
            this.svg.addEventListener("pointerup", (e) => {
                this.endStroke(e.offsetX, e.offsetY);
                e.preventDefault();
            });
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
  
    window.customElements.define('note-pad', NotePad);
  })();
