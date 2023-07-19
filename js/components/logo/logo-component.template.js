import generateStyles from "./logo-component.styles.js";

export default function generateTemplate(customStyles) {
  return `
      <style>
      ${generateStyles(customStyles)}
      </style>
      <div class="logo">
          <div class="logo-image"></div>
          <span class="logo-brandname">Plants</span>
      </div>
    `;
}
