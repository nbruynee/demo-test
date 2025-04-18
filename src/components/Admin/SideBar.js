import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import './SideBar.scss'
import sidebarBg from "../../assets/images/bg2.jpg"

import { MdDashboard } from "react-icons/md";
import { TbBrandOpenSource } from "react-icons/tb";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { Link } from 'react-router-dom';


const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div className='container-logo'>
                        <TbBrandOpenSource size={'2.5em'} color={"#adadad"} />
                        <span className={collapsed ? 'logo-text-collapsed' : 'logo-text'}>
                            Quiz
                        </span>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard fontSize='18' />}>
                            Dashboard
                            <Link to="/admins"/>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<MdOutlineFeaturedPlayList fontSize='18' />}
                            title="Features"
                        >
                            <MenuItem>
                            Manage Users
                            <Link to="/admins/manage-users"/>
                            </MenuItem>
                            <MenuItem>Manage Quiz Section</MenuItem>
                            <MenuItem>Manage Question</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter>
                    <div className="sidebar-btn-wrapper">
                        <a
                            href="https://github.com/nbruynee/demo-test"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span>
                                &#169; Bruyne Quiz
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;