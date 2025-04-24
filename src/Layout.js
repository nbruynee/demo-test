import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import User from './components/User/user';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import SignIn from './components/Auth/SignIn';
import App from './App';
import { ToastContainer } from 'react-toastify';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<User />} />
                </Route>

                <Route path='/admins' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignIn />} />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    )
}

export default Layout;