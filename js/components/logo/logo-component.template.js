import generateStyles from "./logo-component.styles.js";

export function generateTemplateWithTagA(customStyles) {
  return `
          ${generateStyles(customStyles)}
          <a class="logo-href">
            <div class="logo">
                <div class="logo-image"></div>
                <span class="logo-brandname">Plants</span>
            </div>
          </a>
        `;
}

export function generateTemplateWithoutTagA(customStyles) {
  return `
          ${generateStyles(customStyles)}
            <div class="logo">
                <div class="logo-image"></div>
                <span class="logo-brandname">Plants</span>
            </div>
        `;
}
