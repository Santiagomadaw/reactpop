import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IAds } from '../../interfaces/interfaces.ts';
import Layout from '../../components/layout/Layout.tsx';
import { getAd, deleteAd } from './service.ts';
import { useConfirm } from '../../context/confirmationContext/confirmCustomHook.ts';
import Button from '../../components/shared/Button.tsx';
import ErrorMessage from '../../components/shared/ErrorMessage.tsx';
import styled from 'styled-components';
import noImg from '../../assets/no-image-svgrepo-com.svg';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <Layout>
            <StyledAdvertPage className='advert'>
                {ad && (
                    <>
                        <div className='advert-img-container'>
                            {ad.photo ? (
                                <img
                                    src={ad.photo}
                                    alt={'Imagen de' + name}
                                />
                            ) : (
                                <img
                                    className='advert-noImg'
                                    src={noImg}
                                    alt='Articulo sin foto'
                                />
                            )}
                        </div>
                        <div className='advert-priceNameBlock'>
                            <h2>{ad.name}</h2>
                            <h2>{`${ad.price}  €`}</h2>
                        </div>
                        <div className='advert-tags-container'>
                            {ad.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className='advert-tagLink'
                                >
                                    {tag}
                                </div>
                            ))}
                            <div className='advert-tagLink'>
                                {ad.sale ? 'Venta' : 'Compra'}
                            </div>
                        </div>
                        <div>
                            <Button
                                id='removeAdButton'
                                onClick={handleDeleteAd}
                                $customheight='28px'
                            >
                                Borrar
                            </Button>

                            <Button
                                id='backButton'
                                $customheight='28px'
                            >
                                Volver
                            </Button>
                        </div>
                    </>
                )}
                {error && (
                    <ErrorMessage
                        className='advert-loginPage-error'
                        onClick={resetError}
                    >
                        <h3>{error.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </StyledAdvertPage>
        </Layout>
    );
}

const StyledAdvertPage = styled.div`

box-shadow: 0px 0px 9px 4px rgba(0,0,0,0.75);
display: flex;
flex-direction: column;
align-items: center;
width: 680px;
max-width: 90%;
background-color: var(--accent-200);
padding: 20px 10px;
border-radius: 10px;
gap:10px;
margin: 0 auto;
& h2, h1{
    margin-left: 14px;
    color: var(--text-200);
}


}
& .advert-priceNameBlock{
display: flex;
flex-direction: column;
align-items: start;
width: 100%;

}
& .advert-img-container{
    margin-bottom: 20px;
    display: flex;
    width: 640px;
    max-width: 96%;
    height: 480px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background:var(--accent-100);
    overflow: hidden;

    &:has(.advert-noImg) img {
        width: 40%;
        height: 40%;
        object-fit: cover;
        
    }

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }
    & .advert-noImg{
        opacity: 0.6;
    }

}


& .advert-tags-container{
    display: flex;
    overflow: hidden;
    height: fit-content;
    gap: 4px;
    & .advert-tagLink{
        text-align: center;
        padding: 3px 5px;
        border-radius: 3px;
        color: var(--text-200);
        height: fit-content;
        background: var(--bg-200);
    }
}
    `;
