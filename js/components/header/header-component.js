import {
  addListeners,
  removeListeners,
  scrollFunctionHeader,
  select,
} from '../api/helpers.js';
import { generateTemplate } from './header-component.template.js';
const HEADER_ATTRIBUTES = {
  BASE_URL: 'base-url',
};

const EVENT_ATTRIBUTES = {
  SCROLL_EVENT: 'scroll',
};

const FUNCTION_ATTRIBUTES = {
  scrollFunction: {
    valueToChange: 20,
    classNameHeader: '.header',
    classModificatorFixed: '_fixed',
    fullWidth: '100%',
    cutWidth: '95%',
  },
};

export class HeaderComponent extends HTMLElement {
  #listeners = [
    [
      select.bind(this, '._scrollable', window.document),
      EVENT_ATTRIBUTES.SCROLL_EVENT,
      scrollFunctionHeader.bind(this, FUNCTION_ATTRIBUTES),
    ],
  ];
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  #ATTRIBUTE_MAPPING = new Map([
    [HEADER_ATTRIBUTES.BASE_URL, this.#getUrl.bind(this)],
  ]);

  #baseUrl;

  static get name() {
    return 'header-component';
  }

  async connectedCallback() {
    this.#listeners.forEach(addListeners);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners);
  }

  static get observedAttributes() {
    return Object.values(HEADER_ATTRIBUTES);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.#ATTRIBUTE_MAPPING.get(name)(this, newValue);
    }
  }

  async #getUrl(_, newUrl) {
    try {
      const config = await this.#getHeaderConfig(newUrl);
      this.#render(config);
    } catch (error) {
      console.error(error);
      this.#render();
    }
  }

  async #getHeaderConfig(baseUrl = this.#baseUrl) {
    const data = await fetch(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await data.json();
  }

  #render(config) {
    const template = document.createElement('template');

    if (!config) {
      const errorConfig = [
        {
          type: 'error',
        },
      ];
      template.innerHTML = generateTemplate(errorConfig);
    } else {
      template.innerHTML = generateTemplate(config);
    }

    this.shadowRoot.append(template.content.cloneNode(true));
  }
}
