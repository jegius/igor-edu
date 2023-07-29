import { cleanNodes } from "../api/helpers.js";
import { generateTemplate } from "./title-component.template.js";

const titleAttributes = {
  LEVEL: "level",
  TEXT: "text",
};

export class TitleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  #level;
  #text;

  #ATTRIBUTE_MAPPING = new Map([
    [titleAttributes.LEVEL, this.#setLevel.bind(this)],
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

  #setText(_, newText) {
    this.#text = newText;
    this.#render();
  }

  #render(level = this.#level, text = this.#text) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate(level, text);

    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
