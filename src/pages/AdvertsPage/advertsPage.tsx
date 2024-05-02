import { useEffect, useState } from 'react';
import SingleAd from './components/ad.tsx';
import getAds from './service.ts';
import { IAds, IpropsFilter } from '../../interfaces/interfaces.ts';
import Layout from '../../components/layout/Layout.tsx';
import { useFilterContext } from '../../context/filterContext/filterCustomHook.ts';
import styled from 'styled-components';
import ErrorMessage from '../../components/shared/ErrorMessage.tsx';

export default function AdvertsPage() {
    const { filtersState } = useFilterContext();
    const [ads, setAds] = useState<IAds[]>([]);
    const [error, setError] = useState<string | null>(null);
    const resetError = () => setError(null);
    useEffect(() => {
        const getDatad = async () => {
            try {
                const ads = await getAds();
                setAds(ads.data);
            } catch (error) {
                if (error) {
                    const msg: string = (error as Error).message;
                    setError(msg);
                }
            }
        };
        getDatad();
        return () => {
            console.log('unmount');
        };
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
            filteredAds = filteredAds.filter((ad) =>
                ad.name.includes(filtersState.search)
            );
        }
        // Filter by tags
        if (filtersState.tags && filtersState.tags.length > 0) {
            filteredAds = filteredAds.filter((ad) =>
                filtersState.tags.every((tag) => ad.tags.includes(tag))
            );
        }
        return filteredAds;
    };

    let sellAds = ads;
    if (filtersState) {
        sellAds = FilterOption(filtersState);
    }
    return (
        <Layout>
            <StyledAdList className='ad-list'>
                {sellAds &&
                    sellAds.map((ad, index) => (
                        <SingleAd key={index} {...ad} />
                    ))}
                {error && <ErrorMessage
                        className='loginPage-error'
                        onClick={resetError}
                    >
                        <h3>{error.toUpperCase()}</h3>
                    </ErrorMessage>}
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
    @media (width < 1280px) {
        .ad-list {
            width: 90%;
        }
    }
    .no-ad {
        color: silver;
        text-wrap: nowrap;
        text-align: start;
    }
`;
