import { html } from 'lit-html';
import '../common.css';
import './card-component.js';
import './card-component.styles.js';
import './card-component.template.js';

export default {
  title: 'CardComponent',
  tags: ['autodocs'],
};

const Template = args => {
  return html`
    <card-component
      title=${args.title}
      content=${args.content}
      group-id=${args.groupId}
      event=${args.event}
    ></card-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  title: 'Garden care dfdsf;lds,vl;sd;llddldllddl',
  content:
    'Garden cares card text for testing egldldldldlldlddldldllldldldldldldldl',
  groupId: 1,
  event: {
    eventName: 'string',
    eventBody: 'string',
  },
};
