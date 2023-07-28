import { generateTemplate } from "./title-component.template.js";

export class TitleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#render();
  }

  static get name() {
    return "title-component";
  }

  #render() {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate();

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
