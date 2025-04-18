import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import "./Admin.scss"
import { Outlet } from "react-router-dom";

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
                        <FaBars onClick={() => setCollapsed(!collapsed)} />
                    </div>
                </div>
                <div className="admin-main">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
};

export default Admin;