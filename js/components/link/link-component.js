import template from './link-component.template.js';

const linkAttributes = {
    LINK_TEXT: 'link-text',
    IS_ACTIVE: 'is-active',
    HREF: 'href'
}

export class LinkComponent extends HTMLElement {
    static get name() {
        return 'link-element'
    }
    #href;
    #link;

    #ATTRIBUTE_MAPPING = new Map([
        [linkAttributes.LINK_TEXT, LinkComponent.#setText],
        [linkAttributes.IS_ACTIVE, LinkComponent.#setActive],
        [linkAttributes.HREF, LinkComponent.#setHref]
    ])

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return Object.values(linkAttributes);
    }

    connectedCallback() {
        this.#render();
        this.#link.addEventListener('click', this.#addEventListeners.bind(this));

        for (let attrName of this.constructor.observedAttributes) {
            if (this.hasAttribute(attrName)) {
                const attrValue = this.getAttribute(attrName);
                this.attributeChangedCallback(attrName, null, attrValue);
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            const callback = this.#ATTRIBUTE_MAPPING.get(name);
            this.#selectAndCallIfExist(callback, newValue);
        }
    }

    #selectAndCallIfExist(callback, value) {
        if (this.#link) {
            callback.call(this, this.#link, value)
        }
    }

    static #setText(element, newText) {
        element.innerHTML = newText;
    }

    static #setHref(element, newHref) {
        this.#href = newHref;
        if (element) {
            element.setAttribute('href', newHref)
        }
    }

    #addEventListeners(event) {
        const element = document.querySelector(this.#href);

        if (element) {
            event.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    static #setActive(element, isActive) {
        if (isActive === 'true') {
            element.classList.add('link_active')
        } else {
            element.classList.remove('link_active')
        }
    }

    disconnectedCallback() {
        removeEventListener(this.#link, this.#addEventListeners.bind(this))
    }

    #render() {
        const templateElem = document.createElement('template');
        templateElem.innerHTML = template;

        this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
        this.#link = this.shadowRoot.querySelector('.link')
    }
}