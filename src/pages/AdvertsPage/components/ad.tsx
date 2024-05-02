import { Link } from 'react-router-dom';
import { IAds } from '../../../interfaces/interfaces';
import styled from 'styled-components';

export default function SingleAd({ id, photo, name, price, sale, tags }: IAds) {
    return (
        <Link className='add' to={`/adverts/${id}`}>
            <StyledSingleAd className='single-ad'>
                <img src={photo} alt='' />
                <strong className=''>{price} €</strong>
                <p className='item'>{name}</p>
                <p className='selltask'>{sale ? 'Venta' : 'Compra'}</p>
                <div className='tags-container'>
                    {tags.map((tag, index) => (
                        <div key={index} className='tagLink'>
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
        color: grey;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & img {
        border-radius: 10px 10px 0 0;
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    & strong {
        font-size: large;
    }
    .selltask {
        text-align: center;
        padding: 3px 5px;
        border-radius: 3px;
        color: var(--text-200);
        height: fit-content;
        background: var(--bg-300);
    }
    &:hover {
        transform: translate(0, -5px);
    }
`;
