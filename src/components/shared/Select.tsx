import styled from 'styled-components';
interface ISelect { 
    customheight?: string;
    customwidth?: string;
}

const Select = styled.select<ISelect>`
    font-size: large;
    appearance: none;
    overflow: auto;
    height: ${props => props.customheight || "30px"};;
    width: ${props => props.customwidth || "18%"};
    min-height: fit-content;
    outline: 1px solid var(--primary-100);
    border-radius: 10px;

    &[multiple]:hover {
        height: initial;
    }
    & option {
        text-align: center;
    }
    & option:checked {
        background-color: var(--primary-100);
        color: var(--primary-300);
    
    }
    
    @media (max-width: 1280px) {
            display:grid;
            flex-direction: column;
            gap: 5px;
            padding: 0px 40px;
            #search {
                width: 100%;
        
        }
    }
`;

export default Select;
