export default function generateStyles(src, imgHeight, imgWidth) {
  return `
        <style>
        @import url('../common.css');
        .about__image {
            background-image: url(${
               src ?? "../../../img/servicesCards/error_img.jpg"
            });
            min-width: ${imgWidth}; 
            min-height: ${imgHeight};
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center
        }
        </style>
    `;
}
