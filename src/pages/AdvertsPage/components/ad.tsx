import { Link } from 'react-router-dom';
import { IAds } from '../../../interfaces/interfaces';
import styled from 'styled-components';

export default function SingleAd({ id, photo, name, price, sale, tags }: IAds) {
    return (
        <Link className='add' to={`/adverts/${id}`}>
            <StyledSingleAd className='single-ad'>
                <div className='img-container'>
                    <img src={photo} alt='' />
                </div>
                <strong className=''>{price} €</strong>
                <p className='item'>{name}</p>
                <p className='task sell'>{sale ? 'Venta' : 'Compra'}</p>
                <div className='tags-container'>
                    {tags.map((tag, index) => (
                        <div key={index} className='task'>
                            {tag}
                        </div>
                    ))}
                </div>
            </StyledSingleAd>
        </Link>
    );
}
const StyledSingleAd = styled.div`
    box-shadow: 0px 0px 9px 4px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 240px;
    max-height: 340px;
    gap: 4px;
    transition: 0.09s;
    border-radius: 10px;
    padding: 10px;
    background: var(--accent-200);
    .item {
        margin: 0;
        color: var(--accent-100);
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .img-container{
        display: flex;
        max-width: 100%;
        height:  200px;
        max-height:  200px;

        border-radius: 5px 5px 0 0;
        align-items: center;
        background:var(--accent-100);
        overflow: hidden;
        & img {
            border-radius: 5px 5px 0 0;
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
    }
    & strong {
        font-size: large;
        color: var(--accent-100);
    }
    .task {
        text-align: center;
        padding: 3px 5px;
        border-radius: 3px;
        color: var(--text-200);
        height: fit-content;
        background: var(--bg-200);
    }
    .tags-container{
        display: flex;
        overflow: hidden;
        height: fit-content;
        gap: 4px;
        }
    .sell{
        color: var(--text-100);
        background: var(--accent-100);
    }
    &:hover {
        transform: translate(0, -5px);
    }
`;
