import {html} from 'lit-html';
import './nav-component.js';
import {NavComponent} from "./nav-component.js";
import './nav-component.template.js'
import './nav-component.styles.js'
import '../common.css'
import '../link/link-component.js';
import '../link/link-component.template.js'
import '../link/link-component.styles.js'

export default {
    title: 'NavComponent',
    tags: ['autodocs'],
};

const Template = () => html`
    <nav-element><a href="#">first</a> <a href="#">second</a> <a href="#">third</a></nav-element>
`;

const TemplateWithLinks = () => html`
    <nav-element>
        <link-element is-active="true" link-text="first" href="#"></link-element>
        <link-element is-active="false" link-text="second" href="#"></link-element>
        <link-element is-active="false" link-text="third" href="#"></link-element>
    </nav-element>
`

export const Default = Template.bind({});

export const WithLinks = TemplateWithLinks.bind({});
