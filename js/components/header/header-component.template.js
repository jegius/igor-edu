import { generateStyles } from "./header-component.style";
import "../nav/nav-component.js";
import "../link/link-component.js";
import "../logo/logo-component.js";

export function generateTemplate(links, imageSrc) {
  return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
            <logo-component  custom-styles="{background-image: url(${imageSrc})}"></logo-component>
            <nav-element>
                ${links
                  .map(({ text, href }) => {
                    return `<link-element link-text="${text}" href="${href}"></link-element>`;
                  })
                  .join("")}
                </nav-element>
        </div>
    </header>
    `;
}
