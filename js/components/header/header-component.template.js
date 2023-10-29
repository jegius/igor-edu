import '../link/link-component.js'
import '../logo/logo-component.js'
import '../nav/nav-component.js'
import { generateStyles } from './header-component.style'

function renderingLogo({ text, image }) {
  return `  <logo-component text=${text} custom-styles="{background-image: url(${image})}"></logo-component>`
}

function renderingNav({ items }) {
  return ` <nav-element>
        ${items
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
    return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
            Ошибка при загрузке header 
        </div>
    </header>
    `
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

  config.forEach(configElement => {
    const type = configElement.type

    customComponentsArray.forEach(component => {
      if (!component.includes(type)) {
        console.log(`компонент ${component} не зарегистрирован`)
      }
    })
  })

  const elements = config.reduce((result, elementConfig) => {
    return `${result}${CONFIG_MAPPING.get(elementConfig.type)(elementConfig)}`
  }, '')

  return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
                ${elements}
        </div>
    </header>
    `
}
