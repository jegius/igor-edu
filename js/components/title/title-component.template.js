import generateStyles from "./title-component.styles.js";

export function generateTemplate(customStyles, level) {
  return `
          ${generateStyles(customStyles)}
          <h${
            level <= 5 ? level : 1
          } class="title">  We grow <span><slot name="title__secondary"></slot></span> and give you oxygen</h${
    level <= 5 ? level : 1
  } >
        `;
}
