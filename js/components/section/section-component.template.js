import generateStyles from './section-component.style';

const generateTemplate = backgroundBoolean => {
  return `
  ${generateStyles(backgroundBoolean)}
        <div class='section'>
            <div class='section-content'>
                <slot/>
            </div>  
        </div>
    `;
};

export default generateTemplate;
