import {cleanNodes, replaceUnicode} from "../api/helpers.js";
import { generateTemplate } from "./title-component.template.js";

const titleAttributes = {
  LEVEL: "level",
  CUSTOM_STYLES: "custom-styles",
};

export class TitleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  #customStyles;
  #level;
  #slotObserver;
  #ATTRIBUTE_MAPPING = new Map([
    [titleAttributes.LEVEL, this.#setLevel.bind(this)],
    [titleAttributes.CUSTOM_STYLES, this.#setCustomStyles.bind(this)],
  ]);

  connectedCallback() {
    const config = { attributes: true, childList: true, characterData: true, subtree: true };
    this.#slotObserver = new MutationObserver(this.#observeChanges.bind(this));
    this.#slotObserver.observe(this, config);
    this.#render();
  }

  #observeChanges(mutationsList) {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        this.#render();
      }
    }
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
    this.#level = newLevel <= 6 ? newLevel : 1;
    this.#render();
  }

  #setCustomStyles(_, customStyles) {
    this.#customStyles = customStyles;
    this.#render();
  }

  #render(customStyles = this.#customStyles, level = this.#level, text = this.innerHTML) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate(customStyles, level, replaceUnicode(text));
    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
