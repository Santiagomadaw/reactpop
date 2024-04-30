import { useState } from 'react';
interface ISwitch{ 
    checked: boolean;
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
}
const RawSwitch = ({ checked, onChange }:ISwitch) => {
    const [isChecked, setIsChecked] = useState(!checked);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        onChange(event);
    };

    return (
        <div className='switch-container'>
            <h3>Venta</h3>
            <label className='switch'>
                <input
                    type='checkbox'
                    name='sale'
                    id='buysell'
                    checked={isChecked}
                    onChange={handleInputChange}
                />
                <span className='slider round'></span>
            </label>
            <h3>Compra</h3>
        </div>
    );
};

export default RawSwitch;
