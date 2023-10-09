export function generateStyles() {
  return `
    <style>
    @import url('../common.css');  
    .header {
        background-color: var(--mainBackgroundGreen);
        font-family: "Inika";
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
    }
    </style>
    `;
}
