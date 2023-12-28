import { html } from 'lit-html';

export default {
  title: 'ScrollComponent',
  tags: ['autodocs'],
};

const Template = args => {
  return html`
    <scroll-component>
      <header-component
        base-url="http://localhost:6006/js/components/header/header-config.json"
      ></header-component>
      <section-component>
        <div class="first-img">
          <image-component
            url="../../../img/leafs/welcome_leafs.png"
            image-height="25"
            image-width="25"
          />
        </div>
        <div class="first-content">
          <title-component
            level="1"
            custom-styles=" .title { 
                font-size: 2.813rem;
                text-align: left
                }
                .title__secondary{
                color:green
                }"
            >We grow <span class="title__secondary">plants</span> and give you
            oxygen</title-component
          >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <button-component text="LEARN MORE"></button-component>
        </div>
      </section-component>
      <section-component id="second">
        <div style="width: 30rem">
          <title-component
            level="1"
            custom-styles=" .title { 
                font-size: 2.813rem;
                text-align: left
                }
                .title__secondary{
                color: #e06733
                }"
            >We are
            <span class="title__secondary">professional experienced</span>
            gardeners</title-component
          >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div>
          <image-component
            url="../../../img/about_houseplant.png"
            image-height="25"
            image-width="25"
          />
        </div>
      </section-component>
      <section-component id="third">
        <div>
          <image-component
            url="../../../img/about_houseplant.png"
            image-height="25"
            image-width="25"
          />
        </div>
        <div style="width: 30rem">
          <title-component level="1"
            >We grow <span class="title__secondary">plants</span> for
            you</title-component
          >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <button-component text="click" active="true" />
        </div>
      </section-component>
    </scroll-component>
  `;
};

export const Default = Template.bind({});
