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
      text=${args.text}
      primary-color=${args.primaryColor}
      secondary-color=${args.secondaryColor}
      addisional-conntent-postion=${args.contentPosition}
      title-size="${args.titleSize}"
      content-size="${args.contentSize}"
    ></title-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  level: 1,
  text: `We grow plants and <span>hello</span> give you oxygen`,
  primaryColor: "gray",
  secondaryColor: "green",
  contentPosition: "left",
  contentSize: 100,
  titleSize: 20,
};
