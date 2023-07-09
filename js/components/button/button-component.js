
import template from "./button-component.template.js"

const buttonAttributes = {
    BUTTON_TEXT: "button-text",
    IS_ACTIVE: "active"
}

export class ButtonComponent extends HTMLElement {

    static get name() {
        return 'button-component'
    }

     #ATTRIBUTE_MAPPING = new Map([
        [buttonAttributes.BUTTON_TEXT, ButtonComponent.#setText]
    ])


    constructor() {
        super();
        this.attachShadow({mode:"open"});
    }

    static get observedAttributes() {
        return ['button-text', 'active', 'event'];
      }

      connectedCallback() {
        this.#render()
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if(name === "button-text" || newValue != oldValue) {
            const callback = this.#ATTRIBUTE_MAPPING.get(name);
            if(callback) {
                callback(this,newValue);
            }
        }

        if(name === "active") {
           if(newValue == 'true') {
                this.classList.add("_active") 
           }
        }

        if(name === "event") {
           this.#handleEvent(newValue)
        }
      }

      static #setText(element, newBtnText) {
        element.innerText = newBtnText
      }

      #handleEvent(eventString) {
        const [eventName, eventBody] = eventString.split("-");

        this.addEventListener('click', () => {
            const event = new CustomEvent(eventName, {detail:eventBody});
            this.dispatchEvent(event)
        })
      }

      #render() {
        const templateElem = document.createElement('template');
        templateElem.innerHTML = template;

        this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

        const btnText = this.getAttribute("button-text");
        if(btnText) {
            ButtonComponent.#setText(this, btnText);
        }
      }
}