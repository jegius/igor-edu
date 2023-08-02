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
    <title-component level="${args.level}" custom-styles=${args.customStyles}>
      We grow plants and <span class="title__secondary">hello</span> give you
      oxygen
    </title-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  level: 1,
  customStyles: ".title: {color: red}",
};
