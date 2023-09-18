import generateTemplate from "./image-component.template.js";
import {
  cleanNodes,
  checkUnitOfMeasurement,
  compressImage,
} from "../api/helpers.js";
const imageAttributes = {
  URL: "url",
  IMAGE_HEIGHT: "image-height",
  IMAGE_WIDTH: "image-width",
};

const FULL_SPACE = "100%";

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
    for (let attrName of this.constructor.observedAttributes) {
      if (this.hasAttribute(attrName)) {
        const attrValue = this.getAttribute(attrName);
        this.attributeChangedCallback(attrName, null, attrValue);
      }
    }
  }

  #showDisable(node) {
    if (node.getAttribute("show-disable") == "false" && this.#src === null) {
      this.#src = " ";
      this.#render();
    }
  }

  async #setUrl(element, newUrl) {
    const previousUrl = this.#src;

    if (!newUrl) {
      this.#src = null;
    }
    if (newUrl !== previousUrl) {
      try {
        const compressedImage = await compressImage(newUrl);
        this.#src = compressedImage;
        this.#render();
      } catch (error) {
        console.log(error.message);
      }
    }

    this.#showDisable(element);
  }

  #setHeight(_, newHeight = FULL_SPACE) {
    this.#imgHeight = checkUnitOfMeasurement.call(this, newHeight);
  }

  #setWidth(_, newWidth = FULL_SPACE) {
    this.#imgWidth = checkUnitOfMeasurement.call(this, newWidth);
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
