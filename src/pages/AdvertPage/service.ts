import { client } from "../../utils/api/client";

export const getAd = (id:string) => {
    
    return client.get(`/api/v1/adverts/${id}`);
};

export const deleteAd = (id:string) => {
    console.log(id)
    return client.delete(`/api/v1/adverts/${id}`);
};
