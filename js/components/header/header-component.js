import { generateTemplate } from "./header-component.template.js";
// const imageSrc = "../../../img/logo_vector.svg";

const headerAttributes = {
  POSITION: "position",
};

export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #imageSrc;

  static get name() {
    return "header-component";
  }

  async connectedCallback() {
    try {
      this.#addPositionByScroll();
    } catch (error) {
      console.log("ошибка");
    }

    const links = await this.#getHeaderConfig();
    this.#render(links);
  }

  static get observedAttributes() {
    return Object.values(headerAttributes);
  }

  #addPositionByScroll() {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 20) {
        this.shadowRoot.querySelector(".header").classList.add("_fixed");
      }

      if (window.scrollY < 20) {
        this.shadowRoot.querySelector(".header").classList.remove("_fixed");
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  async #getHeaderConfig() {
    const imageSrc = await fetch("../../../img/logo_vector.svg");
    this.#imageSrc = imageSrc.url;
    return [
      { text: "first", href: "#" },
      { text: "second", href: "#" },
      { text: "third", href: "#" },
    ];
  }

  #render(links, imageSrc = this.#imageSrc) {
    const template = document.createElement("template");

    template.innerHTML = generateTemplate(links, imageSrc);
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}
