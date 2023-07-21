import generateTemplate from "./logo-component.template.js";
import { utils } from "../api/helpers.js";

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

  #Logo;
  #Image;
  #customStyles;
  #Href;

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
      if (this.#Logo) {
        callback(this, newValue);
      }
    }
  }

  #setHref(element, newHref) {
    this.#Href = element.shadowRoot.querySelector(".logo-href");
    this.#Href.setAttribute("href", newHref);
    const isClickable =
      !!this.#Href.hasAttribute("href") &&
      this.#Href.getAttribute("href") !== "";
    utils(this.#Href, isClickable);
  }

  #setText(element, newText) {
    const textNode = element.shadowRoot.querySelector(".logo-brandname");
    textNode.innerText = newText;
  }

  #applyStyles(element, customStyles) {
    this.#customStyles = customStyles;
    this.#render(this.#customStyles);
  }

  #cleanNodes(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
    return node;
  }

  #render(customStyles) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = generateTemplate(customStyles);

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#Logo = this.shadowRoot.querySelector(".logo");
    this.#Href = this.shadowRoot.querySelector(".logo-href");
    this.#cleanNodes(this.shadowRoot).appendChild(
      templateElem.content.cloneNode(true)
    );
  }
}
