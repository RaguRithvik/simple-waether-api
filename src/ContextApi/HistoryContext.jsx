import React, { createContext, useContext, useState } from "react";

const HistoryContex = createContext({
    // searchLocation: "",
    history: [],
    setSearchHistory: () => { }
})

function HistoryContexProvider({ children }) {
    const { history } = useContext(HistoryContex);
    const [historyState, setHistoryState] = useState(history);
    const historyStateHandler = React.useCallback((data) => {
        setHistoryState(data);
    }, []);

    return (
        <HistoryContex.Provider
            value={{
                history: historyState,
                setSearchHistory: historyStateHandler
            }}
        >
            {children}
        </HistoryContex.Provider>
    )
}
export { HistoryContexProvider, HistoryContex };