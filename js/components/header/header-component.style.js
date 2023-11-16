export function generateStyles() {
  return `
    <style>
     @import url('../common.css');

    .header {
        background-color: var(--mainBackgroundGreen);
        font-family: "Inika";
        margin: 0 auto;
        transition: width .5s ease-in;
    }
    
    .header__inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    ._fixed {
        position: sticky;
        width: 95%;
        background-color: yellowgreen;
    }

    .loader {
        display:inline-block;
        font-family: monospace;
        font-size: 1rem;
        clip-path: inset(0 1.5rem 0 0);
        animation: points 1.3s steps(4) infinite;
     }

    @keyframes points {
      to {
        clip-path: inset(0 -.5rem 0 0)
      }
    }
    </style>
    `
}
