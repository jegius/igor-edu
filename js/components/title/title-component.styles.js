export default function generateStyles(
  primaryColor,
  secondaryColor,
  contentPosition,
  contentSize,
  titleSize
) {
  return `
  <style>
    @import url('../common.css');
    .title {
        font-size: 2.813rem;
        font-weight: 700;
        color: ${primaryColor};
        line-height: 3.125rem;
        text-align: ${contentPosition};
        max-width: ${contentSize}% ;
        font-size: ${titleSize}%;
    }

    .title__secondary {
        color: ${secondaryColor};
        font-size: ${titleSize/2}%;
    }
    </style>
    `;
}
