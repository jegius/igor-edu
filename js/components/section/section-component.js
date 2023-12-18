import generateTemplate from './section-component.template';

const sectionComponentAttributes = {
  ID: 'id',
  BACKGROUND: 'secondary',
};

export class SectionComponent extends HTMLElement {
  #ATTRIBUTES_MAPPING = new Map([
    [sectionComponentAttributes.ID, this.#setId.bind(this)],
    [sectionComponentAttributes.BACKGROUND, this.#setSecondary.bind(this)],
  ]);

  #Id;
  #secondary;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get name() {
    return 'section-component';
  }

  static get observedAttributes() {
    return Object.values(sectionComponentAttributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      const callback = this.#ATTRIBUTES_MAPPING.get(name);
      callback(this, newValue);
    }
  }

  connectedCallback() {
    this.#render();
  }

  #setId(_, newId) {
    this.#Id = newId;
  }

  #setSecondary(_, newBoolean) {
    this.#secondary = newBoolean;
  }

  #render(backgroundBoolean = this.#secondary) {
    const template = document.createElement('template');
    template.innerHTML = generateTemplate(backgroundBoolean);

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
