import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    SetUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, SetUser] = useState ({
        name: 'Romain'
    });
    const [token, _setToken] = useState(113);

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <stateContext.Provider value={{
            user,
            token,
            SetUser,
            setToken
        }}>
        {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);
