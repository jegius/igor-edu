import generateStyles from './scroll-component.styles';

export default function generateTemplate() {
  return `
    ${generateStyles()}
    <div class='_scrollable'>
        <slot></slot>
    </div>
    `;
}
