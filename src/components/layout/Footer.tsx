import styled from "styled-components"

export default function Footer(){
    return <StyledFooter><h2>This is the footer</h2></StyledFooter>
}
const StyledFooter = styled.footer`
position: sticky;
display:flex;
align-items: center;
justify-content: center;
height: 90px;
color: var(--text-100);
border-top: 1px solid var(--text-100);
p{
    font-size:xx-large;
}
`