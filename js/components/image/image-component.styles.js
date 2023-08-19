export default function generateStyles(src, imgHeight, imgWidth) {
  return `
        <style>
        @import url('../common.css');
        .about__image {
            background-image: url(${
              src ? src : "../../../img/servicesCards/error_img.jpg"
            });
            min-width: ${imgWidth ? imgWidth + "rem" : "100%"}; 
            min-height: ${imgHeight ? imgHeight + "rem" : "100%"};
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center
        }
        </style>
    `;
}
