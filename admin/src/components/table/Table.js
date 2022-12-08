import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderService from "../../services/OrderService";

const List = () => {
    // call api khi user dat hang xuat ra cac hoa don
    const [rowOrders, setRowOrders] = useState([]);
    useEffect(() => {
        OrderService.getAllOrder()
            .then((res) => {
                setRowOrders(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    const navigate = useNavigate();
    const handleView = (orderId) => {
        navigate(`/order_detail/${orderId}`);
    };
    return (
        <>
            {rowOrders.length > 0 ? (
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                        {row.user.phone}
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
        </>
    );
};

export default List;
