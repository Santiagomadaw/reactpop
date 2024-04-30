import styled from 'styled-components';
interface IButton {
    customheight?: string;
    customwidth?: string;
    variant?: string;
}

const Button = styled.button<IButton>`

    cursor: pointer;
    background-color: var(--accent-100);
    border: 3px solid #ebebeb;
    padding: 10px 22px;
    border-radius: 10px;
    color: var(--accent-200);
    text-align: center;
    display: inline-block;
    font-size: 16px;
    height: ${(props) => props.customheight || 'fit-content'};
    width: ${(props) => props.customwidth || 'fit-content'};
    &:hover{
        transform: scale(.96);
    }
    &:disabled{
        cursor:not-allowed;
        transform: scale(1);
        background-color: var(--accent-200);
        color: var(--accent-100);
    }
`;

export default Button;
