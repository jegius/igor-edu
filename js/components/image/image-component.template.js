import generateStyles from "./image-component.styles.js";

export default function generateTemplate(
  src,
  imgHeight,
  imgWidth,
  enableDefaultImage
) {
  return `
        ${generateStyles(src, imgHeight, imgWidth, enableDefaultImage)}
        <div class="about__image"></div>
    `;
}
