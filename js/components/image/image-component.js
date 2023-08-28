import generateTemplate from "./image-component.template.js";
import { cleanNodes, checkUnitOfMeasurement } from "../api/helpers.js";
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

  #compressImage(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const img = new Image();
          img.onload = function () {
            const maxWidth = img.width;
            const maxHeight = img.height;
            let newWidth = maxWidth;
            let newHeight = maxHeight;
            if (newWidth > newHeight) {
              if (newWidth > maxWidth) {
                newHeight *= maxWidth / newWidth;
                newWidth = maxWidth;
              }
            } else {
              if (newHeight > maxHeight) {
                newWidth *= maxHeight / newHeight;
                newHeight = maxHeight;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(resolve, "image/jpeg");
          };
          img.onerror = function () {
            reject(new Error("Ошибка загрузки изображения."));
          };
          img.src = URL.createObjectURL(blob);
        })
        .catch((error) => {
          reject(new Error("Ошибка загрузки изображения."));
        });
    });
  }

  #setUrl(element, newUrl) {
    this.#src = newUrl;
    if (!newUrl) {
      this.#src = null;
    }
    this.#compressImage(newUrl);

    this.#showDisable(element);
  }

  #setHeight(elem, newHeight = "100%") {
    const height = checkUnitOfMeasurement.call(this, newHeight);
    this.#imgHeight = height;
  }

  #setWidth(elem, newWidth = "100%") {
    const width = checkUnitOfMeasurement.call(this, newWidth);
    this.#imgWidth = width;
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
