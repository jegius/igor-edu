import { html } from 'lit-html'
import '../common.css'
import '../link/link-component.js'
import '../link/link-component.styles.js'
import '../link/link-component.template.js'
import '../nav/nav-component.js'
import '../nav/nav-component.styles.js'
import '../nav/nav-component.template.js'
import './header-component.js'

export default {
  title: 'HeaderComponent',
  tags: ['autodocs'],
}

const Template = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component> `
}

export const Default = Template.bind({})

const TestingScrollTemplate = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component>
    <style>
      .section {
        height: 50rem;
        border: 0.068rem dashed #69a2ea;
        border-radius: 4rem;
        margin-top: 2rem;
      }

      .section:nth-child(odd) {
        background-color: #eee;
      }
    </style>
    <div class="section" id="first"></div>
    <div class="section" id="second"></div>
    <div class="section" id="third"></div> `
}

export const ScrollTest = TestingScrollTemplate.bind({})

const WrongDataTemplate = args => {
  return html`<header-component base-url=${args.baseUrl}></header-component>`
}

export const WrongData = WrongDataTemplate.bind({})

Default.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
}

ScrollTest.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
}

WrongData.args = {
  baseUrl: 'nothing',
}
