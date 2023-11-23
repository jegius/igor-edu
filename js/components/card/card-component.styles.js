export default function generateStyles(customGroupId) {
  return `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;600&display=swap');
    @import url('../common.css');
    .service-card {
        width: 20.625rem;
        height: 28.125rem;
        font-family: "Inter";
        overflow: hidden;
        transition: transform 0.5s ease-in-out;
        position: relative;
        border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
        border: 0.063rem solid #E3E1D5;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;
    }

    .service-card:hover {
       transform: scale(1.05);
    }

    

    .underImage__title {
        margin-top: 0.63rem;
        font-size: 1.25rem;
        color: var(--orangeColor);
        font-weight: 700;
        text-align: center;
        margin: .4rem;
    }

    .underImage__description {
        margin-top: 0.62rem;
        text-align: left;
        opacity: 0;
        transition: opacity .8s ease-in-out;
        padding: 10px;
    }

    .service-card__underImage {
        text-align: center;
        border-radius: 0rem 0rem 1.25rem 1.25rem;
        border-top: none;
        width: 20.625rem;
        height: 6.25rem;
        overflow-y: scroll;
        word-wrap: break-word;
        position: relative;
        position: absolute;
        transform: translateY(40%);
        transition: all .5s ease-out;
        
    }

    .service-card__image {
        border-radius: 1.25rem 1.25rem 0rem 0rem;
        width: 20.56269rem;
        height: 21.875rem;
        background-image: url('../../../img/servicesCards/service_picture${customGroupId}.png');
        transition: all .7s ease-out; 
        background-repeat: no-repeat;
    }   

    .service-card:hover .service-card__underImage {
        transform: translateY(-100%);
        height: 100%;
    }

       .service-card:hover .underImage__description {
        opacity: 1;
        font-size: 1.2rem;
        font-weight: 400;
    }

      .service-card:hover .service-card__image {
        opacity: .2;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
      }

      .service-card:not(:hover) {
        transition: height 0.5s ease-in-out; 
     }

      .service-card:not(:hover) .service-card__underImage {
         transition: height 0.5s ease-in-out; 
    }

      .service-card:not(:hover) .service-card__image {
         transition: height 0.5s ease-in-out; 
     }
     

   </style>
    `;
}
