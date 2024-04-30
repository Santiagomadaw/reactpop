import { IAds } from "../../../interfaces/interfaces"

export default function SingleAd({id,photo,name,price,sale}:IAds){

    return <a className="add" href={`/adverts/${id}`}>
                        <div className="single-ad">
                            <img src={photo} alt=""/>
                            <strong className="">{price} €</strong>
                            <p className="item">{name}</p>
                            <p className="buysell">{(sale)?'Venta':'Compra'}</p>
                        </div> 
                    </a>
}