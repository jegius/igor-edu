import generateStyles from "./image-component.styles.js";

export default function generateTemplate(src, imgHeight, imgWidth) {
  return `
        ${generateStyles(src, imgHeight, imgWidth)}
        <div class="about__image"></div>
    `;
}
