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
      ><span class="title__secondary">plants</span><b>test</b></title-component
    >
  `;
};

export const Default = Template.bind({});

Default.args = {
  level: 1,
  customStyles:
    "  .title { font-size: 2.813rem;   text-align: left}; .title__secondary {color: pink}",
  text: "hello",
};
