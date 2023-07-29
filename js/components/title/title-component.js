import { cleanNodes } from "../api/helpers.js";
import { generateTemplate } from "./title-component.template.js";

const titleAttributes = {
  LEVEL: "level",
  TEXT: "text",
  PRIMARY: "primary-color",
  SECONDARY: "secondary-color",
  CONTENT_POSITION: "addisional-conntent-postion",
  CONTENT_SIZE: "content-size",
  TITLE_SIZE: "title-size",
};

export class TitleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  #level;
  #text;
  #secondaryColor;
  #primaryColor;
  #contentPosition;
  #contentSize;
  #titleSize;

  #ATTRIBUTE_MAPPING = new Map([
    [titleAttributes.LEVEL, this.#setLevel.bind(this)],
    [titleAttributes.TEXT, this.#setText.bind(this)],
    [titleAttributes.PRIMARY, this.#setPrimaryColor.bind(this)],
    [titleAttributes.SECONDARY, this.#setSecondaryColor.bind(this)],
    [titleAttributes.CONTENT_POSITION, this.#setContentPosition.bind(this)],
    [titleAttributes.CONTENT_SIZE, this.#setContentSize.bind(this)],
    [titleAttributes.TITLE_SIZE, this.#setTitleSize.bind(this)],
  ]);

  connectedCallback() {
    this.#render();
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
    this.#level = newLevel;
    this.#render();
  }

  #setText(_, newText) {
    this.#text = newText;
    this.#render();
  }
  #setPrimaryColor(_, newPrimaryColor) {
    this.#primaryColor = newPrimaryColor;
    this.#render();
  }

  #setSecondaryColor(_, newSecondaryColor) {
    this.#secondaryColor = newSecondaryColor;
    this.#render();
  }
  #setContentPosition(_, newPosition) {
    this.#contentPosition = newPosition;
    this.#render();
  }
  #setContentSize(_, newContentSize) {
    this.#contentSize = newContentSize;
    this.#render();
  }
  #setTitleSize(_, newTitleSize) {
    this.#titleSize = newTitleSize;
    this.#render();
  }

  #render(
    primaryColor = this.#primaryColor,
    secondaryColor = this.#secondaryColor,
    contentPosition = this.#contentPosition,
    level = this.#level,
    text = this.#text,
    contentSize = this.#contentSize,
    titleSize = this.#titleSize
  ) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate(
      primaryColor,
      secondaryColor,
      contentPosition,
      level,
      text,
      contentSize,
      titleSize
    );

    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
