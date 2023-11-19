import generateStyles from './scroll-component.styles';

export default function generateTemplate(contentNodes) {
  return `
    ${generateStyles()}
    <div class='_scrollable'>
        ${contentNodes}
    </div>
    `;
}
