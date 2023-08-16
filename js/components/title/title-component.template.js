import generateStyles from "./title-component.styles.js";

export function generateTemplate(customStyles, level, text) {
  return `
          ${generateStyles(customStyles)}
            <slot></slot>
            <h${level} class="title">${text}</h${level}>
        `;
}
