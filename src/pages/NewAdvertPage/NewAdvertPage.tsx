import { useEffect, useState } from 'react';
import Button from '../../components/shared/Button.tsx';
import Form from '../../components/shared/Form.tsx';
import Layout from '../../components/layout/Layout.tsx';
import FormField from '../../components/shared/FormField.tsx';
import './NewAdvertPage.css';
import RawSwitch from '../../components/shared/Switch.tsx';
import Select from '../../components/shared/Select.tsx';
import getTags from '../../components/layout/services.ts';
import { postAd } from './services.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/shared/ErrorMessage.tsx';

export default function NewAdvertPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [optionTags, setTags] = useState<string[]>([]);
    const [formValues, setFormValues] = useState({
        name: '',
        price: 0,
        tags: '',
        sale: false,
    });
    const [error, setError] = useState<string | null>(null);
    const resetError = () => setError(null);

    const { name, price, tags, sale } = formValues;

    const buttonDisabled = !name || !price || !tags.length;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.value,
        }));
    };
    const handleChangeMultiSelect = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const options = Array.from(event.target.selectedOptions).map(
            (option) => option.value,
        );
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: options.join(','),
        }));
    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.checked,
        }));
    };
    function hasValidExtension(fileName: string) {
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
        const extension = fileName
            .slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
            .toLowerCase();
        return validExtensions.includes(extension);
    }
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && hasValidExtension(file.name)) {
            const formData = new FormData();
            formData.append('photo', file);
            setFormValues((currentFormValues) => ({
                ...currentFormValues,
                [event.target.name]: file,
            }));
        } else {
            setError('Formato de imagen no valido');
        }
    };
    const handleBack = () => {
        const to = location.state?.from || '/';
        navigate(to, { replace: true });
    };
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
            const response = await postAd(formValues);

            navigate(`/adverts/${response.data.id}`, { replace: true });
        } catch (error) {
            const msg: string = (error as Error).message;
            setError(`Error fetching new ad: ${msg}`);
        }
    };
    useEffect(() => {
        const getDataTags = async () => {
            try {
                const tags = await getTags();
                setTags(tags.data);
            } catch (error) {
                const msg: string = (error as Error).message;
                setError(`Error fetching tags: ${msg}`);
            }
        };
        getDataTags();
    }, []);
    return (
        <Layout>
            <section className='new-ad-contianer'>
                <Form
                    id='ad-form'
                    $variant='column'
                    $customwidth='350px'
                >
                    <label htmlFor='name'>
                        <h4>Articulo:</h4>
                    </label>
                    <FormField
                        type='text'
                        name='name'
                        id='name'
                        $customwidth='100%'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='price'>
                        <h4>Price:</h4>
                    </label>
                    <FormField
                        type='number'
                        step='0.01'
                        name='price'
                        id='price'
                        $customwidth='100%'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='tags'>
                        <h4>Etiquetas:</h4>
                    </label>
                    <Select
                        name='tags'
                        id='tags'
                        $customwidth='100%'
                        $customheight='inered'
                        multiple
                        onChange={handleChangeMultiSelect}
                        required
                    >
                        {optionTags.map((tag, index) => (
                            <option
                                value={tag}
                                id={tag}
                                key={index}
                            >
                                {tag}
                            </option>
                        ))}
                    </Select>
                    <label htmlFor='photo'>
                        <h4>Foto:</h4>
                    </label>
                    <input
                        type='file'
                        name='photo'
                        id='photo'
                        onChange={handleFileUpload}
                        accept='image/png, image/jpeg'
                    />
                    <RawSwitch
                        Name='sale'
                        Leftname='Compra'
                        Rightname='Venta'
                        checked={sale}
                        onChange={handleSwitchChange}
                    />
                    <div className='buttonWrapper'>
                        <Button
                            type='button'
                            className='backButton'
                            $customwidth='50%'
                            onClick={handleBack}
                        >
                            Volver
                        </Button>
                        <Button
                            type='submit'
                            disabled={buttonDisabled}
                            className='newAdButton'
                            $customwidth='50%'
                            onClick={handleSubmit}
                        >
                            Crear anuncio
                        </Button>
                    </div>
                    {error && (
                        <ErrorMessage
                            className='loginPage-error'
                            onClick={resetError}
                        >
                            <h3>{error.toUpperCase()}</h3>
                        </ErrorMessage>
                    )}
                </Form>
            </section>
        </Layout>
    );
}
