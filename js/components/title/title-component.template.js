import generateStyles from "./title-component.styles.js";

export function generateTemplate(customStyles, level) {
  return `
          ${generateStyles(customStyles)}
          <h${level} class="title">  We grow <slot class="title__secondary"></slot> and give you oxygen</h${level} >
        `;
}
