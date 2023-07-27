export default function generateStyles(customStyles) {
  return `
  <style>
      @import url('../common.css');

      .logo-href {
          display: block;
          text-decoration: none;
          color:black;
          cursor: default;
        }

      .logo {
          width: 4.948rem;
          height: 1.315rem;
          align-items: flex-end;
          display: flex;
          justify-content: center;
      }
      
      .logo-image {
          height: 1.25rem;
          width: 1.25rem;
          background-repeat: no-repeat;
          margin-bottom: 0.25rem;
      }
      
      .logo-brandname {
          font-size: 1rem;
      }
  
      ._clickable {
          cursor: pointer;
      }

      ${customStyles ?? customStyles}
      </style>
    `;
}
