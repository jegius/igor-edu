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
    <div>Блок 1</div>
    <div>Блок 2</div>
    <div>Блок 3</div>
    <div>Блок 4</div>
    <div>Блок 5</div>
    <div>Блок 6</div>
    <div>Блок 7</div>
    <div>Блок 8</div> `
}

export const ScrollTest = TestingScrollTemplate.bind({})

Default.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
}

ScrollTest.args = {
  baseUrl: `http://localhost:6006/js/components/header/header-config.json`,
}
