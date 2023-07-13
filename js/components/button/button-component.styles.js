export default `
    <style>
        @import url('../common.css');
        .button {
            border: var(--onePixelBorder);
            background: transparent;
            color: var(--orangeColor);
            cursor: pointer;
            transition: background-color .3s ease-in, color .3s ease-out;
            padding: 0.75rem 2rem;
            border-radius: .625rem;
        }

        .button:hover {
            background-color: var(--orange);
            color: var(--white);
            transition: .3s all;
            transform: scale(1.1);
        }

        ._active {
            background: var(--orange);
            color: var(--white);
            transition: .3s all;
        }

        ._active:hover {
            transform: scale(1.1);
        }
    </style>
`;
