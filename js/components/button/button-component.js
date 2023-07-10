import template from "./button-component.template.js";

const buttonAttributes = {
  BUTTON_TEXT: "button-text",
  IS_ACTIVE: "active",
};

export class ButtonComponent extends HTMLElement {
  static get name() {
    return "button-component";
  }

  #ATTRIBUTE_MAPPING = new Map([
    [buttonAttributes.BUTTON_TEXT, ButtonComponent.#setText],
    [buttonAttributes.IS_ACTIVE, ButtonComponent.#setActive],
  ]);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["button-text", "active", "event"];
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue != oldValue) {
    }
    const callback = this.#ATTRIBUTE_MAPPING.get(name);
    callback.call(this, this, newValue);
  }



  //   if (name === "event") {
  //     this.#handleEvent(newValue);
  //   }
  // }

  static #setText(element, newText) {
    element.innerText = newText;
  }

  static #setActive(element, newAttr) {
    console.log(element, newAttr);
    if (element.getAttribute("active") === "true") {
      element.classList.add("_active");
    }
    if (element.getAttribute("active") === "false") {
      element.classList.remove("_active");
    }
  }

  #handleEvent(eventString) {
    const [eventName, eventBody] = eventString.split("-");

    this.addEventListener("click", () => {
      const event = new CustomEvent(eventName, { detail: eventBody });
      this.dispatchEvent(event);
    });
  }

  #render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = template;

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    const btnText = this.getAttribute("button-text");
    if (btnText) {
      ButtonComponent.#setText(this, btnText);
    }
  }
}
