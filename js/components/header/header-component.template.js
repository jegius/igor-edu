import { generateStyles } from "./header-component.style";
import "../nav/nav-component.js";
import "../link/link-component.js";
import "../logo/logo-component.js";
const linksArray = [
  ` <link-element is-active="true" link-text="first" href="#"></link-element>`,
  ` <link-element is-active="true" link-text="seconds" href="#"></link-element>`,
  ` <link-element is-active="true" link-text="third" href="#"></link-element>`,
];

export function generateTemplate(position, imageSrc) {
  return `
  <header class="header">
        <div class="header__inner">
            <logo-component  custom-styles="{background-image: url(${imageSrc})}"></logo-component>
            <nav-element>
                ${linksArray.map((el) => el).join("")}
                </nav-element>
        </div>
    </header>
        ${generateStyles(position)}
        
    `;
}
