import { LinkComponent } from '../link/link-component.js'
import { LogoComponent } from '../logo/logo-component.js'
import { NavComponent } from '../nav/nav-component.js'
import { generateTemplate } from './header-component.template.js'

const headerAttributes = {
  POSITION: 'position',
}

const configAttributes = {
  link: 'link',
  nav: 'nav',
  logo: 'logo',
}

export class HeaderComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  #baseUrl = `http://localhost:6006/js/components/header/header-config.json`

  #CONFIG_MAPPING = new Map([
    [configAttributes.nav, this.#renderingNav],
    [configAttributes.logo, this.#renderingLogo],
  ])

  #renderingNav(componentConfig) {
    return ` <nav-element>
        ${componentConfig.items
          .map(
            ({ text, url }) => `<link-element link-text=${text}
          href=${url}></link-element>`
          )
          .join('')}
    </nav-element>`
  }

  #renderingLogo(componentConfig) {
    return `  <logo-component  custom-styles="{background-image: url(${componentConfig.image})}"></logo-component>`
  }

  static get name() {
    return 'header-component'
  }

  async connectedCallback() {
    try {
      this.#addPositionByScroll()
    } catch (error) {
      console.log('Ошибка при обработке события прокрутки: ' + error)
    }

    const config = await this.#getHeaderConfig()
    this.#render(config)
  }

  static get observedAttributes() {
    return Object.values(headerAttributes)
  }

  #addPositionByScroll() {
    const valueToChange = 20
    const classNameHeader = '.header'
    const classModificatorFixed = '_fixed'
    const eventName = 'scroll'

    window.addEventListener(eventName, windowFunctionEvent => {
      if (window.scrollY > valueToChange) {
        this.shadowRoot
          .querySelector(classNameHeader)
          .classList.add(classModificatorFixed)
        this.shadowRoot.querySelector(classNameHeader).style.width = '95%'
      }

      if (window.scrollY < valueToChange) {
        this.shadowRoot
          .querySelector(classNameHeader)
          .classList.remove(classModificatorFixed)
        this.shadowRoot.querySelector(classNameHeader).style.width = '100%'
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  async #getHeaderConfig(baseUrl = this.#baseUrl) {
    const data = await fetch(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await data.json()
    return res
  }

  #render(config) {
    const arrayOfTags = []
    const template = document.createElement('template')

    config.forEach(component => {
      const { type } = component
      const renderer = this.#CONFIG_MAPPING.get(type)
      if (renderer) {
        arrayOfTags.push(renderer(component))
      } else {
        console
          .error(
            `Тип компонента "${type}" не зарегистрирован в хедере. Пожалуйста, зарегистрируйте его.`
          )
          [(NavComponent, LinkComponent, LogoComponent, HeaderComponent)].map(
            component => customElements.define(component.name, component)
          )
      }
    })

    template.innerHTML = generateTemplate(arrayOfTags)
    this.shadowRoot.append(template.content.cloneNode(true))
  }
}
