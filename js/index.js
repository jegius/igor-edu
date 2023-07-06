import {LinkComponent} from "./components/link/link-component.js";
import {NavComponent} from "./components/nav/nav-component.js";

[NavComponent, LinkComponent].map(component => customElements.define(component.name, component));