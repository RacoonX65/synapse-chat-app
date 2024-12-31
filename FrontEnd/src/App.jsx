import {Navbar} from "./components/Navbar.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {useThemeStore} from "./store/useThemeStore.js";

const App = () => {
    const {authUser,checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
    const {theme}= useThemeStore()

    console.log(onlineUsers);

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    console.log({authUser})

    if(isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <div className="skeleton h-32 w-32"></div>
        </div>

    )

    return (
        <div data-theme={theme}>
            <Navbar/>
            <Routes>
                <Route path="/" element={ authUser ? <HomePage /> : <Navigate to={"/login"} />} />
                <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to={"/"} /> } />
                <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
                <Route path="/settings" element={ <SettingsPage />} />
                <Route path="/profile" element={ authUser ? <ProfilePage /> :<Navigate to={"/login"} /> } />

            </Routes>

            <Toaster />
        </div>
    )
}
export default App
