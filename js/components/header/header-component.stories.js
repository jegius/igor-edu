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
      .test-div {
        font-size: 1.5rem;
        text-align: center;
        margin: 1rem;
        background-color: rgb(244, 152, 173);
      }
    </style>

    <div class="test-div">Элемент страницы 1</div>
    <div class="test-div">Элемент страницы 2</div>
    <div class="test-div">Элемент страницы 3</div>
    <div class="test-div">Элемент страницы 4</div>
    <div class="test-div">Элемент страницы 5</div>
    <div class="test-div">Элемент страницы 6</div>
    <div class="test-div">Элемент страницы 7</div>
    <div class="test-div">Элемент страницы 8</div>
    <div class="test-div">Элемент страницы 9</div>
    <div class="test-div">Элемент страницы 1</div>
    <div class="test-div">Элемент страницы 2</div>
    <div class="test-div">Элемент страницы 3</div>
    <div class="test-div">Элемент страницы 4</div>
    <div class="test-div">Элемент страницы 5</div>
    <div class="test-div">Элемент страницы 6</div>
    <div class="test-div">Элемент страницы 7</div>
    <div class="test-div">Элемент страницы 8</div>
    <div class="test-div">Элемент страницы 9</div>
    <div class="test-div">Элемент страницы 1</div>
    <div class="test-div">Элемент страницы 2</div>
    <div class="test-div">Элемент страницы 3</div>
    <div class="test-div">Элемент страницы 4</div>
    <div class="test-div">Элемент страницы 5</div>
    <div class="test-div">Элемент страницы 6</div>
    <div class="test-div">Элемент страницы 7</div>
    <div class="test-div">Элемент страницы 8</div>
    <div class="test-div">Элемент страницы 9</div>`
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
