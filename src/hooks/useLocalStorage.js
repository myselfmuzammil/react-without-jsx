import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    const currentStorage = JSON.parse(localStorage.getItem(key));
    const initialState = currentStorage || initialValue || null;

    const [storage, setStorage] = useState(initialState);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storage));
    }, [storage]);

    return [storage, setStorage];
}

export default useLocalStorage;
