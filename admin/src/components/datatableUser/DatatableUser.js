import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UserService from "../../services/UserService";

const userColumns = [
    {
        field: "_id",
        headerName: "ID",
        width: 230,
    },
    {
        field: "fullname",
        headerName: "Full Name",
        width: 330,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 180,
    },
    {
        field: "admin",
        headerName: "ADMIN",
        width: 120,
    },
    {
        field: "birthday",
        headerName: "Birthday",
        width: 230,
    },
];

const DatatableUser = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [data, setData] = useState([]);

    const handleDelete = (phone) => {
        setData(data.filter((item) => item.phone !== phone));
    };

    useEffect(() => {
        const getData = UserService.getAllUser;
        getData(user?.accessToken)
            .then((res) => {
                let temp = [];
                res.data.map((item, index) => {
                    temp.push({ id: index, ...item });
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
                    <div className="cellAction">
                        <Link
                            to={`${params.row?._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.phone)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                List Users
                {/* <Link to="/users/new" className="link">
                    Add New
                </Link> */}
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DatatableUser;
