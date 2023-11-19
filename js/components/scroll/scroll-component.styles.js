export default function generateStyles() {
  return `
        <style>
            @import url('../common.css');

            ._scrollable {
                overflow: scroll;
                width: 100vw;
                height: 100vh;
            }

            ._scrollable::-webkit-scrollbar {
                width: .5rem;
                background-color: #f9f9fd;
            }
        </style>
    `;
}
