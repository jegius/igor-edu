import { generateStyles } from "./header-component.style";
import "../nav/nav-component.js";
import "../link/link-component.js";
import "../logo/logo-component.js";

export function generateTemplate(links,  imageSrc) {
  return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
            <logo-component  custom-styles="{background-image: url(${imageSrc})}"></logo-component>
            <nav-element>
                ${links.map((el) => el).join("")}
                </nav-element>
        </div>
    </header>
    `;
}
