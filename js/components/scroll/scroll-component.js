import { generateScrollTemplate } from './scroll-component.template';

export class ScrollComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get name() {
    return 'scroll-component';
  }

  connectedCallback() {
    this.#render();
    this.#dispatchingEvent();
  }

  #dispatchingEvent() {
    const customScrollEvent = new CustomEvent('customScrollEvent', {
      detail: {
        test: 'test message',
      },
    });
    this.dispatchEvent(customScrollEvent);
  }

  #render() {
    const template = document.createElement('template');
    template.innerHTML = generateScrollTemplate();

    this.shadowRoot.append(template.content.cloneNode(true));
  }
}
