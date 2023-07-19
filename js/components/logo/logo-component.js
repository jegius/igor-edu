import template from "./logo-component.template.js";
import { utils } from "../api/helpers.js";

const logoAttributes = {
  IMAGE_URL: "image-url",
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

  #navbarLogo;

  #ATTRIBUTE_MAPPING = new Map([
    [logoAttributes.IMAGE_URL, this.#setImage.bind(this)],
    [logoAttributes.HREF, this.#setHref.bind(this)],
    [logoAttributes.TEXT, this.#setText.bind(this)],
    [logoAttributes.CUSTOM_STYLES, this.#setCustomStyles.bind(this)],
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
      if (this.#navbarLogo) {
        callback(this, newValue);
      }
    }
  }

  #setHref(element, newHref) {
    const isClickable = !!element.getAttribute("href");
    element.setAttribute("href", newHref);
    utils(element, isClickable);
  }
  #setImage(element, newSrc) {
    const imageNode = element.shadowRoot.querySelector(".logo-image");
    imageNode.style.background = `url(${newSrc})`;
  }

  #setText(element, newText) {
    const textNode = element.shadowRoot.querySelector(".logo-brandname");
    textNode.innerText = newText;
  }

  #setCustomStyles(element, styles) {
    const style = document.createElement("style");
    style.innerHTML = styles;
    element.appendChild(style);
  }

  #render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = template;

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#navbarLogo = this.shadowRoot.querySelector(".navbar-logo");
  }
}