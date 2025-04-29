import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin';
// import User from './components/User/user';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import SignIn from './components/Auth/SignIn';
import App from './App';
import { ToastContainer } from 'react-toastify';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './components/routes/PrivateRoute';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger '>
            404. Not found data with your current URL.
        </div>
    )
}

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element=
                        {<PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>} />
                    {/* <Route path='quiz' element={<ListQuiz />}/> */}
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />


                <Route path='/admins' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignIn />} />
                <Route path='*' element={<NotFound />} />
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