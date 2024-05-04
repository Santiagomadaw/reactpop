import { client } from "../../utils/api/client";
export interface IAdsPost {
  name: string;
  sale: boolean;
  price: number;
  tags: string;
  photo?: string;
}

export const postAd = async (formvalues: IAdsPost) => {
 

    try {
        return await client.post('/api/v1/adverts', formvalues,{ headers:{'Content-Type': 'multipart/form-data'}});

    } catch (error) {
      const msg:string = (error as Error).message
      return Promise.reject({ message: msg });
    }
}

export const logout = () => {
    return Promise.resolve().then(() => {
      localStorage.removeItem('auth');
    });
  };