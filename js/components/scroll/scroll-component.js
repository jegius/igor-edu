import { cleanNodes } from '../api/helpers';
import generateTemplate from './scroll-component.template';

export class ScrollComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  static get name() {
    return 'scroll-component';
  }

  #render() {
    const template = document.createElement('template');
    const contentNodes = this.innerHTML;
    template.innerHTML = generateTemplate(contentNodes);
    cleanNodes(this.shadowRoot).append(template.content.cloneNode(true));
  }
}
