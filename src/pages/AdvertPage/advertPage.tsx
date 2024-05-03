import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IAds } from '../../interfaces/interfaces.ts';
import Layout from '../../components/layout/Layout.tsx';
import { getAd, deleteAd } from './service.ts';
import { useConfirm } from '../../context/confirmationContext/confirmCustomHook.ts';
import Button from '../../components/shared/Button.tsx';
import ErrorMessage from '../../components/shared/ErrorMessage.tsx';
import './advertPage.css';

export default function AdvertPage() {
    const [ad, setAd] = useState<IAds>();
    const { confirmState, onUnhidden, onDeleter } = useConfirm();
    const [gonnaDelete, setGonnaDelete] = useState<boolean>();
    const params = useParams();
    const handleDeleteAd = () => {
        onDeleter();
        onUnhidden();
        setGonnaDelete(true);
    };
    const [error, setError] = useState<string | null>(null);
    const resetError = () => setError(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (gonnaDelete && confirmState) {
            try {
                if (params.adId) {
                    deleteAd(params.adId);
                    setError('Anuncio borrado');
                    setTimeout(() => {
                        navigate('/adverts');
                    }, 1001);
                }
            } catch (error) {
                if (error) {
                    const msg: string = (error as Error).message;
                    setError(msg);
                }
            }
        }
        setGonnaDelete(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmState]);

    useEffect(() => {
        const getDatad = async () => {
            if (params.adId) {
                try {
                    resetError();
                    const ad = await getAd(params.adId);
                    setAd(ad.data);
                } catch (error) {
                    if (error) {
                        const status: number | undefined = (error as AxiosError)
                            .status;
                        if (status) {
                            navigate('/404');
                        } else {
                            const msg: string = (error as AxiosError).message;
                            setError(`Error fetching ad: ${msg}`);
                        }
                    }
                }
            }
        };
        getDatad();
        return () => {
            console.log('unmount');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Layout>
            <div className='advert'>
                {ad && (
                    <>
                        <div className='img-container'>
                            <img src={ad.photo} alt='' />
                        </div>
                        <div className='priceNameBlock'>
                            <h2>{ad.name}</h2>
                            <h2>{`${ad.price}  €`}</h2>
                        </div>
                        <div className='tags-container'>
                            {ad.tags.map((tag, index) => (
                                <div key={index} className='tagLink'>
                                    {tag}
                                </div>
                            ))}
                            <div className='tagLink'>
                                {ad.sale ? 'Venta' : 'Compra'}
                            </div>
                        </div>
                        <div>
                            <Button
                                id='removeAdButton'
                                onClick={handleDeleteAd}
                                customheight='28px'
                            >
                                Borrar
                            </Button>

                            <Button id='backButton' customheight='28px'>
                                Volver
                            </Button>
                        </div>
                    </>
                )}
                {error && (
                    <ErrorMessage
                        className='loginPage-error'
                        onClick={resetError}
                    >
                        <h3>{error.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </div>
        </Layout>
    );
}
