export default function generateStyles() {
  return `
  <style>
    @import url('../common.css');
    .title {
        font-size: 2.813rem;
        font-weight: 700;
        color: var(--mainGreyColor);
        line-height: 3.125rem;
    }
    
    .undertitle-text {
        color: var(--primaryTextGreenColor);
    }
    </style>
    `;
}
