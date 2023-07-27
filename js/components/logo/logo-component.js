import {
    generateTemplateWithLink,
    generateTemplateWithoutLink,
} from "./logo-component.template.js";
import {cleanNodes} from "../api/helpers.js";

const logoAttributes = {
    HREF: "href",
    TEXT: "text",
    CUSTOM_STYLES: "custom-styles",
};

export class LogoComponent extends HTMLElement {
    static get name() {
        return "logo-component";
    }

    static get observedAttributes() {
        return Object.values(logoAttributes);
    }

    #logo;
    #customStyles;
    #href;

    #ATTRIBUTE_MAPPING = new Map([
        [logoAttributes.HREF, this.#setHref.bind(this)],
        [logoAttributes.TEXT, LogoComponent.#setText.bind(this)],
        [logoAttributes.CUSTOM_STYLES, this.#applyStyles.bind(this)],
    ]);

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.#render();
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
            if (this.#logo) {
                callback(this, newValue);
            }
        }
    }

    #setHref(element, newHref) {
        this.#href = newHref;
        this.#render(this.#customStyles, this.#href);
    }

    static #setText(element, newText) {
        const textNode = element.shadowRoot.querySelector(".logo-brand-name");
        textNode.innerText = newText;
    }

    #applyStyles(element, customStyles) {
        this.#customStyles = customStyles;
        this.#render(this.#customStyles, this.#href);
    }

    #render(customStyles, href = this.#href) {
        const template = document.createElement("template");
        template.innerHTML = generateTemplateWithLink(customStyles);

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#logo = this.shadowRoot.querySelector(".logo");

        const templateGenerator =  href
            ? generateTemplateWithLink
            : generateTemplateWithoutLink;

        template.innerHTML = templateGenerator(customStyles, href)

        cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
    }
}
