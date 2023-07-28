import generateStyles from "./title-component.styles.js";

export function generateTemplate() {
  return `
        ${generateStyles()}
        <h1 class="title">We grow <span>plants</span> and give you oxygen</h1>
        <p class="undertitle-text ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    `;
}
