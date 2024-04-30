import { client, setAuthorizationHeader,removeAuthorizationHeader } from "../../utils/api/client";
import { ILogin } from "../../interfaces/interfaces";

export const login = async (formvalues: ILogin) => {
    try {
        const response = await client.post('/api/auth/login', formvalues);
        const { accessToken } = response.data;

        setAuthorizationHeader(accessToken)

/*         localStorage.setItem('auth', accessToken)
 */    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader();
        localStorage.removeItem('auth');
    });
};