import { cleanNodes } from "../api/helpers.js";
import { generateTemplate } from "./title-component.template.js";

const titleAttributes = {
  LEVEL: "level",
  CUSTOM_STYLES: "custom-styles",
  TEXT: "text",
};

export class TitleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  #customStyles;
  #level;

  #ATTRIBUTE_MAPPING = new Map([
    [titleAttributes.LEVEL, this.#setLevel.bind(this)],
    [titleAttributes.CUSTOM_STYLES, this.#setCustomStyles.bind(this)],
    [titleAttributes.TEXT, this.#setText.bind(this)],
  ]);

  connectedCallback() {
    this.#render();
  }

  static get observedAttributes() {
    return Object.values(titleAttributes);
  }

  static get name() {
    return "title-component";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      callback(this, newValue);
    }
  }

  #setLevel(_, newLevel) {
    this.#level = newLevel;
    this.#render();
  }

  #setCustomStyles(_, customStyles) {
    this.#customStyles = customStyles;
    this.#render();
  }

  #setText(element, newText) {
    element.shadowRoot.querySelector(".title").innerHTML = newText;
  }

  #render(customStyles = this.#customStyles, level = this.#level) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate(customStyles, level);

    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
