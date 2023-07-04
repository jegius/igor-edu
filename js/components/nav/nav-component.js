import template from "../nav/nav-component.template.js";

export class NavComponent extends HTMLElement {
    #slot;
    #list;

    static get name() {
        return 'nav-element'
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.#render();
        this.#slot.addEventListener('slotchange', this.#onSlotChange.bind(this))
    }

    #onSlotChange({target}) {
        const nodes = target.assignedNodes();
        const list = document.createElement('ul');
        list.classList.add('nav__list');

        const renderNode = node => {
            const li = document.createElement('li');
            li.appendChild(node);
            list.appendChild(li);
        }

        nodes.forEach(renderNode);
        this.#slot.innerHTML = '';
        this.#list.appendChild(list)
    }

    disconnectedCallback() {
        removeEventListener(this.#slot, this.#onSlotChange.bind(this))
    }

    #render() {
        const templateElem = document.createElement('template');
        templateElem.innerHTML = template;

        this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
        this.#slot = this.shadowRoot.querySelector('slot');
        this.#list = this.shadowRoot.querySelector('.nav');
    }
}