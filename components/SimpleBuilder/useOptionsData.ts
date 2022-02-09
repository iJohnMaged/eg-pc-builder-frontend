import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

function useOptionsData(category: string) {
    const { data, error } = useSWR(`/api/parts-by-category?category=${category}`, fetcher);

    return {
        options: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useOptionsData;