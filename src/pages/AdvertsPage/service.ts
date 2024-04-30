import { client } from "../../utils/api/client";


const getAds = () => {
    return client.get('/api/v1/adverts');
};
export default getAds