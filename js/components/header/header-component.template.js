import '../link/link-component.js'
import '../logo/logo-component.js'
import '../nav/nav-component.js'
import { generateStyles } from './header-component.style'

function renderingLogo(componentConfig) {
  return `  <logo-component text=${componentConfig.text} custom-styles="{background-image: url(${componentConfig.image})}"></logo-component>`
}

function renderingNav(componentConfig) {
  return ` <nav-element>
        ${componentConfig.items
          .map(
            ({ text, url }) => `<link-element link-text=${text}
          href=${url}></link-element>`
          )
          .join('')}
    </nav-element>`
}

const configAttributes = {
  link: 'link',
  nav: 'nav',
  logo: 'logo',
}

const CONFIG_MAPPING = new Map([
  [configAttributes.nav, renderingNav],
  [configAttributes.logo, renderingLogo],
])

export function generateTemplate(config) {
  if (!config) {
    return `<div>Не удалось загрузить header</div>`
  }
  const arrayOfTags = []

  config.forEach(component => {
    const { type } = component
    const renderer = CONFIG_MAPPING.get(type)
    if (renderer) {
      arrayOfTags.push(renderer(component))
    } else {
      console.error(
        `Тип компонента "${type}" не зарегистрирован в хедере. Пожалуйста, зарегистрируйте его.`
      )
    }
  })

  const navElementWithLinks = arrayOfTags.find(component => {
    return component.includes('nav')
  })

  const logoElement = arrayOfTags.find(component => {
    return component.includes('logo')
  })

  const customComponentsArray = [
    'nav-element',
    'link-element',
    'logo-component',
  ]

  // customComponentsArray.forEach(component => {
  //   console.log(component)
  //   if (customElements.get(component) === undefined) {
  //     customElements.define(component)
  //   }
  // })

  config.forEach(configElement => {
    const type = configElement.type

    customComponentsArray.forEach(component => {
      if (!component.includes(type)) {
        console.log(`компонент ${component} не зарегистрирован`)
      }
    })
  })

  return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
                ${logoElement}
                ${navElementWithLinks}
        </div>
    </header>
    `
}
