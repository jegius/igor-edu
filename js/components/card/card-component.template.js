import generateStyles from './card-component.styles';

export default function generateTemplate(
  titleText,
  content,
  groupId,
  imageUrl
) {
  return `
    ${generateStyles(imageUrl)}
    <div class="service-card" group-id=${groupId}">
      <div class="service-card__content">
      <h2 class="content__title">${titleText ?? ''}</h2>
      <div class='content__description-wrapper'><p class="content__description">${
        content ?? ''
      }</p></div>
      </div>
      <div class="service-card__image"></div>
    </div>
`;
}
