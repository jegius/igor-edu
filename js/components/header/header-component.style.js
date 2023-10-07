export function generateStyles(position) {
  return `
    <style>
    @import url('../common.css');  
    .header {
        background-color: var(--mainBackgroundGreen);
        font-family: "Inika";
        position: ${position};
    }
    
    .header__inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    <style>
    `;
}
