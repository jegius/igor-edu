import "./image-component.js";
import "./image-component.styles.js";
import "./image-component.template.js";
import "../common.css";
import { html } from "lit-html";

export default {
  title: "ImageComponent",
  tags: ["autodocs"],
};

const Template = (args) => {
  return html `<image-component url=${args.url} image-height=${args.height} image-width=${args.width} flag=${args.showDisable} ></image-component>`;
};

export const Default = Template.bind({});

Default.args = {
  url: "../../../img/about_houseplant.png",
  height: "20",
  width: "20",
  showDisable: "false",
};

const ImageTemplate = (args) => {
  return html `<image-component  image-height=${args.height} image-width=${args.width} url=${args.url}></image-component>`;
};

export const Image = ImageTemplate.bind({});

Image.args = {
  url: "../../../img/about_houseplant.png",
  height: 10,
  width: 10
};

const CustomSizeTemplate = (args) => {
  return html`<image-component image-height=${args.height} image-width=${args.width}></image-component>`;
};

export const customSize = CustomSizeTemplate.bind({});

customSize.args = {
  height: "15",
  width: "15",
};

const defaultSizeTemplate = (args) => {
  return html`<image-component image-height=${args.height} image-width=${args.width}></image-component>`;
};

export const defaultSize = defaultSizeTemplate.bind({});

defaultSize.args = {
  height: "",
  width: "",
};
