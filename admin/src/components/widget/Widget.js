import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import Warehouse from "@mui/icons-material/Warehouse";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductService from "../../services/ProductService";
import UserService from "../../services/UserService";
import OrderService from "../../services/OrderService";
import WarehouseService from "../../services/WarehouseService";

const Widget = ({ type }) => {
    let data;
    const [amountUser, setAmountUser] = useState(0);
    const [amountProduct, setAmountProduct] = useState(0);
    const [amountOrder, setAmountOrder] = useState(0);
    const [amountWarehouse, setAmountWarehouse] = useState(0);

    const admin = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        UserService.getAllUser(admin?.accessToken)
            .then((res) => {
                setAmountUser(res.data.length);
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        ProductService.getAllProduct()
            .then((res) => {
                setAmountProduct(res.data.length);
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        OrderService.getAllOrder()
            .then((res) => {
                setAmountOrder(res.data.length);
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        WarehouseService.getAllWarehouse()
            .then((res) => {
                setAmountWarehouse(res.data.length);
            })
            .catch((error) => console.log(error));
    }, []);

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                amount: amountUser,
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                amount: amountOrder,
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                ),
            };
            break;
        case "product":
            data = {
                title: "PRODUCTS",
                amount: amountProduct,
                icon: (
                    <CategoryIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                            color: "green",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                ),
            };
            break;
        case "warehouse":
            data = {
                title: "WAREHOUSES",
                amount: amountWarehouse,
                icon: (
                    <Warehouse
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.amount}</span>
            </div>
            <div className="right">{data.icon}</div>
        </div>
    );
};

export default Widget;
