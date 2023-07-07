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
        ._divider {
            height: 150rem;
        }

        .section {
            height: 50rem;
            border: .068rem dashed #69a2ea;
            border-radius: 4rem;
            margin-top: 2rem;
        }

        .section:nth-child(even) {
            background-color: #eee;
        }

        .wrapper {
            padding: 2rem;
            height: 20rem;
            overflow-y: scroll;
            position: relative;
            box-shadow: 0 0 .5rem .3rem #eee inset;
        }
        
    </style>
    <div class="wrapper">

        <link-element is-active=${args.isActive} link-text=${args.linkText} href=${args.href}></link-element>
        <div class="section _divider"></div>
        <div class="section" id="test"></div>
    </div>
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