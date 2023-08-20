import generateTemplate from "./image-component.template.js";
import { cleanNodes } from "../api/helpers.js";
const imageAttributes = {
  URL: "url",
  IMAGE_HEIGHT: "image-height",
  IMAGE_WIDTH: "image-width",
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
    if (!newUrl) {
      this.#src = null;
    }
  }

  #setHeight(elem, newHeight) {
    if (!newHeight) {
      this.#imgHeight = 100 + "%";
    } else {
      this.#imgHeight = newHeight + "rem";
    }
    console.log(newHeight + " " + "это newHeight");
    console.log(this.#imgHeight + " " + "это this.#imgHeight");
  }

  #setWidth(elem, newWidth) {
    if (!newWidth) {
      this.#imgWidth = 100 + "%";
    } else {
      this.#imgWidth = newWidth + "rem";
    }
    console.log(newWidth + " " + "это newWidth");
    console.log(this.#imgWidth + " " + "это this.#imgWidth");
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
