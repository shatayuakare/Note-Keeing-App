import { createContext, useContext, useState } from "react"
import { decodeToken } from "react-jwt"
export const AuthContext = createContext();


export const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return console.log("Sorry you are not logged in")
    const decode = decodeToken(token)

    const user = decode.user
    return user
}


export default function AuthProvider({ children }) {

    const initialauthUser = localStorage.getItem("token");
    const decode = decodeToken(initialauthUser)

    const [authUser, setAuthUser] = useState(
        initialauthUser ? decode.user : undefined
    )

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);