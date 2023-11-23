import generateStyles from './card-component.styles';

export default function generateTemplate(
  titleText,
  content,
  groupId,
  customGroupId
) {
  return `
        ${generateStyles(customGroupId)}
        <a class='card-component__wrapper' style='text-decoration: none; color: black; width: 20.625rem; display: inline-block;  -ms-user-select: none; -moz-user-select: none; -webkit-user-select: none; user-select: none; '> 
            <div class="service-card" group-id=${customGroupId}">
                <div class="service-card__image"></div>
                <div class="service-card__underImage">
                    <h2 class="underImage__title">${titleText ?? ''}</h2>
                    <p class="underImage__description">${content ?? ''}</p>
                </div>
            </div>
         </a>
    `;
}
