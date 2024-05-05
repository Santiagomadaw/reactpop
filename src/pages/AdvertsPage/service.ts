import { client } from '../../utils/api/client';

const getAds = () => {
    try {
        return client.get('/api/v1/adverts');
    } catch (error) {
        const msg: string = (error as Error).message;
        return Promise.reject({ message: msg });
    }
};
export default getAds;
