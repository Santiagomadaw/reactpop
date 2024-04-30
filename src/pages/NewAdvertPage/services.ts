import { client } from "../../utils/api/client";
export interface IAdsPost {
  name: string;
  sale: boolean;
  price: number;
  tags: string;
  photo?: string;
}

export const postAd = async (formvalues: IAdsPost) => {
  console.log(formvalues)
    try {
        await client.post('/api/v1/adverts', formvalues);
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    return Promise.resolve().then(() => {
      localStorage.removeItem('auth');
    });
  };