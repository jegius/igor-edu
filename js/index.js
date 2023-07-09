import {LinkComponent} from "./components/link/link-component.js";
import {NavComponent} from "./components/nav/nav-component.js";
import {ButtonComponent} from "./components/button/button-component.js";

[ButtonComponent,NavComponent, LinkComponent].map(component => customElements.define(component.name, component));

