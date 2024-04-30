import { useEffect, useState } from 'react';
import SingleAd from './components/ad.tsx';
import getAds from './service.ts';
import { IAds, IpropsFilter} from '../../interfaces/interfaces.ts';
import Layout from '../../components/layout/Layout.tsx';
import { useFilterContext } from '../../context/filterContext/filterCustomHook.ts';
import './advertsPage.css'

export default function AdvertsPage() {
    const { filtersState } = useFilterContext();
    const [ads, setAds] = useState<IAds[]>([]);
    useEffect(() => {
        const getDatad = async () => {
            try {
                const ads = await getAds();
                setAds(ads.data);
            } catch (error) {
                console.error('Error fetching ads:', error);
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
            filteredAds = filteredAds.filter(ad => ad.sale === true);
        } else if (filtersState.buysell === 'buy') {
            filteredAds = filteredAds.filter(ad => ad.sale === false);
        } else if (filtersState.buysell !== 'all') {
            filteredAds = ads
        }
        // Filter by name
        if (filtersState.search) {
            filteredAds = filteredAds.filter(ad => ad.name.includes(filtersState.search));
        }
        // Filter by tags
        if (filtersState.tags && filtersState.tags.length > 0) {
            filteredAds = filteredAds.filter(ad => filtersState.tags.every(tag => ad.tags.includes(tag)));
        }
        return filteredAds;
    };

    let sellAds= ads
    if (filtersState){
        sellAds = FilterOption(filtersState);
    }
    return (
        <Layout>
            <div className='ad-list'>
                {sellAds &&
                    sellAds.map((ad, index) => (
                        <SingleAd key={index} {...ad} />
                    ))}
            </div>
        </Layout>
    );
}
