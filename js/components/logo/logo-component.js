import {
  generateTemplateWithLink,
  generateTemplateWithoutLink,
} from "./logo-component.template.js";
import { cleanNodes } from "../api/helpers.js";

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
  #logoText;

  #ATTRIBUTE_MAPPING = new Map([
    [logoAttributes.HREF, this.#setHref.bind(this)],
    [logoAttributes.TEXT, this.#setText.bind(this)],
    [logoAttributes.CUSTOM_STYLES, this.#applyStyles.bind(this)],
  ]);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

  #setHref(_, newHref) {
    this.#href = newHref;
    this.#render();
  }

  #setText(_, newText) {
    this.#logoText = newText;
    this.#render();
  }

  #applyStyles(_, customStyles) {
    this.#customStyles = customStyles;
    this.#render();
  }

  #render(
    customStyles = this.#customStyles,
    href = this.#href,
    text = this.#logoText
  ) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplateWithLink(customStyles);

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#logo = this.shadowRoot.querySelector(".logo");

    const templateGenerator = href
      ? generateTemplateWithLink
      : generateTemplateWithoutLink;

    template.innerHTML = templateGenerator(customStyles, href, text);
    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
