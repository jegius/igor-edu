import '../link/link-component.js';
import { LinkComponent } from '../link/link-component.js';
import '../logo/logo-component.js';
import { LogoComponent } from '../logo/logo-component.js';
import '../nav/nav-component.js';
import { NavComponent } from '../nav/nav-component.js';
import { generateStyles } from './header-component.style';

const CUSTOM_COMPONENTS = new Map([
  ['nav', NavComponent],
  ['link', LinkComponent],
  ['logo', LogoComponent],
]);

function renderingLogo({ text, image }) {
  return `  <logo-component text=${text} .logo-href {  width: 4.948rem;   height: 1.315rem;} .logo-image  {background-image: url(${image}}"></logo-component>`;
}

function renderingNav({ items }) {
  return ` <nav-element>
        ${items
          .map(
            ({ text, url }) => `<link-element link-text=${text}
          href=${url}></link-element>`
          )
          .join('')}
    </nav-element>`;
}

function renderingErrorTemplate() {
  return ` <div class='loader'>Загрузка содержимого страницы...</div>`;
}

const configAttributes = {
  link: 'link',
  nav: 'nav',
  logo: 'logo',
  error: 'error',
};

const CONFIG_MAPPING = new Map([
  [configAttributes.nav, renderingNav],
  [configAttributes.logo, renderingLogo],
  [configAttributes.error, renderingErrorTemplate],
]);

export function generateTemplate(config) {
  config.forEach(configComponent => {
    const { type } = configComponent;

    const componentInRegistry = CUSTOM_COMPONENTS.get(type);
    const componentName = componentInRegistry.name;
    const isComponentExisted = customElements.get(componentName);

    try {
      if (!isComponentExisted) {
        customElements.define(componentName, componentInRegistry);
      }
    } catch (error) {
      console.error(
        `Некорректный type компонента, которого нет в списке компонентов или случай загрузки прелоадера ${error}`
      );
    }
  });

  const elements = config.reduce((result, elementConfig) => {
    return `${result}${CONFIG_MAPPING.get(elementConfig.type)(elementConfig)}`;
  }, '');

  return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
                ${elements}
        </div>
    </header>
    `;
}
