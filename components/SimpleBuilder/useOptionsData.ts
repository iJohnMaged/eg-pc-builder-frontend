import useSWR from 'swr';
import { Component, GroupedOption, ComponentInput, SelectedComponent } from '../../data/types';

const fetcher = (url: string, field: ComponentInput, selected: SelectedComponent | null | undefined, cb: (selectedFromLocalStorage: SelectedComponent, options: Component[]) => SelectedComponent | null | undefined) => fetch(url).then(res => res.json()).then((data) => {
    const components = data.parts.reduce(
        (acc: Component[], part: GroupedOption) => {
            return [...acc, ...part.options];
        },
        []
    ) as Component[];
    const defaultValue = selected && selected.fieldId === field.id ? cb(selected, components) : null;
    return {
        defaultValue,
        data
    }
});

function useOptionsData(field: ComponentInput, selected: SelectedComponent | null | undefined, cb: (selectedFromLocalStorage: SelectedComponent, options: Component[]) => SelectedComponent | null | undefined) {
    const { data, error } = useSWR(`/api/parts-by-category?category=${field.dataField}`, url => fetcher(url, field, selected, cb), {
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