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
import { client } from '../../utils/api/client.ts';

export default function NewAdvertPage() {
    const [optionTags, setTags] = useState<string[]>([]);
    const [formValues, setFormValues] = useState({
        name: '',
        price: 0,
        tags: '',
        sale: false,
    });

    client.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    const { name, price, tags, sale } = formValues;

    const buttonDisabled = !name || !price || !tags.length;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.value,
        }));

    };
    const handleChangeMultiSelect = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const options = Array.from(event.target.selectedOptions).map(
            (option) => option.value
        );
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: options.join(', '),
        }));

    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('pre',formValues)
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [event.target.name]: event.target.checked,
        }));
        console.log('psot',formValues)

    };
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
               console.log(formValues)

        const file = event.target.files && event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            setFormValues((currentFormValues) => ({
                ...currentFormValues,
                [event.target.name]: file,
            }
            ));
        }       console.log(formValues)

    };
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
       console.log(formValues)
        event.preventDefault();
        await postAd(formValues);
    };
    useEffect(() => {
        const getDataTags = async () => {
            try {
                const tags = await getTags();
                setTags(tags.data);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };
        getDataTags();
    }, []);
    return (
        <Layout>
            <section className='new-ad-contianer'>
                <Form id='ad-form' variant='column' customwidth='350px'>
                    <label htmlFor='name'>Articulo:</label>
                    <FormField
                        type='text'
                        name='name'
                        id='name'
                        customwidth='100%'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='price'>price:</label>
                    <FormField
                        type='number'
                        step='0.01'
                        name='price'
                        id='price'
                        customwidth='100%'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='tags'>Etiquetas:</label>
                    <Select
                        name='tags'
                        id='tags'
                        customwidth='100%'
                        customheight='inered'
                        multiple
                        onChange={handleChangeMultiSelect}
                        required
                    >
                        {optionTags.map((tag, index) => (
                            <option value={tag} id={tag} key={index}>
                                {tag}
                            </option>
                        ))}
                    </Select>
                    <label htmlFor='photo'>Url foto:</label>
                    <input
                        type='file'
                        name='photo'
                        id='photo'
                        onChange={handleFileUpload}
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
                            customwidth='50%'
                        >
                            Volver
                        </Button>
                        <Button
                            type='submit'
                            disabled={buttonDisabled}
                            className='newAdButton'
                            customwidth='50%'
                            onClick={handleSubmit}
                        >
                            Crear anuncio
                        </Button>
                    </div>
                </Form>
            </section>
        </Layout>
    );
}
