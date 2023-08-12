import "./title-component.js";
import "./title-component.template.js";
import "./title-component.styles.js";
import "../common.css";

export default {
  title: "TitleComponent",
  tags: ["autodocs"],
  argTypes: {
    customStyles: { control: "text" },
    text: { control: "text" },
    level: { control: "number" },
  },
};

const Template = (args) => {
  return `
    <title-component
      level="${args.level}"
      custom-styles=${args.customStyles}>${args.text}</title-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  level: 1,
  customStyles: `
    .title { 
      font-size: 2.813rem;
      text-align: left
      }
     .title__secondary{
      color:pink
      }`,
  text: "We grow <span class='title__secondary'>plants</span> for you",
};
