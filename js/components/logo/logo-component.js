import generateTemplate from "./logo-component.template.js";
import { installingTheClass } from "../api/helpers.js";
import { classes } from "../api/classes.js";

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

  #setHref(element, newHref) {
    this.#href = element.shadowRoot.querySelector(".logo-href");
    this.#href.setAttribute("href", newHref);
    const isClickable = !!newHref;
    installingTheClass(this.#href, isClickable, classes.CLICKABLE);
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
      this.#cleanNodes(node.lastChild)
      node.removeChild(node.lastChild);
    }
    return node;
  }

  #render(customStyles) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = generateTemplate(customStyles);

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#logo = this.shadowRoot.querySelector(".logo");
    this.#href = this.shadowRoot.querySelector(".logo-href");

    this
      .#cleanNodes(this.shadowRoot)
      .appendChild(
        templateElem.content.cloneNode(true)
    );
  }
}
