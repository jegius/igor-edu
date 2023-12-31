export default `
    <style>
        @import url('../common.css');
        .button {
            border: var(--onePixelBorder);
            background: transparent;
            color: var(--orangeColor);
            cursor: pointer;
            transition: background-color 0.15s ease-in, color 0.15s ease-out, transform 0.15s ease-in;
            padding: 0.75rem 2rem;
            border-radius: .625rem;
        }

        .button:hover {
            background-color: var(--orange);
            color: var(--white);
            transform: scale(1.025);
        }

        ._active {
            background: var(--orange);
            color: var(--white);
        }

        ._active:hover {
            transform: scale(1.1);
        }
    </style>
`;
