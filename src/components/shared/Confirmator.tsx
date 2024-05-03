import styled from "styled-components"
import { useConfirm } from "../../context/confirmationContext/confirmCustomHook"
import Button from "./Button"
const Confirmator=()=>{

    const {onAccept,onCancel, hiddenState,onHidden, textState} =useConfirm()
    const handleAccept = () =>{
        onAccept()
        onHidden()
    }
    const handleCancel = () =>{
        onCancel()
        onHidden()
    }

    return (
    <StyledConfirm hidden={hiddenState}>
        <div className="blurer" hidden={hiddenState}></div>   
        <div hidden={hiddenState} className="confirmator">
            <h2>Seguro que desea {textState}</h2>
            <div className="buttonWrapper">
                <Button onClick={handleAccept} customheight="25px">Si</Button>
                <Button onClick={handleCancel} customheight="25px">No</Button>
            </div>  
            </div>    
    </StyledConfirm>)}

export default Confirmator

const StyledConfirm=styled.div`

.blurer{
    position: absolute;
    left: 0;
    width: 100%;
    height:100%;
    opacity: .8;
    backdrop-filter: blur(15px);
    z-index: 3;
    &[hidden]{
        display: none;
    };
}
.confirmator{
    display: flex;
    flex-direction:column;
    gap: 22px;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    padding: 20px;
    border: 2px solid var(--accent-100);
    border-radius: 10px;
    background: var(--bg-200);
    position: absolute;
    &[hidden]{
        display: none;
    }
    h2{
        color: var(--text-200);

    }

}`