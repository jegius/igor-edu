import {
  addListeners,
  cleanNodes,
  hoverEvent,
  removeListeners,
  select,
} from '../api/helpers.js';
import generateTemplate from './card-component.template';

const cardAttributes = {
  CARD_TITLE: 'title',
  CARD_CONTENT: 'content',
  GROUP_ID: 'group-id',
  CUSTOM_EVENT: 'event',
};

export class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  #titleText;
  #content;
  #listeners = [
    [
      select.bind(this, '.service-card'),
      'mouseenter',
      hoverEvent.bind(null, this),
    ],
  ];

  #ATTRIBUTE_MAPPING = new Map([
    [cardAttributes.CARD_TITLE, this.#setTitle.bind(this)],
    [cardAttributes.CARD_CONTENT, this.#setContent.bind(this)],
  ]);

  static get name() {
    return 'card-component';
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.#listeners.forEach(addListeners);
    }

    this.#render();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners);
  }

  static get observedAttributes() {
    return Object.values(cardAttributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) callback(this, newValue);
    }
  }

  #setTitle(_, newTitle) {
    this.#titleText = newTitle;
  }

  #setContent(_, newContent) {
    this.#content = newContent;
  }

  #render(titleText = this.#titleText, content = this.#content) {
    const template = document.createElement('template');

    template.innerHTML = generateTemplate(titleText, content);
    cleanNodes(this.shadowRoot).append(template.content.cloneNode('true'));
  }
}
