import generateStyles from './card-component.styles';

export default function generateTemplate(titleText, content) {
  return `
        ${generateStyles()}
         <div class="service-card">
            <div class="service-card__image"></div>
            <div class="service-card__underImage">
                <h2 class="underImage__title">${titleText ?? ''}</h2>
                <p class="underImage__description">${content ?? ''}</p>
            </div>
         </div>
    `;
}
