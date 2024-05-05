import styled from 'styled-components';
export default function Footer() {
    return (
        <StyledFooter>
            <p>Powered by React + Vite + Typescript</p>

        </StyledFooter>
    );
}
const StyledFooter = styled.footer`
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    color: var(--text-100);
    border-top: 1px solid var(--text-100);
    p {
        font-size: medium;
    }
`;
