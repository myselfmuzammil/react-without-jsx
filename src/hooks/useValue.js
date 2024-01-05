import { useState } from "react";

export function useValue(initialValue=""){
    const [value, setValue] = useState(initialValue)
    const handler = (ev) => setValue(ev.target.value);

    return [value, handler];
}

export default useValue;