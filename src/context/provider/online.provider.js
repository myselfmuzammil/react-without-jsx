import { useEffect, useState } from "react";
import { OnlineContext } from "@/context"

export function OnlineProvider({ children }){
    const [isOnline, setIsOnline] = useState(true);
    useEffect(()=> {
        const eventHandler = setIsOnline.bind(null, !isOnline);
        const eventType = !isOnline ? "online" : "offline";

        window.addEventListener(eventType, eventHandler);

        return window.removeEventListener.bind(
            null, eventType, eventHandler
        );
    }, [isOnline]);

    return (
        <OnlineContext.Provider value={isOnline}>
            {children}
        </OnlineContext.Provider>
    );
}

export default OnlineProvider;