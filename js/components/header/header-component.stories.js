import "./header-component.js";
import "./header-component.js";
import "./header-component.js";
import "../common.css";
import "../nav/nav-component.js";
import "../link/link-component.js";
import { html } from "lit-html";
import "../nav/nav-component.js";
import "../nav/nav-component.template.js";
import "../nav/nav-component.styles.js";
import "../link/link-component.js";
import "../link/link-component.template.js";
import "../link/link-component.styles.js";

export default {
  title: "HeaderComponent",
  tags: ["autodocs"],
};

const Template = (args) => {
  return html`<header-component></header-component>`;
};

export const Default = Template.bind({});

Default.args = {};
