(function() {
    const template = document.createElement('template');
  
    template.innerHTML = `
        <style>
          .notepad {
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
        <svg class='notepad'>svg is not support here</svg>
    `;
  
    class NotePad extends HTMLElement {
      constructor() {
        super();
  
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
  
    window.customElements.define('note-pad', NotePad);
  })();
