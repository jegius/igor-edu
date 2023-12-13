const generateStyles = backgroundBoolean => {
  let flag;
  if (backgroundBoolean === 'true') flag = true;
  if (backgroundBoolean === 'false') flag = false;
  return `
        <style>
            .section { 
                border: .2rem solid black;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                overflow: hidden;
                width: 700px;
            }
            
            .section-content {
                width: 100%;
                display: flex;
                align-items:center;
                justify-content: space-between;
                background-color: ${flag ? '#E3E1D5' : 'white'}
            }
        </style>
    `;
};

export default generateStyles;
