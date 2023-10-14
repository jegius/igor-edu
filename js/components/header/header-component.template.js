import { generateStyles } from "./header-component.style";
import "../nav/nav-component.js";
import "../link/link-component.js";
import "../logo/logo-component.js";

export function generateTemplate(config) {
  const navElementWithLinks = config.find((el) => {
    return el.includes("nav");
  });

  const logoElement = config.find((el) => {
    return el.includes("logo");
  });

  return `
  ${generateStyles()}
  <header class="header">
        <div class="header__inner">
                ${logoElement}
                ${navElementWithLinks}
        </div>
    </header>
    `;
}
