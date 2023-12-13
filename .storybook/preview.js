import { ButtonComponent } from '../js/components/button/button-component.js';
import { HeaderComponent } from '../js/components/header/header-component.js';
import { ImageComponent } from '../js/components/image/image-component.js';
import { LinkComponent } from '../js/components/link/link-component.js';
import { LogoComponent } from '../js/components/logo/logo-component.js';
import { NavComponent } from '../js/components/nav/nav-component.js';
import { SectionComponent } from '../js/components/section/section-component.js';
import { TitleComponent } from '../js/components/title/title-component.js';

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

[
  NavComponent,
  LinkComponent,
  ButtonComponent,
  LogoComponent,
  TitleComponent,
  ImageComponent,
  HeaderComponent,
  SectionComponent,
].map(component => customElements.define(component.name, component));
export default preview;
