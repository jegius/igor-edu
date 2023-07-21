import generateStyles from "./logo-component.styles.js";

export default function generateTemplate(customStyles) {
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
