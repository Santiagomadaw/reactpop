import { client } from "../../../api/client";
import { ILogin } from "../../../api/client";
export const postAd = async (formvalues: ILogin) => {
  console.log(formvalues)
    try {
        const response = await client.post('/api/v1/adverts', formvalues);
       console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    return Promise.resolve().then(() => {
      localStorage.removeItem('auth');
    });
  };