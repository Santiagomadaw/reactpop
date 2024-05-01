import { createContext, useContext } from "react";
import { IConfirmValue } from "./confirmationContext";

export const ConfirmContext = createContext<IConfirmValue | null>(null);

export const useConfirm = () => {
    const confirm = useContext(ConfirmContext);
    if (!confirm) {
        throw new Error('useFilterContext must be used within a FilterContextProvider');
    }
    return confirm as IConfirmValue;
};

