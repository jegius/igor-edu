import generateStyles from "./title-component.styles.js";

export function generateTemplate(customStyles, level) {
  return `
          ${generateStyles(customStyles)}
            <slot></slot>
        `;
}
