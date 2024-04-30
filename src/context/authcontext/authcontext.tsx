import { ReactElement, useState } from 'react';
import { LogContext } from './authCustomHook';

interface IAuthContextProviderProps {
    defaultState: boolean;
    children: ReactElement;
}
export interface IauthValue {
    logState: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

export default function LogContextProvider({
    defaultState,
    children,
}: IAuthContextProviderProps) {
    const [logState, setLogState] = useState(defaultState);
    const setLogin = () => setLogState(true);
    const setLogout = () => setLogState(false);

    const authValue: IauthValue = {
        logState,
        onLogin: setLogin,
        onLogout: setLogout,
    };
    return (
        <LogContext.Provider value={authValue}>{children}</LogContext.Provider>
    );
}
