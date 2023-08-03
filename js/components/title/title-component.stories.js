import { html } from "lit-html";
import "./title-component.js";
import "./title-component.template.js";
import "./title-component.styles.js";
import "../common.css";

export default {
  title: "TitleComponent",
  tags: ["autodocs"],
};

const Template = (args) => {
  return html`
    <title-component
      level="${args.level}"
      custom-styles=${args.customStyles}
      text=${args.text}
    >
      <span slot="title__secondary">plants</span>
    </title-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  level: 1,
  customStyles:
    "  .title { font-size: 2.813rem; font-weight: 700; color: var(--grey);  line-height: 3.125rem; text-align: left}",
  text: "We grow <span><slot name='title__secondary'></slot></span> and give you oxygen",
};
