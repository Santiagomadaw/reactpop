import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getTags from './services';
import Button from '../shared/Button';
import Form from '../shared/Form';
import { useAuth } from '../../context/authcontext/authCustomHook';
import { logout } from '../../pages/login/services';
import { useFilterContext } from '../../context/filterContext/filterCustomHook';
import { IpropsFilter } from '../../interfaces/interfaces';
import Select from '../shared/Select';
import FormField from '../shared/FormField';
import { useConfirm } from '../../context/confirmationContext/confirmCustomHook';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Header() {
    const [tags, setTags] = useState<string[]>([]);
    const { logState, onLogout } = useAuth();
    const { maxPriceSlide, filtersState, updateFilters } = useFilterContext();
    const { confirmState, onUnhidden, onSession, onCancel } = useConfirm();
    const [gonnaLogout, setGonnaLogout] = useState<boolean>();
    const maxPrice: number = maxPriceSlide;

    const handleLogoutClick = () => {
        setGonnaLogout(true);
        onSession();
        onUnhidden();
    };
    useEffect(() => {
        const aceptedLogout = async () => {
            await logout();
            onLogout();
        };
        if (confirmState && gonnaLogout) {
            aceptedLogout();
        }
        onCancel();
        setGonnaLogout(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmState]);

    const handleChangeSlide = (event: number | number[]) => {
        if (Array.isArray(event)) {
            const currentFilterState = (
                currentFilterState: IpropsFilter,
            ): IpropsFilter => {
                return {
                    ...currentFilterState,
                    price: event,
                };
            };
            updateFilters(currentFilterState(filtersState));
        }
    };
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const currentFilterState = (
            currentFilterState: IpropsFilter,
        ): IpropsFilter => {
            return {
                ...currentFilterState,
                [event.target.name]: event.target.value,
            };
        };
        updateFilters(currentFilterState(filtersState));
    };
    const handleChangeMultiSelect = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const options = Array.from(event.target.selectedOptions).map(
            (option) => option.value,
        );
        const currentFilterState = (
            currentFilterState: IpropsFilter,
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
        updateFilters({
            search: '',
            tags: [],
            buysell: 'all',
            price: [0, maxPrice],
        });
    };

    //Useffect
    useEffect(() => {
        const getDataTags = async () => {
            try {
                const tags = await getTags();
                setTags(tags.data);
            } catch (error) {
                if (error) {
                    const msg: string = (error as Error).message;
                    console.log(`Error fetching tags: ${msg}`);
                }
            }
        };
        getDataTags();
    }, []);
    return (
        <StyledHeader className='header'>
            <Link to='/adverts'>
                <h1>
                    <span>w</span>allopop
                </h1>
            </Link>
            {logState ? (
                <>
                    <Form id='search'>
                        <div className='formslider'>
                            <FormField
                                $customheight='25px'
                                $customwidth='100%'
                                type='text'
                                placeholder='Buscar'
                                name='search'
                                id='searchItem'
                                onChange={handleChange}
                            />
                            <Slider
                                value={filtersState.price}
                                range
                                min={0}
                                max={maxPrice}
                                step={10}
                                onChange={handleChangeSlide}
                            />
                            {Array.isArray(filtersState.price) && (
                                <div className='slidertext'>
                                    <h5>{filtersState.price[0]}€</h5>
                                    <h5>{filtersState.price[1]}€</h5>
                                </div>
                            )}
                        </div>

                        <Select
                            $customheight='initial'
                            $customwidth='120px'
                            name='tags'
                            id='tagsSelect'
                            value={filtersState.tags}
                            multiple
                            onChange={handleChangeMultiSelect}
                        >
                            <option
                                value=''
                                disabled
                            >
                                --Tags--
                            </option>
                            {tags.map((tag, index) => (
                                <option
                                    value={tag}
                                    id={tag}
                                    key={index}
                                >
                                    {tag}
                                </option>
                            ))}
                        </Select>
                        <div className='selectbutton'>
                            <Select
                                $customheight='25px'
                                $customwidth='100px'
                                name='buysell'
                                id='buysell'
                                value={filtersState.buysell}
                                onChange={handleChange}
                            >
                                <option
                                    value='all'
                                    disabled
                                >
                                    --Option--
                                </option>
                                <option
                                    value='buy'
                                    id='buy'
                                >
                                    Compra
                                </option>
                                <option
                                    value='sell'
                                    id='sell'
                                >
                                    Venta
                                </option>
                            </Select>

                            <Button
                                id='searchbutton'
                                onClick={handleClear}
                                $customheight='25px'
                                $customwidth='100px'
                            >
                                Reset
                            </Button>
                        </div>
                    </Form>
                    <nav className='navContainer'>
                        <ul>
                            <li>
                                <Button
                                    className='login'
                                    onClick={handleLogoutClick}
                                    id='logOutButton'
                                    $customheight='25px'
                                    $customwidth='140px'
                                >
                                    Logout
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='signup'
                                    as={Link}
                                    to='/adverts/new'
                                    state={{ from: location.pathname }}
                                    $customheight='25px'
                                    $customwidth='140px'
                                    replace
                                >
                                    Nuevo Anuncio
                                </Button>
                            </li>
                            <li>
                                <Button
                                    className='goads'
                                    as={Link}
                                    to='/adverts'
                                    state={{ from: location.pathname }}
                                    $customheight='25px'
                                    $customwidth='140px'
                                    replace
                                >
                                    Anuncios
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <></>
            )}
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    z-index: 2;
    gap: 10px;
    border-bottom: 1px solid grey;
    position: sticky;
    top: 0;
    padding: 2px 10px;
    color: var(--text-100);
    .formslider{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        width:100%;
        height:100%;
        .rc-slider{
            width:98%;
            margin:auto;
            margin-top: 10px;
        }
        .slidertext{
            display:flex;
            justify-content: space-between;
            h5{
                color:var(--text-100);
            }
        }
    }
    h1 {
        font-family: 'Grandstander', cursive;
        font-weight: 900;
        span {
            font-size: 40px;
        }
    }
    ul {
        display: flex;
        flex-direction: column;

        gap: 3px;
        li {
            list-style-type: none;
            min-width: fit-content;
        }
    }
   
    }
`;
