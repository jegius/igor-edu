import generateStyles from "./image-component.styles.js";

export default function generateTemplate(src, imgHeight, imgWidth, flag) {
  return `
        ${generateStyles(src, imgHeight, imgWidth, flag)}
        <div class="about__image"></div>
    `;
}
