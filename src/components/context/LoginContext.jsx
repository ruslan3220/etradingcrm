import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
    const localData = (localStorage.getItem('token'))
    const [adToken , setAdToken] = useState();


    
    useEffect(() => {
        if (adToken) {
            localStorage.setItem('token', JSON.stringify(adToken))
        }
    }, [adToken])
    // console.log(adToken);
    // const Token =  (localStorage.getItem('token'));
    // console.log(Token);
    // console.log(adToken);

    return (
        <LoginContext.Provider value={{adToken, setAdToken}}>
            {children}
        </LoginContext.Provider>
    )
}