export default function generateStyles(customStyles) {
  return `
  <style>
  <link rel="stylesheet" href="../common.css">
  .title {
        font-size: 2.813rem;
        font-weight: 700;
        color: var(--grey)
        line-height: 3.125rem;
    }

    .title__secondary {
      color: var(--primaryGreen);
    }
    ${customStyles ?? customStyles}
    </style>
    `;
}
