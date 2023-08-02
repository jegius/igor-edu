import generateStyles from "./title-component.styles.js";

export function generateTemplate(customStyles, level) {
  return `
          ${generateStyles(customStyles)}
          <slot></slot>
          <h${level <= 5 ? level : 1} class="title"></h${level <= 5 ? level : 1} >
        `;
}
