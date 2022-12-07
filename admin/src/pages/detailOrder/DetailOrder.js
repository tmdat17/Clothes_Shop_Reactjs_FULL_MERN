import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import OrderService from "../../services/OrderService";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const orderColumns = [
    {
        field: "product",
        headerName: "ID PRODUCT",
        width: 280,
    },
    {
        field: "nameProduct",
        headerName: "Name Product",
        width: 380,
    },
    {
        field: "size",
        headerName: "Size",
        width: 180,
    },
    {
        field: "price",
        headerName: "Price",
        width: 250,
    },
    {
        field: "quatity",
        headerName: "Quatity",
        width: 130,
    },
];

const DetailOrder = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    const [data, setData] = useState([]);
    const { orderId } = useParams();
    useEffect(() => {
        const getData = OrderService.getOneOrder;
        getData(orderId)
            .then((res) => {
                let temp = [];
                res.data.orderDetails.map((item, index) => {
                    temp.push({ id: index, ...item });
                });

                return setData(temp);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="text-secondary fs-3 p-2">Chi tiết đơn hàng</div>
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={orderColumns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default DetailOrder;
