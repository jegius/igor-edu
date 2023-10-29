import { generateTemplate } from './header-component.template.js'

const HEADER_ATTRIBUTES = {
  BASE_URL: 'base-url',
}

const EVENT_ATTRIBUTES = {
  SCROLL_EVENT: 'scroll',
}

const FUNCTION_ATTRIBUTES = {
  scrollFunction: {
    valueToChange: 20,
    classNameHeader: '.header',
    classModificatorFixed: '_fixed',
    fullWidth: '100%',
    cutWidth: '95%',
  },
}

export class HeaderComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  #ATTRIBUTE_MAPPING = new Map([
    [HEADER_ATTRIBUTES.BASE_URL, this.#getUrl.bind(this)],
  ])

  #baseUrl

  static get name() {
    return 'header-component'
  }

  async connectedCallback() {
    try {
      this.#addPositionByScroll()
    } catch (error) {
      console.error('Ошибка при обработке события прокрутки: ' + error)
    }
  }

  disconnectedCallback() {
    window.removeEventListener(
      EVENT_ATTRIBUTES.SCROLL_EVENT,
      this.#addPositionByScroll
    )

    console.log('removed event')
  }

  static get observedAttributes() {
    return Object.values(HEADER_ATTRIBUTES)
  }

  #addPositionByScroll() {
    window.addEventListener(
      EVENT_ATTRIBUTES.SCROLL_EVENT,
      this.#scrollFunction.bind(this)
    )
  }

  #scrollFunction() {
    const isScrolled =
      window.scrollY > FUNCTION_ATTRIBUTES.scrollFunction.valueToChange
    const header = this.shadowRoot.querySelector(
      FUNCTION_ATTRIBUTES.scrollFunction.classNameHeader
    )

    if (isScrolled) {
      header.classList.add(
        FUNCTION_ATTRIBUTES.scrollFunction.classModificatorFixed
      )
      header.style.width = FUNCTION_ATTRIBUTES.scrollFunction.cutWidth
    } else {
      header.classList.remove(
        FUNCTION_ATTRIBUTES.scrollFunction.classModificatorFixed
      )
      header.style.width = FUNCTION_ATTRIBUTES.scrollFunction.fullWidth
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name)
      callback(this, newValue)
    }
  }

  async #getUrl(_, newUrl) {
    try {
      const config = await this.#getHeaderConfig(newUrl)
      this.#render(config)
    } catch (error) {
      console.error(error)
      this.#render()
    }
  }

  async #getHeaderConfig(baseUrl = this.#baseUrl) {
    const data = await fetch(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await data.json()
  }

  #render(config) {
    const template = document.createElement('template')

    template.innerHTML = generateTemplate(config)
    this.shadowRoot.append(template.content.cloneNode(true))
  }
}
