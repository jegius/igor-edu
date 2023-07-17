import template from "./logo-component.template.js";

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
  #logoImage;
  #logoText;

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
      if (name === "image-url") {
        // далее если будут подходящие коллбеки планирую через || добавлять нвоые условия в if
        const imageCallback = this.#ATTRIBUTE_MAPPING.get(name);
        imageCallback(this.#logoImage, newValue);
      }
      if (name === "href") {
        const hrefCallback = this.#ATTRIBUTE_MAPPING.get(name);
        hrefCallback(this, newValue); // в теории можно переписать ан свитч кейс
      }
      if (name === "text") {
        const textCallback = this.#ATTRIBUTE_MAPPING.get(name);
        textCallback(this.#logoText, newValue);
      }
      if (name === "custom-styles") {
        const stylesCallback = this.#ATTRIBUTE_MAPPING.get(name);
        stylesCallback(this, newValue)
      }
    }
  }

  #setHref(element, newHref) {
    if (element) {
      if (element.getAttribute("href") != "") {
        element.style.cursor = "pointer";
      } else {
        element.style.cursor = "default";
      }
      element.setAttribute("href", newHref);
    }
  }
  #setImage(element, newSrc) {
    if (element) {
      element.style.background = `url(${newSrc})`;
    }
  }

  #setText(element, newText) {
    console.log(element)
    if (element) {
      element.innerText = newText;
    }
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
    this.#logoImage = this.shadowRoot.querySelector(".logo-image");
    this.#logoText = this.shadowRoot.querySelector(".logo-brandname");
  }
}
