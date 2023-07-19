import { html } from "lit-html";
import { action } from "@storybook/addon-actions";
import "./logo-component.js";
import { LogoComponent } from "./logo-component.js";
import "./logo-component.template.js";
import "./logo-component.styles.js";
import "../common.css";

export default {
  title: "LogoComponent",
  tags: ["autodocs"],
};

const Template = (args) => {
  return html`
    <logo-component
      image-url=${args.imageUrl}
      href=${args.href}
      text=${args.text}
      custom-styles=${args.customStyles}
      >hello</logo-component
    >
  `;
};

export const Default = Template.bind({});

Default.args = {
  imageUrl: "../../img/logo_vector.svg",
  href: "#",
  text: "Plants",
  customStyles: "background-color: yellow",
};
