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
    }

    .loader {
  display:inline-block;
  font-family: monospace;
  font-size: 1rem;
  clip-path: inset(0 3ch 0 0);
  animation: l 1s steps(4) infinite;
}

@keyframes l {
  to {
    clip-path: inset(0 -1ch 0 0)
  }
}
    </style>
    `
}
