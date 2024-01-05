import { useEffect, useState } from "react";

export function useApi(url) {
    const [data, setData] = useState({
        loading: false,
        data: null,
        error: null
    });

    useEffect(()=>{
        fetch(url)
        .then(data => data.json())
        .then(jsonData => setData(prev => ({
            ...prev,
            data: jsonData
        })))
        .catch(error => setData(prev => ({
            ...prev,
            error
        })))
        .finally(() => setData(prev => ({
            ...prev,
            loading: false,
        })))
    },[]);

    return data;
}

export default useApi;