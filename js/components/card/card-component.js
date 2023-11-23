import { addListeners, cleanNodes, select } from '../api/helpers.js';
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
    this.#promise = new Promise((res, rej) => {
      res(select('card-component', document));
    });
  }

  #promise;
  #titleText;
  #content;
  #groupIdArray;
  #customGroupId;
  #listeners;

  #ATTRIBUTE_MAPPING = new Map([
    [cardAttributes.CARD_TITLE, this.#setTitle.bind(this)],
    [cardAttributes.CARD_CONTENT, this.#setContent.bind(this)],
    [cardAttributes.GROUP_ID, this.#setCustomGroupId.bind(this)],
  ]);

  static get name() {
    return 'card-component';
  }

  async connectedCallback() {
    try {
      const data = await this.#promise;
      if (data.nodeType !== 9) {
        console.log(data);
        this.#listeners = [
          [
            select.bind(this, data, document),
            'click',
            this.#addCustomEvent.bind(this, 'card-component'),
          ],
        ];
        const cardConfig = await this.#getGroupId();
        this.#groupIdArray = cardConfig;
        this.#render();
        this.#listeners.forEach(addListeners);
      } else return;
    } catch (error) {
      console.log(error);
    }
  }

  disconnectedCallback() {
    // this.#listeners.forEach(addListeners);
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

  #setCustomGroupId(_, newId) {
    this.#customGroupId = newId;
  }

  async #getGroupId() {
    const data = await fetch(
      'http://localhost:6006/js/components/card/images-config.json',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await data.json();
  }

  #addCustomEvent(targetOfEvent) {
    const node = this.shadowRoot.querySelector(targetOfEvent);
    console.log('Custom event fn');
    node.dispatchEvent(
      new CustomEvent('str', {
        bubbles: true,
        detail: 'str',
      })
    );
  }

  #render(
    titleText = this.#titleText,
    content = this.#content,
    groupId = this.#groupIdArray,
    customGroupId = this.#customGroupId
  ) {
    const template = document.createElement('template');

    template.innerHTML = generateTemplate(
      titleText,
      content,
      groupId,
      customGroupId
    );
    cleanNodes(this.shadowRoot).append(template.content.cloneNode('true'));
  }
}
