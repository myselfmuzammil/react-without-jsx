export function useCategory(categories){
    const category = new Set(
        categories?.map(({category}) => category)
    );

    return [ ...category ];
}

export default useCategory;