import { client } from "../../utils/api/client";

export const getAd = (id: string) => {
    let response = null
    try {
        response = client.get(`/api/v1/adverts/${id}`);
        return response
    } catch (error) {
        const msg: string = (error as Error).message
        return Promise.reject({ message: msg });
    }


};

export const deleteAd = (id: string) => {
    return client.delete(`/api/v1/adverts/${id}`);
};
