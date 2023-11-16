import { html } from 'lit-html'
import '../common.css'
import './logo-component.js'
import './logo-component.styles.js'
import './logo-component.template.js'

export default {
  title: 'LogoComponent',
  tags: ['autodocs'],
}

const Template = args => {
  return html`
    <logo-component
      image-url=${args.imageUrl}
      href=${args.href}
      text=${args.text ? args.text : ''}
      custom-styles=${args.customStyles}
    ></logo-component>
  `
}

const TextTemplate = args => {
  return html`
  <logo-component text=${args.text ? args.text : ''} custom-styles="${
    args.styles
  }" href="${args.href}"></logo-component`
}

const HrefTemplate = args => {
  return html`
  <logo-component href=${args.href} text="${
    args.text ? args.text : ''
  }" custom-styles="${args.styles}"></logo-component
  `
}

const CustomStylesTemplate = args => {
  return html` <logo-component
    custom-styles=${args.customStyles}
    text="${args.text}"
  ></logo-component>`
}

export const Default = Template.bind({})

Default.args = {
  href: 'vk',
  text: 'Plants',
  customStyles:
    ' .logo-href {  width: 4.948rem;   height: 1.315rem;} .logo-image  {background-image: url(../../img/logo_vector.svg)}',
}

export const Text = TextTemplate.bind({})

Text.args = {
  text: 'Plants',
  href: 'random href',
  styles:
    ' .logo-href {  width: 4.948rem;   height: 1.315rem;} .logo-image  {background-image: url(../../img/logo_vector.svg)}',
}

export const Href = HrefTemplate.bind({})

Href.args = {
  href: '#',
  text: 'Plants',
  styles:
    ' .logo-href {  width: 4.948rem;   height: 1.315rem;} .logo-image  {background-image: url(../../img/logo_vector.svg)}',
}

export const Styles = CustomStylesTemplate.bind({})

Styles.args = {
  customStyles:
    '.logo { border:1px solid black } .logo-image  {background-image: url(../../img/logo_vector.svg)}',
  text: 'Plants',
}
