import { client } from "../../utils/api/client";
import { ILogin } from "../../interfaces/interfaces";
export const postAd = async (formvalues: ILogin) => {
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