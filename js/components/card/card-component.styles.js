export default function generateStyles(imageUrl) {
  return `
<style>

@import url('../common.css');

.card-component__link {
text-decoration: none;
color: black;
width: 20.625rem;
display: inline-block;
-ms-user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
user-select: none;
}

.service-card {
width: 20.625rem;
height: 28.125rem;
font-family: "Inter";
overflow: hidden;
transition: transform .5s ease-in-out;
border-radius: 1.25rem;
border: .063rem solid var(--cardBorderColor);
background-repeat: no-repeat;
background-size: contain;
cursor: pointer;
position: relative;
}

.service-card:hover {
transform: scale(1.05);
}

.content__title {
margin-top: .63rem;
font-size: 1.25rem;
color: var(--orange);
font-weight: 700;
text-align: center;
margin: .4rem;
}

.content__description {
margin-top: .62rem;
text-align: center;
opacity: 0;
transition: opacity .3s ease-in-out;
padding: .4rem;
overflow-y: scroll;
height: 23rem;
}

.service-card__content {
text-align: center;
border-radius: 1.25rem 0 0;
height: 100%;
word-wrap: break-word;
position: absolute;
transform: translateY(85%);
transition: transform .5s ease-out;
z-index: 1;
}

.service-card__image {
width: 20.56269rem;
height: 21.875rem;
background-image: url(${imageUrl});
transition: opacity .7s ease-out, transform .7s ease;
background-repeat: no-repeat;
}

.service-card:hover .service-card__content {
transform: translateY(1%)
}

.service-card:hover .content__description {
opacity: 1;
font-size: 1.2rem;
font-weight: 400;
}

.service-card:hover .service-card__image {
opacity: .2;
background-size: cover;
background-repeat: no-repeat;
transform: scale(1.8);
}

.content__description-wrapper {
overflow-y: scroll;
}

</style>
`;
}
