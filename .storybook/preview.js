import {NavComponent} from "../js/components/nav/nav-component.js";
import {LinkComponent} from "../js/components/link/link-component.js";

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

[NavComponent, LinkComponent].map(component => customElements.define(component.name, component));
export default preview;
