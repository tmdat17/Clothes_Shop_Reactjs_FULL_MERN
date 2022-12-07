import "./listProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import DatatableProduct from "../../components/datatableProduct/DataTableProduct";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ListProduct = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableProduct />
            </div>
        </div>
    );
};

export default ListProduct;
