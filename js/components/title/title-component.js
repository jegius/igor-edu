import { cleanNodes } from "../api/helpers.js";
import { generateTemplate } from "./title-component.template.js";
import {
  addListeners,
  removeListeners,
  select,
  compose,
} from "../api/helpers.js";
import events from "../api/events.js";
import { ArgTypes, argsHash } from "@storybook/blocks";

const titleAttributes = {
  LEVEL: "level",
  CUSTOM_STYLES: "custom-styles",
  TEXT: "text",
};

export class TitleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  #text;
  #customStyles;
  #level;
  #slot;
  #listeners = [
    [
      select.bind(this, "slot"),
      events.ON_SLOT_CHANGE,
      this.#slotChange.bind(this),
    ],
  ];

  #ATTRIBUTE_MAPPING = new Map([
    [titleAttributes.LEVEL, this.#setLevel.bind(this)],
    [titleAttributes.CUSTOM_STYLES, this.#setCustomStyles.bind(this)],
    [titleAttributes.TEXT, this.#setText.bind(this)],
  ]);

  connectedCallback() {
    this.#render();
    this.#listeners.forEach(addListeners);
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
    this.#level = newLevel <= 6 ? newLevel : 1;
    this.#render();
  }

  #setCustomStyles(_, customStyles) {
    this.#customStyles = customStyles;
    this.#render();
  }

  #setText(element, newText) {
    this.#text = newText;
    this.#listeners.forEach(addListeners);
  }

  #slotChange(event) {
    const target = event.target;

    function createH1Container(providedNodes) {
      const titleContainer = document.createElement("h1");
      titleContainer.classList.add("title");
      return { providedNodes, titleContainer };
    }

    function createFullComponentText({ providedNodes, titleContainer }) {
      titleContainer.innerHTML = this.#text;
      providedNodes.forEach((node, i) => {
        titleContainer.append(node.cloneNode(true));
      });
      this.#slot.innerHTML = titleContainer;
    }
    function nodeFilter(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return node;
      }
    }
    const assignedNodes = target.assignedNodes().filter(nodeFilter);
    compose(
      createH1Container,
      createFullComponentText.bind(this)
    )(assignedNodes);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners);
  }

  #render(customStyles = this.#customStyles, level = this.#level) {
    const template = document.createElement("template");
    template.innerHTML = generateTemplate(customStyles, level);
    this.#slot = this.shadowRoot.querySelector("slot");

    cleanNodes(this.shadowRoot).appendChild(template.content.cloneNode(true));
  }
}
