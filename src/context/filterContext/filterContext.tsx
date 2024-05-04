import { ReactElement, useState } from 'react';
import { FilterContext } from './filterCustomHook';
import { IpropsFilter } from '../../interfaces/interfaces';

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
    filters
}: IFilterContextProviderProps) {
    console.log(filters)
    const [filtersState, setFiltersState] = useState<IpropsFilter>({ search: '', tags: [], buysell: 'all', price: [0, 10000] });
    console.log(filtersState);
    const updateFilters: IFilterValue['updateFilters'] = (
        filter: IpropsFilter
    ) => {
        setFiltersState(filter);
    };

    const value: IFilterValue = { filtersState, updateFilters };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}
