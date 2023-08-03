export default function generateStyles(customStyles) {
  return `
  <style>
  @import url('../common.css');
    .title {
      color: var(--grey);
      font-weight: 700; 
      line-height: 3.125rem;
    }
    .title__secondary {
      color: var(--primaryGreen);
    }
    ${customStyles ?? customStyles}
    </style>
    `;
}
