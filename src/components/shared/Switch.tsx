import { useState } from 'react';
import './switch.css'
interface ISwitch{ 
    checked: boolean;
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
    Leftname?: string;
    Rightname?: string;
    Name?: string;
}
const RawSwitch = ({ checked, onChange, Leftname='',Rightname='',Name='switch' }:ISwitch) => {
    const [isChecked, setIsChecked] = useState(checked);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        onChange(event);
    };
    console.log('ischecked',checked)
    return (
        <div className='switch-container'>
            <h3 className='switchtext'>{Leftname}</h3>
            <label className='switch'>
                <input
                    type='checkbox'
                    name={Name}
                    id='buysellcheck'
                    checked={isChecked}
                    onChange={handleInputChange}
                />
                <span className='slider round'></span>
            </label>
            <h3 className='switchtext'>{Rightname}</h3>
        </div>
    );
};

export default RawSwitch;
