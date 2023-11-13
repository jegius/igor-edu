import '../link/link-component.js';
import { LinkComponent } from '../link/link-component.js';
import '../logo/logo-component.js';
import { LogoComponent } from '../logo/logo-component.js';
import '../nav/nav-component.js';
import { NavComponent } from '../nav/nav-component.js';
import { generateStyles } from './header-component.style';

const CUSTOM_COMPONENTS = new Map([
  ['nav', { componentName: 'nav-element', componentConstructor: NavComponent }],
  [
    'link',
    { componentName: 'link-element', componentConstructor: LinkComponent },
  ],
  [
    'logo',
    { componentName: 'logo-component', componentConstructor: LogoComponent },
  ],
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
    try {
      if (!customElements.get(CUSTOM_COMPONENTS.get(type).componentName)) {
        console.error(`нет компонента для ключа ${type} `);
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
