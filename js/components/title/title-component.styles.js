export default function generateStyles(titleSecondaryStyles) {
  return `
  <style>
    @import url('../common.css');
    .title {
        font-size: 2.813rem;
        font-weight: 700;
        color: var(--mainGreyColor);
        line-height: 3.125rem;
    }

    .title__secondary {
        ${titleSecondaryStyles}
    }
    </style>
    `;
}
