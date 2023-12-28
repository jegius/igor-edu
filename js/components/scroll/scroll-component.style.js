export const generateScrollStyle = () => {
  return `
        <style>
            @import url('../common.css');    

            .scroll-wrapper {
               overflow-y: scroll;
               width: 100%;
               height: 100vh;
            }

            .scroll-wrapper::-webkit-scrollbar {
                width: .5rem;
            }

            .scroll-wrapper::-webkit-scrollbar-track {
                background-color: #f1f1f1;
            }

            .scroll-wrapper::-webkit-scrollbar-thumb {
                background-color: #888;
            }
        </style>
    `;
};
