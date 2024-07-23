import "./App.css"
import { Toaster } from "react-hot-toast"
import { useAuth } from "./context/AuthProvider"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Main from "./pages/Main"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Header from "./pages/Header"
import Footer from "./pages/Footer"

const App = () => {

  const [authUser, setAuthUser] = useAuth()
  setAuthUser(authUser)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={!authUser ? <Login /> : <Navigate path={"/"} />} />
        <Route path={"/signup"} element={!authUser ? <Signup /> : <Navigate path={"/"} />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  )
}

export default App