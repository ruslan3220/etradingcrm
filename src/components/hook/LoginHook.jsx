import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"


export const UseToken = () => {
    const {adToken, setAdToken} = useContext(LoginContext)
    return {adToken, setAdToken}
}