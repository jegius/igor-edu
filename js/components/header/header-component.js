import { generateTemplate } from "./header-component.template.js";
const headerAttributes = {
  POSITION: "position",
};

export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #position;

  #ATTRIBUTE_MAPPING = new Map([
    [headerAttributes.POSITION, this.#setPosition.bind(this)],
  ]);

  static get name() {
    return "header-component";
  }

  connectedCallback() {
    this.#render();
  }

  static get observedAttributes() {
    console.log(this.constructor.observerAttributes);
    return Object.values(headerAttributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name);
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      callback(name, newValue);
    }
  }

  #setPosition(element, position) {
    this.#position = position;
    console.log(position + "привет");
  }

  #render(position = this.#position) {
    const template = document.createElement("template");

    template.innerHTML = generateTemplate(position);
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}
