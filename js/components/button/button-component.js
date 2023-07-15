import template from "./button-component.template.js";
import events from "../api/events.js";
import { addListeners, removeListeners, select } from "../api/helpers.js";

const buttonAttributes = {
  BUTTON_TEXT: "text",
  IS_ACTIVE: "active",
  EVENT_BODY: "event-body",
  EVENT_NAME: "event-name",
};

export class ButtonComponent extends HTMLElement {
  static get name() {
    return "button-component";
  }
  #button;
  #eventBody;
  #eventName;
  #listeners = [
    [select.bind(this, ".button"), "click", this.#addEventListeners.bind(this)],
  ];

  #ATTRIBUTE_MAPPING = new Map([
    [buttonAttributes.BUTTON_TEXT, ButtonComponent.#setText],
    [buttonAttributes.IS_ACTIVE, ButtonComponent.#setActive],
    [buttonAttributes.EVENT_BODY, ButtonComponent.#setEventBody],
    [buttonAttributes.EVENT_NAME, ButtonComponent.#setEventName],
  ]);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return Object.values(buttonAttributes);
  }

  connectedCallback() {
    this.#render();
    this.#listeners.forEach(addListeners.bind(this));

    for (let attrName of this.constructor.observedAttributes) {
      if (this.hasAttribute(attrName)) {
        const attrValue = this.getAttribute(attrName);
        this.attributeChangedCallback(attrName, null, attrValue);
      }
    }
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (this.#button) {
        callback(this.#button, newValue);
      }
    }
  }

  static #setEventBody(element, eventBody) {
    if (eventBody) {
      try {
        this.#eventBody = JSON.parse(eventBody);
      } catch (error) {
        console.error(`${error} - "Invalid JSON format"`);
      }
    }
  }

  static #setEventName(element, eventName) {
    if (eventName) {
      this.#eventName = eventName;
    }
  }

  static #setText(element, newText) {
    element.setAttribute("value", newText);
  }

  static #setActive(element, newAttr) {
    const isActive = newAttr === "true";
    if (isActive) {
      element.classList.add("_active");
    } else {
      element.classList.remove("_active");
    }
  }

  #addEventListeners(event) {
    this.dispatchEvent(
      new CustomEvent(this.#eventName, {
        bubbles: true,
        detail: this.#eventBody,
      })
    );
  }

  #render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = template;

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#button = this.shadowRoot.querySelector(".button");
  }
}
