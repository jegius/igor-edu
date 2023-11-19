import { html } from 'lit-html';
import '../common.css';
import '../link/link-component';
import '../link/link-component.js';
import '../link/link-component.styles';
import '../link/link-component.styles.js';
import '../link/link-component.template';
import '../link/link-component.template.js';
import '../nav/nav-component';
import '../nav/nav-component.styles';
import '../nav/nav-component.template';
import './scroll-component';
import './scroll-component.styles';
import './scroll-component.template';

export default {
  title: 'ScrollComponent',
  tags: ['autodocs'],
};

const Template = args => {
  return html`
    <scroll-component>
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
      <nav-element>
        <link-element
          is-active="true"
          link-text="first"
          href="#"
        ></link-element>
        <link-element
          is-active="false"
          link-text="second"
          href="#"
        ></link-element>
        <link-element
          is-active="false"
          link-text="third"
          href="#"
        ></link-element>
      </nav-element>
      <div>
        <div class="section" id="first"></div>
        <div class="section" id="second"></div>
        <div class="section" id="third"></div>
      </div>
    </scroll-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  test: 'test',
};
