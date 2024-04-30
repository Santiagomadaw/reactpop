import { ReactElement, useState } from 'react';
import { FilterContext } from './filterCustomHook';

export interface IpropsFilter {
    search: string;
    tags: string[];
    buysell: 'all' | 'sell' | 'buy';
}

interface IFilterContextProviderProps {
    children: ReactElement;
    filters: IpropsFilter;
}

export interface IFilterValue {
    filtersState: IpropsFilter;
    updateFilters: (filters: IpropsFilter) => void;
}

export default function FilterContextProvider({
    children,
    filters={search:'',tags:[],buysell:'all' },
}: IFilterContextProviderProps) {
    const [filtersState, setFiltersState] = useState<IpropsFilter>(filters);

    const updateFilters: IFilterValue['updateFilters'] = (filter: IpropsFilter) => {
        
        setFiltersState(filter);
    };

    const value: IFilterValue = { filtersState, updateFilters };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}
