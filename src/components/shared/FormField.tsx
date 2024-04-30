import styled from 'styled-components';

interface IFormField { 
    customheight?: string;
    customwidth?: string;
}

const FormField = styled.input<IFormField>`
    border: 1px solid var(--primary-100);
    outline: 1px solid var(--primary-100);

    border-radius: 10px;
    padding-left: 10px;
    height: ${props => props.customheight || "30px"};
    width: ${props => props.customwidth || "fit-content"};
`;

export default FormField;