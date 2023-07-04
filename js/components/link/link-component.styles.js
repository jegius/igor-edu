export default `
    <style>     
        @import url('../common.css');
        .link {
            font-family: "Inika",serif;
            color: var(--navLinks);
            text-decoration: none;
            transition: color, font-weight .2s ease;
            font-weight: normal;
        }
        
        .link_active {
            color: var(--orange);
            font-weight: 700;
        }
    </style>
`;