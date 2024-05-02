import styled from "styled-components"

export default function Footer(){
    return <StyledFooter><p>This is the footer</p></StyledFooter>
}
const StyledFooter = styled.footer`
position: sticky;
height: 90px;
border: 1px solid red;
p{
    font-size:xx-large;
}
`