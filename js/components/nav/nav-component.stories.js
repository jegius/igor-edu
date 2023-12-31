import { html } from "lit-html";
import "./nav-component.js";
import { NavComponent } from "./nav-component.js";
import "./nav-component.template.js";
import "./nav-component.styles.js";
import "../common.css";
import "../link/link-component.js";
import "../link/link-component.template.js";
import "../link/link-component.styles.js";

export default {
  title: "NavComponent",
  tags: ["autodocs"],
};

const Template = () => html`
  <nav-element
    ><a href="#">first</a> <a href="#">second</a>
    <a href="#">third</a></nav-element
  >
`;

const TemplateWithLinks = () => html`
  <nav-element>
    <link-element is-active="true" link-text="first" href="#"></link-element>
    <link-element is-active="false" link-text="second" href="#"></link-element>
    <link-element is-active="false" link-text="third" href="#"></link-element>
  </nav-element>
`;

const TemplateWithScrollDetection = () => html`
  <style>
    .header {
      top: 1rem;
      left: 0;
      position: sticky;
      z-index: 2;
    }

    .section {
      height: 50rem;
      border: 0.068rem dashed #69a2ea;
      border-radius: 4rem;
      margin-top: 2rem;
    }

    .section:nth-child(odd) {
      background-color: #eee;
    }

    .wrapper {
      padding: 2rem;
      height: 20rem;
      overflow-y: scroll;
      position: relative;
      box-shadow: 0 0 0.5rem 0.3rem #eee inset;
    }
  </style>
  <div class="wrapper _scrollable">
    <div class="header">
      <nav-element>
        <link-element
          is-active="true"
          link-text="first"
          href="#first"
        ></link-element>
        <link-element
          is-active="false"
          link-text="second"
          href="#second"
        ></link-element>
        <link-element
          is-active="false"
          link-text="third"
          href="#third"
        ></link-element>
      </nav-element>
    </div>
    <div class="section" id="first"></div>
    <div class="section" id="second"></div>
    <div class="section" id="third"></div>
  </div>
`;

export const Default = Template.bind({});

export const WithLinks = TemplateWithLinks.bind({});

export const WithScrollDetection = TemplateWithScrollDetection.bind({});
