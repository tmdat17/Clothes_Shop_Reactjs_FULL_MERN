// import "./warehouse2.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WarehouseService from "../../services/WarehouseService";

import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
function Warehouse2() {
    const navigate = useNavigate();
    const admin = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!admin) {
            navigate("/login");
        }
    }, []);

    const [dataWarehouse2, setDataWarehouse2] = useState({});

    const [rowsWarehouse2, setRowsWarehouse2] = useState([]);

    useEffect(() => {
        WarehouseService.getOneWarehouse("6344485f9ed94eb9be950946")
            .then((res) => {
                let temp = [];

                res.data.products.map((item, index) => {
                    temp.push({
                        id: index,
                        ...item,
                    });
                });
                setRowsWarehouse2(temp);
                setDataWarehouse2(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const productColumns_WH2 = [
        {
            field: "_id",
            headerName: "ID",
            width: 230,
        },
        {
            field: "name_product",
            headerName: "Name Product",
            width: 430,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg2">
                        <img
                            className="cellImgProduct"
                            src={params.row.thumbnail[0]}
                            alt="thumbnail"
                        />
                        {params.row.name_product}
                    </div>
                );
            },
        },
        {
            field: "price",
            headerName: "Price",
            width: 120,
        },
        {
            field: "remain_quantity",
            headerName: "Remain Quantity",
            width: 130,
        },
        {
            field: "color",
            headerName: "Color",
            width: 90,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            width: 170,
        },
    ];

    let data = {
        title: "Warehouse 2",
        dataFull: dataWarehouse2,
        dataRow: rowsWarehouse2,
        dataColumn: productColumns_WH2,
    };
    return (
        <>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <h2 className="text-secondary mx-2 my-3">
                        List Product {data.title}
                    </h2>
                    <div className="mx-2 my-3">
                        Address: {data.dataFull.address}
                    </div>

                    <DataGrid
                        className="datagrid"
                        rows={data.dataRow}
                        columns={data.dataColumn}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    );
}

export default Warehouse2;
