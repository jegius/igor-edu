import {html} from 'lit-html';
import './link-component.js';
import {action} from '@storybook/addon-actions';
import './link-component.template.js'
import './link-component.styles.js'
import '../common.css'
import events from "../api/events.js";

export default {
    title: 'LinkElement',
    tags: ['autodocs'],
    argTypes: {
        onClick: {action: 'clicked'},
        linkText: {control: 'text'},
        href: {control: 'text'},
        isActive: {
            control: {type: 'select'},
            options: ['true', 'false'],
        },
    },
};

const Template = (args) => {
    document.addEventListener(events.LINK_CLICKED, action(events.LINK_CLICKED))
    return html`
        <link-element is-active=${args.isActive} link-text=${args.linkText} href=${args.href}></link-element>
    `
};

const TemplateWithScroll = (args) => html`
    <style>
        .divider {
            height: 150rem;
        }
    </style>

    <link-element is-active=${args.isActive} link-text=${args.linkText} href=${args.href}></link-element>
    <div class="divider"></div>
    <div id="test"></div>
`

export const Default = Template.bind({});
Default.args = {
    isActive: 'false',
    linkText: 'Link Text',
    href: '#'
};

export const Active = Template.bind({});
Active.args = {
    isActive: 'true',
    linkText: 'Active Link',
    href: '#'
};

export const WithScroll = TemplateWithScroll.bind({});
WithScroll.args = {
    isActive: 'true',
    linkText: 'Active Link',
    href: '#test'
};