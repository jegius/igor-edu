export default {
  title: 'SectionComponent',
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    secondary: { control: 'text' },
    level: { control: 'number' },
  },
};

const Template = args => {
  return `
        <section-component secondary=${args.secondary} id=${args.id}>
            <div>
                <image-component url='../../../img/about_houseplant.png' image-height='25' image-width='25'/>
            </div>
            <div style='width: 30rem'>
                <title-component level='1'>We grow <span class='title__secondary'>plants</span> for you</title-component>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <button-component text='click' active='true'/>
            </div>
        </section-component>
    `;
};

export const Default = Template.bind({});

Default.args = {
  id: 'test',
  secondary: 'false',
};

const templateWithScroll = args => {
  return `

            <link-element
                is-active='true'
                link-text='test'
                href='#test'>
            </link-element>
            <section-component secondary=${args.secondary} id=${args.id}>
            <div style='width: 28.04969rem'>
                <image-component url='../../../img/about_houseplant.png' image-height='25' image-width='25'/>
            </div>
            <div style='width: 28rem'>
              <title-component custom-style='.title: {font-size: 10rem}' level='1'>We grow <span class='title__secondary'>plants</span> for you</title-component>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <button-component text='click' active='true'/>
            </div>
        </section-component>
    `;
};

export const withScroll = templateWithScroll.bind({});

withScroll.args = {
  id: 'test',
  secondary: 'true',
};
