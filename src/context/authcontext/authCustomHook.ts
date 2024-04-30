import { createContext, useContext } from "react";
import { IauthValue } from "./authcontext";

export const LogContext = createContext<IauthValue | null>(null);

export const useAuth = () => {
    const auth = useContext(LogContext);
    if (!auth) {
        throw new Error("useAuth must be used within a LogContextProvider");
    }
    return auth;
};