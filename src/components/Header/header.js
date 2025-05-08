import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Profile from "./Profile";

const Header = () => {
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const [isShowModalProfile, setIsShowModalProfile] = useState(false);

    // console.log("Account: ", account, "isAuthenticated: ", isAuthenticated)
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    }

    const handleSignup = () => {
        navigate("/signup");
    }

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token);
        // console.log(res);
        if (res && res.EC === 0) {
            // clear data Redux
            dispatch(doLogout());
            navigate('/login')
        }
        else {
            toast.error(res.EM)
        }
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className="navbar-brand">Bruyne Quiz</NavLink>
                    {/* <Navbar.Brand href="/">Bruyne Quiz</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto bg-color">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/users" className="nav-link">Users</NavLink>
                            {isAuthenticated && account.role === "ADMIN" &&
                                <NavLink to="/admins" className="nav-link">Admin</NavLink>
                            }
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    < button className="login-btn"
                                        onClick={() => handleLogin()}>
                                        Log in
                                    </button>
                                    <button className="signup-btn"
                                        onClick={() => handleSignup()}>
                                        Sign up
                                    </button>
                                </>
                                :
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={()=> setIsShowModalProfile(true)}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Profile
                show={isShowModalProfile}
                setShow={setIsShowModalProfile}
                userData={account}
            />
        </>
    );
}

export default Header;