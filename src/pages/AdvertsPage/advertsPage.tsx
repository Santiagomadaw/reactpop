import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleAd from './components/ad.tsx';
import { IAds, IpropsFilter } from '../../interfaces/interfaces.ts';
import getAds from './service.ts';
import Layout from '../../components/layout/Layout.tsx';
import { useFilterContext } from '../../context/filterContext/filterCustomHook.ts';
import ErrorMessage from '../../components/shared/ErrorMessage.tsx';
import Button from '../../components/shared/Button.tsx';
import Noad from './components/Noad.tsx';

function findHighestPrice(ads: IAds[]): number {
    return ads.reduce((maxPrice, ad) => {
        return ad.price > maxPrice ? ad.price : maxPrice;
    }, 0);
}
export default function AdvertsPage() {
    const { filtersState, updateSlider, updateFilters } = useFilterContext();
    const [ads, setAds] = useState<IAds[]>([]);
    const [error, setError] = useState<string | null>(null);
    const resetError = () => setError(null);
    useEffect(() => {
        const getDatad = async () => {
            try {
                const ads = await getAds();
                setAds(ads.data);
                //Cargo los valores del Slide en el contexto
                //de este modo el valor maximo de la barra sera
                //el de nuestro articulo mas caro
                const maxprice = findHighestPrice(ads.data);
                updateSlider(maxprice);
                updateFilters({ ...filtersState, price: [0, maxprice] });
            } catch (error) {
                if (error) {
                    const msg: string = (error as Error).message;
                    setError(msg);
                }
            }
        };
        getDatad();
    }, []);

    const FilterOption = (filtersState: IpropsFilter): IAds[] => {
        let filteredAds = ads;
        // Filter by buy/sell option
        if (filtersState.buysell === 'sell') {
            filteredAds = filteredAds.filter((ad) => ad.sale === true);
        } else if (filtersState.buysell === 'buy') {
            filteredAds = filteredAds.filter((ad) => ad.sale === false);
        } else if (filtersState.buysell !== 'all') {
            filteredAds = ads;
        }
        // Filter by name
        if (filtersState.search) {
            const searchTerm = filtersState.search.toLowerCase();
            filteredAds = filteredAds.filter((ad) =>
                ad.name.toLowerCase().includes(searchTerm),
            );
        }
        // Filter by tags
        if (filtersState.tags) {
            filteredAds = filteredAds.filter((ad) =>
                filtersState.tags.every((tag) => {
                    return ad.tags.includes(tag);
                }),
            );
        }
        if (filtersState.price) {
            filteredAds = filteredAds.filter((ad) => {
                if (Array.isArray(filtersState.price)) {
                    return (
                        ad.price >= filtersState.price[0] &&
                        ad.price <= filtersState.price[1]
                    );
                }
                return false;
            });
        }
        return filteredAds;
    };

    let sellAds = ads;
    if (filtersState) {
        sellAds = FilterOption(filtersState);
        Button;
    }
    return (
        <Layout>
            <StyledAdList className='ad-list'>
                {sellAds.length > 0 ? (
                    sellAds.map((ad, index) => (
                        <SingleAd
                            key={index}
                            {...ad}
                        />
                    ))
                ) : (
                    <Noad />
                )}
                {error && (
                    <ErrorMessage
                        className='loginPage-error'
                        onClick={resetError}
                    >
                        <h3>{error.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </StyledAdList>
        </Layout>
    );
}

const StyledAdList = styled.div`
    margin: auto;
    display: grid;
    justify-content: center;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, 235px);
    padding-top: 50px;

    &:has(.no-ad[noad]) {
        display: flex;
    }

    .no-ad {
        color: silver;
        text-wrap: nowrap;
        text-align: start;
    }
`;
