import { generateTemplate } from "./header-component.template.js";
const imageSrc = "../../../img/logo__vector.svg";
const headerAttributes = {
  POSITION: "position",
};

export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #position;
  #imageSrc;

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
    return Object.values(headerAttributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      callback(name, newValue);
    }
  }

  #setPosition(_, position) {
    this.#position = position;
    this.#imageSrc = imageSrc;
  }

  #render(position = this.#position, imageSrc = this.#imageSrc) {
    const template = document.createElement("template");

    template.innerHTML = generateTemplate(position, imageSrc);
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}
