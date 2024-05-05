import { ReactElement, useState } from 'react';
import { FilterContext } from './filterCustomHook';
import { IpropsFilter } from '../../interfaces/interfaces';

interface IFilterContextProviderProps {
    children: ReactElement;
    filters: IpropsFilter;
}

export interface IFilterValue {
    maxPriceSlide: number;
    filtersState: IpropsFilter;
    updateFilters: (filters: IpropsFilter) => void;
    updateSlider: (slide: number) => void;
}

export default function FilterContextProvider({
    children,
}: IFilterContextProviderProps) {
    const [filtersState, setFiltersState] = useState<IpropsFilter>({
        search: '',
        tags: [],
        buysell: 'all',
        price: [0, 900000],
    });
    const [maxPriceSlide, setSliderState] = useState<number>(99999);

    const updateFilters: IFilterValue['updateFilters'] = (
        filter: IpropsFilter,
    ) => {
        setFiltersState(filter);
    };
    const updateSlider = (slide: number) => {
        setSliderState(slide);
    };

    const value: IFilterValue = {
        maxPriceSlide,
        filtersState,
        updateFilters,
        updateSlider,
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}
