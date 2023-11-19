export default function generateStyles() {
  return `
  <style>
    @import url('../common.css');
    .service-card {
        width: 20.625rem;
        height: 28.125rem;
        font-family: "Inter";
    }

    .underImage__title {
        margin-top: 0.63rem;
        font-size: 1.25rem;
        color: var(--orangeColor);
        font-weight: 700;
        text-align: center;
    }

    .underImage__description {
        margin-top: 0.62rem;
        text-align: center;
    }

    .service-card__underImage {
        border-radius: 0rem 0rem 1.25rem 1.25rem;
        border: 0.063rem solid var(--borderCards);
        max-width: 20.625rem;
        max-height: 6.25rem;
        overflow-y: scroll;
        word-wrap: break-word;
        position: relative;
        background-color: red;
    }

    .service-card__image {
        border-radius: 1.25rem 1.25rem 0rem 0rem;
        width: 20.56269rem;
        height: 21.875rem;
        background-color: yellowgreen;
    }   

   </style>
    `;
}
