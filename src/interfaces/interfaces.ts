import { ReactElement } from "react";

export interface IAds {
    id: string;
    createdAt: string;
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    photo: string;
    
}
export interface ILogin {
    email: string;
    password: string;
    save: boolean;
}
export interface IpropsFilter {
    search: string;
    tags: string[];
    buysell: 'all' | 'sell' | 'buy';
    price: number[] | number;
    
}

export interface IFilterContextProviderProps {
    children: ReactElement;
    filters: IpropsFilter;
}

export interface IFilterValue {
    filtersState: IpropsFilter;
    updateFilters: (filters: IpropsFilter) => void;
}