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
        }

        .button:hover {
            background: var(--orangeColor);
            color: var(--white);
            transition: .3s all;
        }

        ._active {
            background: var(--orangeColor);
            color: var(--white);
            transition: .3s all;
        }

        ._active:hover {
            transform: scale(1.2);
        }
    </style>
`;
