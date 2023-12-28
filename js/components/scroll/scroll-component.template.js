import { generateScrollStyle } from './scroll-component.style.js';

export const generateScrollTemplate = () => {
  return `
        ${generateScrollStyle()}
        <div class='scroll-wrapper'>
            <slot></slot>
        </div>
    `;
};
