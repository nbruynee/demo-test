import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import "./Admin.scss"
import { Outlet } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { ToastContainer, toast } from 'react-toastify';

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)

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
                                <NavDropdown.Item>Log out</NavDropdown.Item>
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