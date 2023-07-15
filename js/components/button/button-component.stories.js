import { html } from "lit-html";
import {action} from '@storybook/addon-actions';
import "./button-component.js";
import { ButtonComponent } from "./button-component.js";
import "./button-component.template.js";
import "./button-component.styles.js";
import "../common.css";

export default {
  title: "ButtonComponent",
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    buttonText: { control: "text" },
    isActive: {
      control: { type: "select" },
      options: ["true", "false"],
    },
    eventName: { control: "text" },
    eventBody: { control: "text" },
  },
};

const Template = (args) => {
  document.addEventListener(args.eventName, action(args.eventName));
  return html`
    <button-component
      text=${args.buttonText}
      active=${args.isActive}
      event-body=${args.eventBody}
      event-name=${args.eventName}
    ></button-component>
  `;
};

const TemplateWithOnlyEventName = (args) => {
  document.addEventListener(args.eventName, action(args.eventName));
  return html`
    <button-component
      text=${args.buttonText}
      active=${args.isActive}
      event-name=${args.eventName}
    ></button-component>
  `;
}

const TemplateWithoutEvents = (args) => {
  return html`
    <button-component
      text=${args.buttonText}
      active=${args.isActive}
    ></button-component>
  `;
}

export const Default = Template.bind({});

Default.args = {
  isActive: "false",
  buttonText: "Click me",
  eventBody: JSON.stringify({name: "random"}),
  eventName: "DefaultEventName",
};


export const Active = Template.bind({});

Active.args = {
  isActive: "true",
  buttonText: "Click me",
  eventBody: JSON.stringify({name: "random"}),
  eventName: "ACtiveEventName",
}

export const OnlyEventName = TemplateWithOnlyEventName.bind({});

OnlyEventName.args = {
  isActive: "false",
  buttonText: "Click me",
  eventName: "OnlyEventNameCase",
}


export const WithoutEvents = TemplateWithoutEvents.bind({});

WithoutEvents.args = {
  isActive: "false",
  buttonText: "Click me",
}