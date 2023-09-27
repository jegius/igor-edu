const binaryErrorPicture =
  "data:image/jpeg;base64,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";
export default function generateStyles(img, imgHeight, imgWidth, enableDefaultImage) {
  return `
        <style>
        @import url('../common.css');
        .about__image {
            background-image: url(${`${
              img ?? (enableDefaultImage === "true" ? binaryErrorPicture : null)
            }`});
            min-width: ${imgWidth ?? "100%"}; 
            min-height: ${imgHeight ?? "100%"};
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center
        }
        </style>
    `;
}
