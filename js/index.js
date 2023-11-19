import { ButtonComponent } from './components/button/button-component.js';
import { HeaderComponent } from './components/header/header-component.js';
import { ImageComponent } from './components/image/image-component.js';
import { LinkComponent } from './components/link/link-component.js';
import { LogoComponent } from './components/logo/logo-component.js';
import { NavComponent } from './components/nav/nav-component.js';
import { ScrollComponent } from './components/scroll/scroll-component.js';
import { TitleComponent } from './components/title/title-component.js';

[
  ButtonComponent,
  NavComponent,
  LinkComponent,
  LogoComponent,
  TitleComponent,
  HeaderComponent,
  ImageComponent,
  ScrollComponent,
].map(component => customElements.define(component.name, component));
