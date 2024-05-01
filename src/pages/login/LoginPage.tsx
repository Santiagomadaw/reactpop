import { useState } from 'react';
import Button from '../../components/shared/Button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

import { login } from './services.ts';
import './loginPage.css';
import Form from '../../components/shared/Form.tsx';
import { useAuth } from '../../context/authcontext/authCustomHook.ts';
import Layout from '../../components/layout/Layout.tsx';
import FormField from '../../components/shared/FormField.tsx';
import { ILogin } from '../../interfaces/interfaces.ts';
import RawSwitch from '../../components/shared/Switch.tsx';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { onLogin } = useAuth();
    const [formValues, setFormValues] = useState<ILogin>({
        email: '',
        password: '',
        save: false,
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await login(formValues);
            onLogin();
            const to = location.state?.from || '/';
            navigate(to, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.checked,
        }));
    };
    const { email, password } = formValues;
    const buttonDisabled = !email || !password;
    return (
        <Layout>
            <div className='loginPage'>
                <h1 className='loginPage-title'>Login</h1>
                <Form id='login-form' variant='column' customwidth='100%'>
                    <FormField
                        customheight='38px'
                        customwidth='100%'
                        type='text'
                        name='email'
                        id='email'
                        onChange={handleChange}
                    />
                    <FormField
                        customheight='38px'
                        customwidth='100%'
                        type='password'
                        name='password'
                        id='password'
                        onChange={handleChange}
                    />
                    <RawSwitch
                        Name='save'
                        checked={true}
                        onChange={handleSwitchChange}
                        Rightname='Guardar'
                    />
                    <Button
                        type='submit'
                        disabled={buttonDisabled}
                        className='loginButton'
                        onClick={handleSubmit}
                        customwidth='100%'
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </Layout>
    );
}
