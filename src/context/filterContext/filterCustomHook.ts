import { createContext, useContext } from "react";
import { IFilterValue } from "./filterContext";

export const FilterContext = createContext<IFilterValue | null>(null);

export const useFilterContext = () => {
    const context = useContext(FilterContext);

    if (!context) {
        throw new Error('useFilterContext must be used within a FilterContextProvider');
    }

    return context;
};