import { LinkComponent } from "./components/link/link-component.js";
import { NavComponent } from "./components/nav/nav-component.js";
import { ButtonComponent } from "./components/button/button-component.js";
import { LogoComponent } from "./components/logo/logo-component.js";

[ButtonComponent, NavComponent, LinkComponent, LogoComponent].map((component) =>
  customElements.define(component.name, component)
);
