import generateStyles from "./logo-component.styles.js";

export function generateTemplateWithLink(customStyles, href) {
  return `
          ${generateStyles(customStyles)}
          <a class="logo-href" href="${href}">
            <div class="logo">
                <div class="logo-image"></div>
                <span class="logo-brandname">Plants</span>
            </div>
          </a>
        `;
}

export function generateTemplateWithoutLink(customStyles) {
  return `
          ${generateStyles(customStyles)}
            <div class="logo">
                <div class="logo-image"></div>
                <span class="logo-brandname">Plants</span>
            </div>
        `;
}
