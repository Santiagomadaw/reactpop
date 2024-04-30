import { client } from '../../../api/client';

export default function getTags(){   
    return client.get('/api/v1/adverts/tags');
}
