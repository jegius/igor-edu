import generateTemplate from "./image-component.template.js";
import { cleanNodes } from "../api/helpers.js";
const imageAttributes = {
  URL: "url",
  IMAGE_HEIGHT: "image-height",
  IMAGE_WIDTH: "image-width",
  SHOW_DISABLE: "showDisable",
};

export class ImageComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #imgHeight;
  #imgWidth;
  #src;

  #ATTRIBUTE_MAPPING = new Map([
    [imageAttributes.URL, this.#setUrl.bind(this)],
    [imageAttributes.IMAGE_HEIGHT, this.#setHeight.bind(this)],
    [imageAttributes.IMAGE_WIDTH, this.#setWidth.bind(this)],
  ]);

  static get name() {
    return "image-component";
  }

  static get observedAttributes() {
    return Object.values(imageAttributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      callback(this, newValue);
    }
  }

  connectedCallback() {
    this.#render();
  }

  #setUrl(_, newUrl) {
    this.#src = newUrl;
    console.log(newUrl + " " + "new url");
  }

  #setHeight(elem, newHeight) {
    this.#imgHeight = newHeight;
    console.log(newHeight + " " + "это высота");
  }

  #setWidth(elem, newWidth) {
    this.#imgWidth = newWidth;
    console.log(newWidth + " " + "Это ширины");
  }

  #render(
    src = this.#src,
    imgHeight = this.#imgHeight,
    imgWidth = this.#imgWidth
  ) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate(src, imgHeight, imgWidth);

    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
