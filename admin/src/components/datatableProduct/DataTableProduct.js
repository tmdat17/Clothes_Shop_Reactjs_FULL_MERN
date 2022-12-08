import "./datatableProduct.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductService from "../../services/ProductService";

const DatatableProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const productColumns = [
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
                    <div className="cellWithImg">
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
            width: 120,
        },
        {
            field: "category",
            headerName: "Category",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        {params.row.category.type_product}
                    </div>
                );
            },
        },
    ];

    const handleDelete = (idProduct) => {
        setData(data.filter((item) => item._id !== idProduct));
        ProductService.deleteOneProduct(idProduct);
    };

    useEffect(() => {
        const getData = ProductService.getAllProduct;
        getData()
            .then((res) => {
                let temp = [];

                res.data.map((item, index) => {
                    temp.push({
                        id: index,
                        ...item,
                    });
                });

                return setData(temp);
            })
            .catch((error) => console.log(error));
    }, []);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className="cellAction">
                            <div
                                className="deleteButton"
                                onClick={() => handleDelete(params.row._id)}
                            >
                                Delete
                            </div>
                        </div>
                        <div className="cellAction">
                            <div
                                className="editButton"
                                onClick={() =>
                                    navigate(`edit/${params.row._id}`)
                                }
                            >
                                Edit
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                List Products
                <Link to="/products/new" className="link">
                    Add New Product
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={productColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DatatableProduct;
