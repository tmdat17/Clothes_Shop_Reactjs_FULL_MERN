import "./DetailUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../../services/UserService";
const DetailUser = () => {
    const [detailUser, setDetailUser] = useState({});
    const [rowOrders, setRowOrders] = useState([]);
    const navigate = useNavigate();
    const admin = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!admin) {
            navigate("/login");
        }
    }, []);
    const { userId } = useParams();
    useEffect(() => {
        const getData = UserService.getOneUser;
        getData(userId)
            .then((res) => {
                setDetailUser(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setRowOrders([]);
        detailUser?.orders?.map((item) => {
            setRowOrders((prev) => [...prev, item]);
        });
    }, [detailUser]);

    const handleView = (orderId) => {
        navigate(`/order_detail/${orderId}`);
    };
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        {/* <div className="editButton">Edit</div> */}
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">
                                    {detailUser.fullname}
                                </h1>
                                <div className="detailItem">
                                    <span className="itemKey">ID:</span>
                                    <span className="itemValue">
                                        {detailUser._id}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">
                                        {detailUser.phone}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Birthday:</span>
                                    <span className="itemValue">
                                        {detailUser.birthday}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="right">
                        <Chart
                            aspect={4 / 1}
                            title="User Spending ( Last 6 Months)"
                        />
                    </div> */}
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    {/* <List /> */}
                    {detailUser?.orders?.length > 0 ? (
                        <TableContainer component={Paper} className="table">
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="tableCell">
                                            Order ID
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Phone
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Receiver Name
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Address
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Total Price
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Payment Method
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Status
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            Order Time
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowOrders?.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            className="table-row"
                                            onClick={() => handleView(row._id)}
                                        >
                                            <TableCell className="tableCell">
                                                {row._id}
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                {row.phone}
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                {row.receiverName}
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                {row.address}
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                {row.totalPrice}
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                {row.methodPayment}
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                <span
                                                    className={`status ${row.status}`}
                                                >
                                                    {row.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="tableCell">
                                                {row.createdAt}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <h1>Chưa có đơn đặt hàng!!</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailUser;
