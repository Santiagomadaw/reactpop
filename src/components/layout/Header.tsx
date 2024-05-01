import { Link } from 'react-router-dom';
import './header.css';
import { useEffect, useState } from 'react';
import getTags from './services';
import Button from '../shared/Button';
import Form from '../shared/Form';
import {  useAuth } from '../../context/authcontext/authCustomHook';
import { logout } from '../../pages/login/services';
import { useFilterContext } from '../../context/filterContext/filterCustomHook';
import { IpropsFilter } from '../../interfaces/interfaces';
import Select from '../shared/Select';
import FormField from '../shared/FormField';
import { useConfirm } from '../../context/confirmationContext/confirmCustomHook';
import { client } from '../../utils/api/client';
export default function Header() {
    const [tags, setTags] = useState<string[]>([]);
    const { logState, onLogout } = useAuth();
    const { filtersState, updateFilters } = useFilterContext();
    const {confirmState, onUnhidden, onSession, onCancel} =useConfirm()    
    const [gonnaLogout, setGonnaLogout] = useState<boolean>();
    const handleLogoutClick =  () => {
        setGonnaLogout(true)
        onSession()
        onUnhidden()
    
    };
    console.log('header',client.defaults.headers.common['Authorization'])
    useEffect(() => {
        const aceptedLogout =async() =>{
            await logout();
            onLogout();
        }
        console.log('acepto',confirmState, 'quiero',gonnaLogout)
        if(confirmState&&gonnaLogout){
            aceptedLogout()
        }
        onCancel()
        setGonnaLogout(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmState]);


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const currentFilterState = (
            currentFilterState: IpropsFilter
        ): IpropsFilter => {
            return {
                ...currentFilterState,
                [event.target.name]: event.target.value,
            };
        };
        updateFilters(currentFilterState(filtersState));
    };
    const handleChangeMultiSelect = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const options = Array.from(event.target.selectedOptions).map(
            (option) => option.value
        );
        const currentFilterState = (
            currentFilterState: IpropsFilter
        ): IpropsFilter => {
            return {
                ...currentFilterState,
                [event.target.name]: options,
            };
        };
        updateFilters(currentFilterState(filtersState));
    };
    const handleClear = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        updateFilters({ search: '', tags: [], buysell: 'all' });
    };
    //Useffect
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
        <header className='header'>
            <Link to='/adverts'>
                <h1>
                    <span>w</span>allopop
                </h1>
            </Link>
            {logState ? (
                <>
                    

                    <Form id='search'>
                        <FormField
                            customheight="38px"
                            customwidth="100%"
                            type='text'
                            placeholder='Buscar'
                            name='search'
                            id='searchItem'
                            onChange={handleChange}
                        />
                        <Select
                            customheight="38px"
                            name='tags'
                            id='tagsSelect'
                            value={filtersState.tags}
                            multiple
                            onChange={handleChangeMultiSelect}
                        >
                            <option value='' disabled>
                                --Tags--
                            </option>
                            {tags.map((tag, index) => (
                                <option value={tag} id={tag} key={index}>
                                    {tag}
                                </option>
                            ))}
                        </Select>
                        <Select
                            customheight="38px"
                            name='buysell'
                            id='buysell'
                            value={filtersState.buysell}
                            onChange={handleChange}
                        >
                            <option value='all' disabled>
                                --Option--
                            </option>
                            <option value='buy' id='buy'>
                                Compra
                            </option>
                            <option value='sell' id='sell'>
                                Venta
                            </option>
                        </Select>
                        <Button id='searchbutton' onClick={handleClear}>
                            Reset
                        </Button>
                    </Form>
                    <nav className='navContainer'>
                        <ul>
                            <li>
                                <Button
                                    className='login'
                                    onClick={handleLogoutClick}
                                    id='logOutButton'
                                >
                                    Logout
                                </Button>
                            </li>
                            <li>
                                <Button className='signup' as={Link} to='/adverts/new'>
                                    Nuevo Anuncio
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <></>
            )}
        </header>
    );
}
