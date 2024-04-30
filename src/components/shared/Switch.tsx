import { useState } from 'react';
import './shitch.css'
interface ISwitch{ 
    checked: boolean;
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
    Leftname?: string;
    Rightname?: string;
    Name?: string;
}
const RawSwitch = ({ checked, onChange, Leftname='',Rightname='',Name='switch' }:ISwitch) => {
    const [isChecked, setIsChecked] = useState(!checked);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        onChange(event);
    };

    return (
        <div className='switch-container'>
            <h3>{Leftname}</h3>
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
            <h3>{Rightname}</h3>
        </div>
    );
};

export default RawSwitch;
