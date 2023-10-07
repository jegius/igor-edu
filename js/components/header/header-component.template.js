import { generateStyles } from "./header-component.style";
import "../nav/nav-component.js";
import "../link/link-component.js";
import "../logo/logo-component.js";

export function generateTemplate(position) {
  return `
  <header class="header">
        <div class="header__inner">
            <logo-component custom-styles="{background-image: url(../../img/logo_vector.svg)}"></logo-component>
            <nav-element>
                <link-element is-active="true" link-text="first" href="#"></link-element>
                <link-element is-active="true" link-text="second" href="#"></link-element>
                <link-element is-active="true" link-text="third" href="#"></link-element>
                </nav-element>
        </div>
    </header>
        ${generateStyles(position)}
        
    `;
}
