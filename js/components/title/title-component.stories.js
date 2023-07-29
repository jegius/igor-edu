import { html } from "lit-html";
import "./title-component.js";
import { action } from "@storybook/addon-actions";
import "./title-component.template.js";
import "./title-component.styles.js";
import "../common.css";
import events from "../api/events.js";

export default {
  title: "TitleComponent",
  tags: ["autodocs"],
};

const Template = (args) => {
  return html`
    <title-component level="${args.level}" text=${args.text}></title-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  level: 1,
  text: `We grow plants and <span>hello</span> give you oxygen`,
};
