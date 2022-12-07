import "./sidebar.scss";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthService from "../../services/AuthService";
const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);

    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const dispatch_logout = useDispatch();
    const handleLogout = () => {
        AuthService.logoutUser(
            dispatch_logout,
            user?._id,
            navigate,
            user?.accessToken
        );
    };
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/home" style={{ textDecoration: "none" }}>
                    <span className="logo">Levent Admin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Products</span>
                        </li>
                    </Link>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders</span>
                    </li>

                    <p className="title">WAREHOUSE</p>
                    <li>
                        <WarehouseIcon className="icon" />
                        <span>WAREHOUSE 1</span>
                    </li>
                    <li>
                        <WarehouseIcon className="icon" />
                        <span>WAREHOUSE 2</span>
                    </li>
                    <li>
                        <WarehouseIcon className="icon" />
                        <span>WAREHOUSE 3</span>
                    </li>
                    <li>
                        <WarehouseIcon className="icon" />
                        <span>WAREHOUSE 4</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>

                    <li onClick={handleLogout}>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    );
};

export default Sidebar;
