import '../link/link-component.js';
import '../logo/logo-component.js';
import '../nav/nav-component.js';
import { generateStyles } from './header-component.style';

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
  const customComponentsArray = [
    'nav-element',
    'link-element',
    'logo-component',
  ];

  config.forEach(() => {
    customComponentsArray.forEach(component => {
      if (customElements.get(component)) {
        console.log(`Компонент ${component} уже зарегистрирован.`);
      } else {
        console.log(`Компонент ${component} еще не зарегистрирован.`);
      }
    });
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
