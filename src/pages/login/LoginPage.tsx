import { useState } from 'react';
import Button from '../../components/shared/Button.tsx';
import { login } from './services.ts';
import './loginPage.css';
import Form from '../../components/shared/Form.tsx';
import { useAuth } from '../../context/authcontext/authCustomHook.ts';
import Layout from '../../components/layout/Layout.tsx';
import FormField from '../../components/shared/FormField.tsx';
import { ILogin } from '../../interfaces/interfaces.ts';
import RawSwitch from '../../components/shared/Switch.tsx';

export default function LoginPage() {
    const { onLogin } = useAuth();
    const [formValues, setFormValues] = useState<ILogin>({
        email: '',
        password: '',
        save: false
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await login(formValues);
        onLogin();
    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.checked,
        }));
        console.log(formValues);
        };
    

    const { email, password } = formValues;
    const buttonDisabled = !email || !password;
    return (
        <Layout>
        <div className='loginPage'>
            <h1 className='loginPage-title'>Login</h1>
            <Form id='login-form'variant='column'>
                <FormField
                    customheight="38px"
                    type='text'
                    name='email'
                    id='email'
                    onChange={handleChange}
                />
                <FormField
                    customheight="38px"  
                    type='password'
                    name='password'
                    id='password'
                    onChange={handleChange}
                />
                <RawSwitch Name='save' checked={true} onChange={handleSwitchChange} Rightname='Guardar contraseña' />
                <Button
                    type='submit'
                    disabled={buttonDisabled}
                    className='loginButton'
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Form>
        </div>
        </Layout>
    );
}
