import { useConfirm } from "../../context/confirmationContext/confirmCustomHook"
import Button from "./Button"
import './Confirmator.css'
const Confirmator=()=>{

    const {confirmState,onAccept,onCancel, hiddenState,onHidden, textState} =useConfirm()

    const handleAccept = () =>{
        onAccept()
        onHidden()
        console.log(confirmState)
    }
    const handleCancel = () =>{
        onCancel()
        onHidden()
    }

    return (
    <>
        <div className="blurer" hidden={hiddenState}></div>   
        <div hidden={hiddenState} className="confirmator">
            <h2>Seguro que desea {textState}</h2>
            <div className="buttonWrapper">
                <Button onClick={handleAccept}>Si</Button>
                <Button onClick={handleCancel}>No</Button>
            </div>  
            </div>    
    </>)}

export default Confirmator