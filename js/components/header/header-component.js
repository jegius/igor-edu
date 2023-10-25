import { generateTemplate } from './header-component.template.js'

const headerAttributes = {
  POSITION: 'position',
  BASE_URL: 'base-url',
}

export class HeaderComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  #ATTRIBUTE_MAPPING = new Map([
    [headerAttributes.BASE_URL, this.#getUrl.bind(this)],
  ])

  #baseUrl

  static get name() {
    return 'header-component'
  }

  async connectedCallback() {
    try {
      this.#addPositionByScroll()
    } catch (error) {
      console.log('Ошибка при обработке события прокрутки: ' + error)
    }

    try {
      const config = await this.#getHeaderConfig()
      this.#render(config)
    } catch (err) {
      console.log(err)
      this.#render()
    }
  }

  disconnectedCallback() {
    const eventName = 'scroll'

    window.removeEventListener(eventName, this.#addPositionByScroll)
  }

  static get observedAttributes() {
    console.log(Object.values(headerAttributes))
    return Object.values(headerAttributes)
  }

  #addPositionByScroll() {
    const valueToChange = 20
    const classNameHeader = '.header'
    const classModificatorFixed = '_fixed'
    const eventName = 'scroll'

    window.addEventListener(eventName, windowFunctionEvent => {
      const isScrolled = window.scrollY > valueToChange
      const header = this.shadowRoot.querySelector(classNameHeader)

      if (isScrolled) {
        header.classList.add(classModificatorFixed)
        header.style.width = '95%'
      } else {
        header.classList.remove(classModificatorFixed)
        header.style.width = '100%'
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name)
      callback(this, newValue)
    }
  }

  #getUrl(_, newUrl) {
    this.#baseUrl = newUrl
    this.#getHeaderConfig()
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
