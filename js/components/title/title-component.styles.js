export default function generateStyles(customStyles) {
  return `
  <style>
  @import url('../common.css');
    ${customStyles ?? customStyles}
    span {
      color: var(--primaryGreen);
    }
    </style>
    `;
}
