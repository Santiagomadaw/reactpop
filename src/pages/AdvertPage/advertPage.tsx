import { useEffect, useState } from 'react';
import { IAds } from '../../interfaces/interfaces.ts';
import Layout from '../../components/layout/Layout.tsx';
import {getAd, deleteAd} from './service.ts';
import { Link, useParams } from 'react-router-dom';
import './advertPage.css';
import Button from '../../components/shared/Button.tsx';
export default function AdvertPage() {
    const [ad, setAd] = useState<IAds>();
    const params = useParams();
    const handleDeleteAd = ()=>{
        params.adId && deleteAd(params.adId)
    }
    useEffect(() => {
        const getDatad = async () => {
            if (params.adId) {
                try {
                    const ad = await getAd(params.adId);
                    setAd(ad.data);
                } catch (error) {
                    console.error('Error fetching ad:', error);
                }
            }
        };
        getDatad();
        return () => {
            console.log('unmount');
        };
    }, [params]);

    return (
        ad && (
            <Layout>
                <div className='advert'>
                    <div className='img-container'>
                        <img src={ad.photo} alt='' />
                    </div>
                    <div className='priceNameBlock'>
                        <h2>{`${ad.price}  €`}</h2>
                        <h2>{ad.name}</h2>
                    </div>
                    <div className='tags-container'>
                        {ad.tags.map((tag, index) => (
                            <Link
                                key={index}
                                className='tagLink'
                                to={`/adverts`}
                            >
                                {tag}
                            </Link>
                        ))}
                        <Button className='tagLink'>
                            {ad.sale ? 'Venta' : 'Compra'}
                        </Button>
                    </div>
                    <div>
                        <Button  id='removeAdButton' onClick={handleDeleteAd}>
                            Borrar
                        </Button>
                        <Button disabled id='editButton'>
                            Editar
                        </Button>
                        <Button id='backButton'>Volver</Button>
                    </div>
                </div>
            </Layout>
        )
    );
}
