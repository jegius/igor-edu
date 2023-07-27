import generateStyles from "./logo-component.styles.js";

export function generateTemplateWithLink(customStyles, href, text) {
  return `
          ${generateStyles(customStyles)}
          <a class="logo-href" href="${href}">
            <div class="logo">
                <div class="logo-image"></div>
                <span class="logo-brand-name">${text}</span>
            </div>
          </a>
        `;
}

export function generateTemplateWithoutLink(customStyles, href, text) {
  return `
          ${generateStyles(customStyles)}
            <div class="logo">
                <div class="logo-image"></div>
                <span class="logo-brand-name">${text}</span>
            </div>
        `;
}
