import "./image-component.js";
import "./image-component.styles.js";
import "./image-component.template.js";
import "../common.css";
import { ImageComponent } from "./image-component.js";

export default {
  title: "ImageComponent",
  tags: ["autodocs"],
};

const Template = (args) => {
  return ` <image-component url=${args.url} image-height=${args.height} image-width=${args.width}></image-component> `;
};

export const Default = Template.bind(this);

Default.args = {
  url: "../../../img/about_houseplant.png",
  height: "20",
  width: "20",
};
