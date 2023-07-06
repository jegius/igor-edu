import template from './link-component.template.js';
import events from "../api/events.js";
import {addListeners, removeListeners, select} from "../api/helpers";

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

    #listeners = [
        [select.bind(this, '.link'), 'click', this.#addEventListeners.bind(this)]
    ]

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
        this.#listeners.forEach(addListeners.bind(this));

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
        const element = this.#href !== '#' ? document.querySelector(this.#href) : null;

        if (element) {
            event.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
        }

        this.dispatchEvent(new CustomEvent(events.LINK_CLICKED, {bubbles: true, detail: this}));
    }

    static #setActive(element, isActive) {
        if (isActive === 'true') {
            element.classList.add('link_active')
        } else {
            element.classList.remove('link_active')
        }
    }

    disconnectedCallback() {
        this.#listeners.forEach(removeListeners);
    }

    #render() {
        const templateElem = document.createElement('template');
        templateElem.innerHTML = template;

        this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
        this.#link = this.shadowRoot.querySelector('.link')
    }
}