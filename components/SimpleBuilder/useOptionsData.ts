import useSWR from 'swr';
import { Component, GroupedOption, ComponentInput, SelectedComponent } from '../../data/types';

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => {
    return data.parts;
});

function useOptionsData(field: ComponentInput) {
    const { data, error } = useSWR(`/api/parts-by-category?category=${field.dataField}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useOptionsData;