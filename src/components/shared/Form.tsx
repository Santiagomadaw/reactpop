import styled from 'styled-components';
interface IForm {
    $customheight?: string;
    $customwidth?: string;
    $variant?: string;
}

const Form = styled.form<IForm>`
    display: flex;
    justify-content: space-between;
    width: 60%;
    align-items: center;
    align-items: center;
    height: ${(props) => props.$customheight || 'fit-content'};
    width: ${(props) => props.$customwidth || '80%'};
    gap: 10px;
    h4{
        color:var(--text-100);
    }
    ${(props) =>
        props.$variant === 'column'
            ? `&{
            display: flex;
            gap: 12px;
            flex-direction: column;
            align-items: start;
            max-width: 95vw;
            & .signUpButton{
                margin-top: 1rem;
            }`
            : ''};
    }
    
`;

export default Form;
