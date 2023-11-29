import {
  addListeners,
  cleanNodes,
  scrollContentToTop,
  select,
} from '../api/helpers.js';
import generateTemplate from './card-component.template';

const cardAttributes = {
  CARD_TITLE: 'title',
  CARD_CONTENT: 'content',
  GROUP_ID: 'group-id',
  EVENT_NAME: 'event-name',
  EVENT_BODY: 'event-body',
  IMAGE_URL: 'image-url',
};

export class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  #imageUrl;
  #titleText;
  #content;
  #groupId;
  #eventName;
  #eventBody;

  #listeners = [
    [
      select.bind(this, '.card-component__link'),
      'click',
      this.#emitCustomEvent.bind(this),
    ],
  ];

  #ATTRIBUTE_MAPPING = new Map([
    [cardAttributes.CARD_TITLE, this.#setTitle.bind(this)],
    [cardAttributes.CARD_CONTENT, this.#setContent.bind(this)],
    [cardAttributes.GROUP_ID, this.#setGroupId.bind(this)],
    [cardAttributes.IMAGE_URL, this.#getImageUrl.bind(this)],
    [cardAttributes.EVENT_NAME, this.#setEventName.bind(this)],
    [cardAttributes.EVENT_BODY, this.#setEventBody.bind(this)],
  ]);

  static get name() {
    return 'card-component';
  }

  async connectedCallback() {
    this.#render();
    this.#listeners.forEach(addListeners);
  }

  disconnectedCallback() {
    this.#listeners.forEach(addListeners);
  }

  static get observedAttributes() {
    return Object.values(cardAttributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(this, newValue);
      }
    }
  }

  #setEventName(_, newEventName) {
    if (newEventName) {
      this.#eventName = newEventName;
    }
  }

  #setEventBody(_, newEventBody) {
    if (newEventBody) {
      this.#eventBody = JSON.parse(newEventBody);
    }
  }

  #setTitle(_, newTitle) {
    this.#titleText = newTitle;
  }

  #setContent(_, newContent) {
    this.#content = newContent;
  }

  #setGroupId(_, newId) {
    this.#groupId = newId;
  }

  #emitCustomEvent() {
    const node = this.shadowRoot.querySelector('a');
    const event = new CustomEvent(this.#eventName, {
      detail: {
        eventBody: this.#eventBody,
        groupId: this.#groupId,
      },
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    node.dispatchEvent(event);
  }

  #getImageUrl(_, newImageUrl) {
    this.#imageUrl = newImageUrl;
  }

  #render(
    titleText = this.#titleText,
    content = this.#content,
    groupId = this.#groupId,
    imageUrl = this.#imageUrl
  ) {
    const template = document.createElement('template');

    template.innerHTML = generateTemplate(
      titleText,
      content,
      groupId,
      imageUrl
    );
    cleanNodes(this.shadowRoot).append(template.content.cloneNode('true'));
    scrollContentToTop(this.shadowRoot, '.service-card__content');
  }
}
