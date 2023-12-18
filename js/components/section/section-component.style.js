const generateStyles = backgroundBoolean => {
  let flag;
  if (backgroundBoolean === 'true') flag = true;
  if (backgroundBoolean === 'false') flag = false;
  return `
        <style>
            @import url('../common.css');
            .section { 
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                overflow: hidden;
                width: 700px;
            }
            
            .section-content {
                height: 100vh;
                width: 100%;
                display: flex;
                align-items:center;
                justify-content: space-between;
                background-color: ${
                  flag ? `var( --secondaryGray)` : `var(--white)`
                }
            }
        </style>
    `;
};

export default generateStyles;
