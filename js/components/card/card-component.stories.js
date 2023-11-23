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
      group-id=${args.groupId}
    ></card-component>
  `;
};

export const Default = Template.bind({});

Default.args = {
  title: 'АЛЛИУМ',
  content:
    'Аллиум, или декоративный лук – это общее название отдельного рода растений, множество разновидностей которого используется в основном в декоративных целях. Это растение весьма популярно в среде садоводов из-за привлекательного внешнего вида и неповторимого очарования в период цветения.',
  groupId: 1,
  event: {
    eventName: 'string',
    eventBody: 'string',
  },
};

const TemplateWithScroll = args => {
  return html`
    <card-component
      title=${args.title}
      content=${args.content}
      group-id=${args.groupId}
      event=${args.event}
      group-id=${args.groupId}
    ></card-component>
  `;
};

export const WithScroll = TemplateWithScroll.bind({});

WithScroll.args = {
  title: 'АЛЛИУМ',
  content:
    'Аллиум, или декоративный лук – это общее название отдельного рода растений, множество разновидностей которого используется в основном в декоративных целях. Это растение весьма популярно в среде садоводов из-за привлекательного внешнего вида и неповторимого очарования в период цветения. Волчье лыко или волчья ягода – ядовитый кустарник, высотой около 1 – 1,5 м. Листья имеют продолговатую форму и располагаются в основном в верхней части ствола. В зависимости от места произрастания цветет растение ранней весной.Цветы по форме напоминают соцветия сирени, а их запах схож с ароматом гиацинта. Но наслаждаться ароматом опасно, он способен вызывать головную боль и недомогание. Встречаются чаще всего розовоцветущие виды, но существуют и растения с сиреневым цветением. Примечательно, что цвести растение начинает еще до появления первых листьев.',
  groupId: 1,
  event: {
    eventName: 'string',
    eventBody: 'string',
  },
};
