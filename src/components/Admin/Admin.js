import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import "./Admin.scss"
import { Outlet, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from "../../service/apiService";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const account = useSelector(state => state.user.account);
    // console.log(`Check account:`, account)

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <div className="align-icon">
                        <span onClick={() => setCollapsed(!collapsed)}>
                            <FaBars />
                        </span>
                        <div className="container-dropdown">
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default Admin;