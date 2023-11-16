import { html } from 'lit-html';
import '../common.css';
import '../link/link-component.js';
import '../link/link-component.styles.js';
import '../link/link-component.template.js';
import '../nav/nav-component.js';
import '../nav/nav-component.styles.js';
import '../nav/nav-component.template.js';
import './header-component.js';

export default {
  title: 'HeaderComponent',
  tags: ['autodocs'],
};

const Template = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component> `;
};

export const Default = Template.bind({});

const TestingScrollTemplate = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component>
    <style>
      .section {
        height: 50rem;
        border: 0.068rem dashed #69a2ea;
        border-radius: 4rem;
        margin-top: 2rem;
      }
      .wrapper {
        padding: 2rem;
        height: 20rem;
        overflow-y: scroll;
        position: relative;
        box-shadow: 0 0 0.5rem 0.3rem #eee inset;
      }

      .section:nth-child(odd) {
        background-color: #eee;
      }
    </style>
    <div class="wrapper _scrollable">
      <div class="section" id="first"></div>
      <div class="section" id="second"></div>
      <div class="section" id="third"></div>
    </div>`;
};

export const ScrollTest = TestingScrollTemplate.bind({});

const WrongDataTemplate = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component>`;
};

export const WrongData = WrongDataTemplate.bind({});

const WithoutScrollable = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component>
    <style>
      .section {
        height: 50rem;
        border: 0.068rem dashed #69a2ea;
        border-radius: 4rem;
        margin-top: 2rem;
      }
      .wrapper {
        padding: 2rem;
        height: 20rem;
        overflow-y: scroll;
        position: relative;
        box-shadow: 0 0 0.5rem 0.3rem #eee inset;
      }

      .section:nth-child(odd) {
        background-color: #eee;
      }
    </style>
    <div class="wrapper">
      <div class="section" id="first"></div>
      <div class="section" id="second"></div>
      <div class="section" id="third"></div>
    </div>`;
};

export const Without = WithoutScrollable.bind({});

Default.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
};

ScrollTest.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
};

WrongData.args = {
  baseUrl: 'nothing',
};

Without.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
};
