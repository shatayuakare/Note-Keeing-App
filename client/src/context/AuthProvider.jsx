import { createContext, useContext, useState } from "react"

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const initialauthUser = localStorage.getItem("user");

    const [authUser, setAuthUser] = useState(
        initialauthUser ? JSON.parse(initialauthUser) : undefined
    )

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);